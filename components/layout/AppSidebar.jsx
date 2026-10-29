'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck2,
  FolderTree,
  Layers,
  FileCode2,
  BarChart3,
  Bookmark,
  Settings,
  Plus,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from 'lucide-react';
import { AlgoLogo } from '@/components/ui/AlgoLogo';
import { cn } from '@/lib/utils/cn';
import { createClient } from '@/lib/supabase/client';

const MAIN_NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Revision', href: '/revision', icon: CalendarCheck2 },
  { label: 'Topics', href: '/topics', icon: FolderTree },
  { label: 'Patterns', href: '/patterns', icon: Layers },
  { label: 'All Problems', href: '/problems', icon: FileCode2 },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function AppSidebar({
  isMobileOpen = false,
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [topics, setTopics] = useState([]);
  const [expandedTopics, setExpandedTopics] = useState({});

  useEffect(() => {
    async function fetchTopics() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('topics')
          .select('id, name, parent_id, order_index')
          .order('order_index', { ascending: true });
        
        if (data && data.length > 0) {
          setTopics(data);
        } else {
          // Starter topics fallback for immediate interactive experience
          setTopics([
            { id: 'arrays', name: 'Arrays & Two Pointers', parent_id: null },
            { id: 'sliding-window', name: 'Sliding Window', parent_id: 'arrays' },
            { id: 'strings', name: 'Strings', parent_id: null },
            { id: 'linked-lists', name: 'Linked Lists', parent_id: null },
            { id: 'trees', name: 'Trees & Graphs', parent_id: null },
            { id: 'dp', name: 'Dynamic Programming', parent_id: null },
          ]);
        }
      } catch {
        // Fallback
        setTopics([
          { id: 'arrays', name: 'Arrays & Two Pointers', parent_id: null },
          { id: 'strings', name: 'Strings', parent_id: null },
          { id: 'trees', name: 'Trees', parent_id: null },
          { id: 'dp', name: 'Dynamic Programming', parent_id: null },
        ]);
      }
    }
    fetchTopics();
  }, []);

  const toggleTopicExpand = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const rootTopics = topics.filter((t) => !t.parent_id);

  const getSubtopics = (parentId) => {
    return topics.filter((t) => t.parent_id === parentId);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-panel transition-all duration-200 select-none md:static',
          isCollapsed ? 'w-16' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-14 px-3.5 border-b border-border">
          <AlgoLogo showText={!isCollapsed} size={28} />

          {/* Close for mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-elevated"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Collapse/Expand for desktop */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden md:flex p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-elevated transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* New Note / Problem Action Button */}
        <div className="p-3">
          <button
            type="button"
            onClick={() => {
              router.push('/problems/new');
              if (onCloseMobile) onCloseMobile();
            }}
            className={cn(
              'w-full flex items-center justify-center font-medium rounded-lg bg-accent text-accent-text hover:bg-accent-hover transition-colors shadow-xs py-2',
              isCollapsed ? 'px-2' : 'px-3 gap-2 text-sm'
            )}
            title="Create New Problem Note"
          >
            <Plus className="w-4 h-4 shrink-0 stroke-[2.5]" />
            {!isCollapsed && <span>New Note</span>}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-4">
          {/* Main Workspace Navigation */}
          <nav className="space-y-0.5">
            {MAIN_NAV_ITEMS.map((item) => {
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
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors group relative',
                    isActive
                      ? 'bg-elevated text-foreground font-semibold'
                      : 'text-muted hover:text-foreground hover:bg-elevated/60'
                  )}
                  title={item.label}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-accent" />
                  )}
                  <Icon
                    className={cn(
                      'w-4 h-4 shrink-0 transition-colors',
                      isActive ? 'text-amber-400' : 'text-muted group-hover:text-foreground'
                    )}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Topic Tree Section */}
          {!isCollapsed && (
            <div className="pt-2 border-t border-border/60">
              <div className="flex items-center justify-between px-3 pb-1 text-[11px] font-semibold tracking-wider text-muted uppercase">
                <span>Topic Hierarchy</span>
                <Link
                  href="/topics"
                  className="hover:text-foreground transition-colors"
                  title="Manage Topics"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-0.5 mt-1 text-xs">
                {rootTopics.map((topic) => {
                  const subtopics = getSubtopics(topic.id);
                  const hasSubtopics = subtopics.length > 0;
                  const isExpanded = !!expandedTopics[topic.id];

                  return (
                    <div key={topic.id} className="group">
                      <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-elevated/70 text-muted hover:text-foreground transition-colors">
                        <Link
                          href={`/topics?id=${topic.id}`}
                          onClick={() => {
                            if (onCloseMobile) onCloseMobile();
                          }}
                          className="flex items-center gap-2 truncate flex-1"
                        >
                          {isExpanded ? (
                            <FolderOpen className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                          ) : (
                            <Folder className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                          )}
                          <span className="truncate">{topic.name}</span>
                        </Link>

                        {hasSubtopics && (
                          <button
                            type="button"
                            onClick={(e) => toggleTopicExpand(topic.id, e)}
                            className="p-0.5 hover:bg-panel rounded text-muted hover:text-foreground"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Nested Subtopics */}
                      {hasSubtopics && isExpanded && (
                        <div className="pl-6 pr-2 py-0.5 space-y-0.5 border-l border-border/50 ml-3.5 mt-0.5">
                          {subtopics.map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/topics?id=${sub.id}`}
                              onClick={() => {
                                if (onCloseMobile) onCloseMobile();
                              }}
                              className="block py-1 px-2 rounded text-muted hover:text-foreground hover:bg-elevated/50 truncate transition-colors text-[11px]"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Footer info */}
        <div className="p-3 border-t border-border text-[11px] text-muted flex items-center justify-between">
          {!isCollapsed && (
            <>
              <span className="font-mono">v1.0 • AlgoNotes</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-elevated border border-border">
                DSA Pro
              </span>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
