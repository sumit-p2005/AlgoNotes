'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  onClick,
}) {
  const baseStyles = 'inline-flex items-center font-medium transition-colors select-none';

  const variants = {
    default: 'bg-elevated text-foreground/80 border border-border',
    accent: 'bg-accent/20 text-amber-600 dark:text-amber-300 border border-accent/40',
    easy: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
    medium: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30',
    hard: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30',
    solved: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30',
    attempted: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30',
    saved: 'bg-stone-500/15 text-stone-600 dark:text-stone-400 border border-stone-500/30',
    outline: 'border border-border text-foreground/70 bg-transparent',
  };

  const sizes = {
    sm: 'text-[11px] px-1.5 py-0.5 rounded gap-1',
    md: 'text-xs px-2 py-0.5 rounded-md gap-1.5',
    lg: 'text-sm px-2.5 py-1 rounded-md gap-2',
  };

  return (
    <span
      onClick={onClick}
      className={cn(
        baseStyles,
        variants[variant] || variants.default,
        sizes[size] || sizes.md,
        onClick ? 'cursor-pointer hover:opacity-85' : '',
        className
      )}
    >
      {children}
    </span>
  );
}

export function DifficultyBadge({ difficulty, size = 'sm', className = '' }) {
  const diff = (difficulty || 'Medium').toLowerCase();
  const variant = diff === 'easy' ? 'easy' : diff === 'hard' ? 'hard' : 'medium';
  return (
    <Badge variant={variant} size={size} className={className}>
      {difficulty || 'Medium'}
    </Badge>
  );
}

export function StatusBadge({ status, size = 'sm', className = '' }) {
  const stat = (status || 'Saved').toLowerCase();
  const variant = stat === 'solved' ? 'solved' : stat === 'attempted' ? 'attempted' : 'saved';
  return (
    <Badge variant={variant} size={size} className={className}>
      {status || 'Saved'}
    </Badge>
  );
}
