import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const ALLOWED_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
]);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request) {
  try {
    let userId = 'anonymous';
    let supabase = null;

    try {
      supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) userId = user.id;
    } catch {}

    const formData = await request.formData();
    const file = formData.get('image');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ success: false, error: 'No image file provided' }, { status: 400 });
    }

    // 1. Validate MIME type
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only PNG, JPG, JPEG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // 2. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'Image file size exceeds the 5MB limit.' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name ? file.name.split('.').pop().toLowerCase() : 'png';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const storagePath = `${userId}/${filename}`;

    // Try uploading to Supabase Storage if configured
    const isSupabaseConfigured =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project.supabase.co');

    if (isSupabaseConfigured && supabase) {
      try {
        const { error: uploadError } = await supabase.storage
          .from('user-note-images')
          .upload(storagePath, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('user-note-images')
            .getPublicUrl(storagePath);

          return NextResponse.json({
            success: true,
            url: publicUrl,
            storagePath,
            name: file.name,
            size: file.size,
          });
        } else {
          console.warn('Supabase storage upload error:', uploadError.message);
        }
      } catch (storageErr) {
        console.warn('Storage error, falling back to data URL:', storageErr.message);
      }
    }

    // Fallback: Safe Base64 Data URL for offline development or sandbox environments
    const base64Data = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64Data}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      storagePath: `local/${filename}`,
      name: file.name,
      size: file.size,
    });
  } catch (err) {
    console.error('Image upload failed:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

