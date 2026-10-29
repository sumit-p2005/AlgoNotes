'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function AlgoLogo({
  showText = true,
  size = 32,
  className = '',
  href = '/dashboard',
}) {
  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div className="relative flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg">
        {/* Light Mode Logo */}
        <Image
          src="/algonotes-light.png"
          alt="AlgoNotes Logo"
          width={size}
          height={size}
          className="block dark:hidden object-contain rounded-lg"
          priority
        />
        {/* Dark Mode Logo */}
        <Image
          src="/algonotes-dark.png"
          alt="AlgoNotes Logo"
          width={size}
          height={size}
          className="hidden dark:block object-contain rounded-lg"
          priority
        />
      </div>

      {showText && (
        <span className="font-semibold tracking-tight text-lg text-foreground flex items-center">
          Algo<span className="text-amber-400">Notes</span>
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}

