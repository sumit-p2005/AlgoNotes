'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  RotateCcw,
  ChevronDown,
  Check,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { STATUS_OPTIONS, normalizeStatus } from '@/lib/problems/status';

const ICONS_BY_NAME = {
  Circle,
  Clock,
  CheckCircle2,
  RotateCcw,
};

export function ProblemStatusControl({
  status = 'Not started',
  onChange,
  problemId,
  isCurriculum = false,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const dropdownRef = useRef(null);

  const currentNormalized = normalizeStatus(status);
  const currentOption =
    STATUS_OPTIONS.find((opt) => opt.id === currentNormalized) || STATUS_OPTIONS[0];
  const CurrentIcon = ICONS_BY_NAME[currentOption.iconName] || Circle;

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectStatus = (newStatus) => {
    setIsOpen(false);
    if (newStatus === currentNormalized) return;

    if (onChange) {
      onChange(newStatus);
    }

    // Show instant positive feedback toast when marked as Solved
    if (newStatus === 'Solved') {
      setToastMessage('Marked as Solved! Progress synchronized.');
      setTimeout(() => setToastMessage(null), 3000);
    }

    // Dispatch global event so sidebar, curriculum tree, and dashboard instantly update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('problem-status-updated', {
          detail: { problemId, status: newStatus, isCurriculum },
        })
      );
    }
  };

  return (
    <div className={cn('relative inline-flex items-center', className)} ref={dropdownRef}>
      {/* Status Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Problem status: ${currentOption.label}`}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-2xs select-none',
          currentOption.badgeClass
        )}
      >
        <CurrentIcon className={cn('w-3.5 h-3.5 shrink-0 stroke-[2.5]', currentOption.iconClass)} />
        <span>{currentOption.label}</span>
        <ChevronDown
          className={cn(
            'w-3 h-3 text-muted transition-transform duration-150',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 top-full mt-1.5 w-60 rounded-xl border border-border bg-panel shadow-xl z-50 py-1 text-xs animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="px-3 py-1.5 border-b border-border/60 text-[10px] font-semibold text-muted uppercase tracking-wider">
            Update Problem Status
          </div>

          <div className="p-1 space-y-0.5">
            {STATUS_OPTIONS.map((opt) => {
              const isSelected = opt.id === currentNormalized;
              const OptIcon = ICONS_BY_NAME[opt.iconName] || Circle;

              return (
                <button
                  key={opt.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectStatus(opt.id)}
                  className={cn(
                    'w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer',
                    isSelected
                      ? 'bg-elevated text-foreground font-bold'
                      : 'text-secondary hover:text-foreground hover:bg-elevated/60'
                  )}
                >
                  <OptIcon
                    className={cn('w-4 h-4 shrink-0 mt-0.5 stroke-[2.5]', opt.iconClass)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">{opt.label}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                      )}
                    </div>
                    <p className="text-[10px] text-muted leading-tight mt-0.5">
                      {opt.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Status Update Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-panel shadow-2xl text-xs font-medium text-foreground animate-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
