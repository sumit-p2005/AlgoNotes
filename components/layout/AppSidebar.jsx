'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Home,
  BookOpen,
  CalendarCheck2,
  FolderTree,
  Grid2X2,
  FileCode2,
  NotebookPen,
  BarChart3,
  Bookmark,
  Settings,
  Plus,
  Flame,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'My Notes', href: '/notes', icon: NotebookPen },
  { label: 'DSA Sheets', href: '/sheets', icon: BookOpen, badgeText: 'A2Z' },
  { label: 'Revision', href: '/revision', icon: CalendarCheck2, showBadge: true },
  { label: 'Topics', href: '/topics', icon: FolderTree },
  { label: 'Patterns', href: '/patterns', icon: Grid2X2 },
  { label: 'All Problems', href: '/problems', icon: FileCode2 },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function AppSidebar({
  isMobileOpen = false,
  onCloseMobile,
  dueCount = 0,
  streakData = { streak: 0, weekDays: [] },
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Left Navigation Bar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex flex-col w-56 border-r border-border bg-sidebar md:bg-sidebar transition-transform duration-200 select-none md:static shrink-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo and Wordmark at Top */}
        <div className="flex items-center justify-between h-14 px-4 pt-1">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="relative w-7 h-7 shrink-0">
              <Image
                src="/algonotes-dark.png"
                alt="AlgoNotes"
                fill
                className="hidden dark:block object-contain"
                priority
              />
              <Image
                src="/algonotes-light.png"
                alt="AlgoNotes"
                fill
                className="block dark:hidden object-contain"
                priority
              />
            </div>
            <span className="font-extrabold tracking-tight text-base text-foreground flex items-center">
              Algo<span className="text-amber-400">Notes</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-muted hover:text-foreground"
            aria-label="Close navigation menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Big Yellow "+ New Note" Button */}
        <div className="px-3.5 py-2.5">
          <button
            type="button"
            onClick={() => {
              router.push('/problems/new');
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs tracking-wide shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Note</span>
          </button>
        </div>

        {/* Navigation Items List */}
        <nav className="flex-1 px-2.5 py-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (onCloseMobile) onCloseMobile();
                }}
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors group',
                  isActive
                    ? 'bg-accent-subtle/90 dark:bg-accent/10 border border-accent-border/70 dark:border-accent/30 text-accent-selected-text font-bold shadow-xs'
                    : 'text-secondary hover:text-foreground hover:bg-panel border border-transparent'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-colors',
                      isActive ? 'text-accent-icon' : 'text-icon group-hover:text-foreground'
                    )}
                  />
                  <span>{item.label}</span>
                </div>

                {item.showBadge && dueCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-accent text-accent-text text-[10px] font-bold">
                    {dueCount}
                  </span>
                )}
                {item.badgeText && (
                  <span className="px-1.5 py-0.5 rounded-md bg-accent-subtle border border-accent-border text-accent-selected-text text-[10px] font-bold">
                    {item.badgeText}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Study Streak Card at Bottom */}
        <div className="p-3 mx-2.5 mb-3 rounded-2xl border border-border bg-panel/70">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-muted">Study Streak</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame
              className={cn(
                'w-4 h-4',
                (streakData?.streak || 0) > 0 ? 'text-amber-500 fill-amber-500' : 'text-muted'
              )}
            />
            <span
              className={cn(
                'text-sm font-bold',
                (streakData?.streak || 0) > 0 ? 'text-amber-400' : 'text-muted'
              )}
            >
              {streakData?.streak || 0} {(streakData?.streak || 0) === 1 ? 'day' : 'days'}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 text-[10px] font-medium">
            {(streakData?.weekDays && streakData.weekDays.length > 0
              ? streakData.weekDays
              : [
                  { label: 'S', isActive: false, isToday: false },
                  { label: 'M', isActive: false, isToday: false },
                  { label: 'T', isActive: false, isToday: false },
                  { label: 'W', isActive: false, isToday: false },
                  { label: 'T', isActive: false, isToday: false },
                  { label: 'F', isActive: false, isToday: false },
                  { label: 'S', isActive: false, isToday: false },
                ]
            ).map((day, idx) => (
              <span
                key={idx}
                className={cn(
                  day.isActive
                    ? 'text-amber-400 font-bold'
                    : day.isToday
                    ? 'text-foreground font-semibold'
                    : 'text-muted/50'
                )}
              >
                • {day.label}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
