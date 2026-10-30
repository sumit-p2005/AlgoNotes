'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  RefreshCw,
  Maximize2,
  Minimize2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function ImageBlock({ content = {}, onChange }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const url = content.url || '';
  const caption = content.caption || '';
  const widthPercent = content.widthPercent || 100; // 33, 66, 100
  const alignment = content.alignment || 'center'; // 'left' | 'center' | 'right'

  const handleUploadFile = async (file) => {
    if (!file) return;
    setErrorMessage('');

    // Validate type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Please upload a PNG, JPG, JPEG, or WebP image.');
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size must be less than 5MB.');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/notes/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange({
        ...content,
        url: data.url,
        storagePath: data.storagePath,
        fileName: data.name || file.name,
        widthPercent: content.widthPercent || 100,
        alignment: content.alignment || 'center',
      });
    } catch (err) {
      setErrorMessage(err.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadFile(e.dataTransfer.files[0]);
    }
  };

  const setWidth = (pct) => {
    onChange({ ...content, widthPercent: pct });
  };

  const setAlign = (align) => {
    onChange({ ...content, alignment: align });
  };

  const removeImage = () => {
    onChange({
      ...content,
      url: '',
      storagePath: '',
      caption: '',
    });
  };

  // If no image is uploaded yet, show dropzone
  if (!url) {
    return (
      <div className="w-full my-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleUploadFile(e.target.files[0]);
          }}
        />

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer',
            dragActive
              ? 'border-accent bg-accent/10'
              : 'border-border/80 bg-panel/60 hover:bg-elevated/70 hover:border-border'
          )}
        >
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-3">
            {isUploading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <ImageIcon className="w-5 h-5" />
            )}
          </div>
          <div className="text-xs font-bold text-foreground">
            {isUploading ? 'Uploading image...' : 'Click or drag & drop image'}
          </div>
          <p className="text-[11px] text-muted mt-1">
            PNG, JPG, JPEG, or WebP up to 5MB
          </p>

          {errorMessage && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-500 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Uploaded Image View with controls
  const alignClass =
    alignment === 'left'
      ? 'mr-auto'
      : alignment === 'right'
      ? 'ml-auto'
      : 'mx-auto';

  const widthStyle =
    widthPercent === 33
      ? 'w-full sm:w-1/3'
      : widthPercent === 66
      ? 'w-full sm:w-2/3'
      : 'w-full';

  return (
    <div className="w-full my-3 space-y-2 group">
      {/* Hidden File Picker for Replace */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) handleUploadFile(e.target.files[0]);
        }}
      />

      {/* Floating Image Control Bar */}
      <div className="flex items-center justify-between p-1.5 rounded-xl border border-border/80 bg-panel/90 text-xs text-muted shadow-xs opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <div className="flex items-center gap-1">
          {/* Size controls */}
          <button
            type="button"
            onClick={() => setWidth(33)}
            className={cn(
              'px-2 py-0.5 rounded text-[11px] font-medium transition-colors',
              widthPercent === 33 ? 'bg-accent/20 text-accent font-bold' : 'hover:bg-elevated text-muted'
            )}
            title="Small (33%)"
          >
            33%
          </button>
          <button
            type="button"
            onClick={() => setWidth(66)}
            className={cn(
              'px-2 py-0.5 rounded text-[11px] font-medium transition-colors',
              widthPercent === 66 ? 'bg-accent/20 text-accent font-bold' : 'hover:bg-elevated text-muted'
            )}
            title="Medium (66%)"
          >
            66%
          </button>
          <button
            type="button"
            onClick={() => setWidth(100)}
            className={cn(
              'px-2 py-0.5 rounded text-[11px] font-medium transition-colors',
              widthPercent === 100 ? 'bg-accent/20 text-accent font-bold' : 'hover:bg-elevated text-muted'
            )}
            title="Full Width (100%)"
          >
            100%
          </button>

          <div className="h-3 w-[1px] bg-border mx-1" />

          {/* Alignment controls */}
          <button
            type="button"
            onClick={() => setAlign('left')}
            className={cn(
              'p-1 rounded transition-colors',
              alignment === 'left' ? 'text-accent bg-accent/10' : 'hover:bg-elevated text-muted'
            )}
            title="Align Left"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setAlign('center')}
            className={cn(
              'p-1 rounded transition-colors',
              alignment === 'center' ? 'text-accent bg-accent/10' : 'hover:bg-elevated text-muted'
            )}
            title="Align Center"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setAlign('right')}
            className={cn(
              'p-1 rounded transition-colors',
              alignment === 'right' ? 'text-accent bg-accent/10' : 'hover:bg-elevated text-muted'
            )}
            title="Align Right"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-elevated text-muted hover:text-foreground transition-colors"
            title="Replace Image"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="text-[11px]">Replace</span>
          </button>
          <button
            type="button"
            onClick={removeImage}
            className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-rose-500/10 text-muted hover:text-rose-400 transition-colors"
            title="Delete Image"
          >
            <Trash2 className="w-3 h-3" />
            <span className="text-[11px]">Remove</span>
          </button>
        </div>
      </div>

      {/* Render Image */}
      <div className={cn('relative rounded-xl overflow-hidden border border-border/80 bg-elevated/40', widthStyle, alignClass)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={caption || 'Note Image'}
          className="w-full h-auto object-contain max-h-[550px] rounded-lg"
          loading="lazy"
        />
      </div>

      {/* Caption input */}
      <div className={cn(widthStyle, alignClass)}>
        <input
          type="text"
          value={caption}
          onChange={(e) => onChange({ ...content, caption: e.target.value })}
          placeholder="Add an image caption or reference link..."
          className="w-full text-center text-xs text-muted placeholder:text-muted/40 bg-transparent focus:outline-none focus:text-foreground"
        />
      </div>
    </div>
  );
}
