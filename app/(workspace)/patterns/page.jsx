'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Layers,
  Plus,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileCode2,
  Trash2,
  Edit2,
  X,
  Save,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { DifficultyBadge } from '@/components/ui/Badge';

export default function PatternsPage() {
  const [patterns, setPatterns] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [associatedProblems, setAssociatedProblems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form state for create/edit
  const [patternForm, setPatternForm] = useState({
    name: '',
    description: '',
    recognition_clues: '',
    when_to_use: '',
    when_not_to_use: '',
    algorithmic_intuition: '',
    common_mistakes: '',
    complexity_considerations: '',
  });

  const fetchPatterns = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('patterns')
        .select('*')
        .order('name', { ascending: true });

      if (data && data.length > 0) {
        setPatterns(data);
        setSelectedPattern((prev) => prev || data[0]);
      } else {
        // Fallback default patterns for initial view
        const defaults = [
          {
            id: 'two-pointers',
            name: 'Two Pointers',
            description: 'Traverses arrays or sequences using two pointers moving at varying speeds or directions.',
            recognition_clues: 'Sorted arrays, pairs with target sum, palindrome checking, partitioning.',
            when_to_use: 'Sorted collections, monotonic conditions where moving a pointer guarantees eliminating impossible options.',
            when_not_to_use: 'Unsorted arrays where sorting destroys original indexing or is O(n log n) prohibitive.',
            algorithmic_intuition: 'Eliminates redundant comparisons in O(1) by maintaining invariants.',
            common_mistakes: 'Pointer collision off-by-one errors, infinite loops when pointers do not advance.',
            complexity_considerations: 'Time: O(N), Space: O(1) auxiliary.',
          },
          {
            id: 'sliding-window',
            name: 'Sliding Window',
            description: 'Computes metrics over contiguous subarrays/substrings in linear time.',
            recognition_clues: 'Contiguous subarrays, longest/shortest substring satisfying condition, distinct elements window.',
            when_to_use: 'Contiguous segment problems with monotonic expansion and shrinkage.',
            when_not_to_use: 'Non-contiguous problems or negative weights destroying monotonicity.',
            algorithmic_intuition: 'Expand right pointer to satisfy goal; shrink left pointer to minimize or regain validity.',
            common_mistakes: 'Updating window metrics before checking validity.',
            complexity_considerations: 'Time: O(N), Space: O(K) for character/frequency hashmap.',
          },
        ];
        setPatterns(defaults);
        setSelectedPattern((prev) => prev || defaults[0]);
      }
    } catch (err) {
      console.error('Failed to load patterns:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatterns();
  }, [fetchPatterns]);

  // Fetch associated problems when selected pattern changes
  useEffect(() => {
    async function loadAssociatedProblems() {
      if (!selectedPattern?.id) return;
      try {
        const supabase = createClient();
        const { data: links } = await supabase
          .from('problem_patterns')
          .select('problem_id')
          .eq('pattern_id', selectedPattern.id);

        if (links && links.length > 0) {
          const problemIds = links.map((l) => l.problem_id);
          const { data: probList } = await supabase
            .from('problems')
            .select('id, title, difficulty, status, problem_number')
            .in('id', problemIds);
          setAssociatedProblems(probList || []);
        } else {
          setAssociatedProblems([]);
        }
      } catch {
        setAssociatedProblems([]);
      }
    }
    loadAssociatedProblems();
  }, [selectedPattern]);

  const handleSelectPattern = (pat) => {
    setSelectedPattern(pat);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setPatternForm({
      name: '',
      description: '',
      recognition_clues: '',
      when_to_use: '',
      when_not_to_use: '',
      algorithmic_intuition: '',
      common_mistakes: '',
      complexity_considerations: '',
    });
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleStartEdit = () => {
    if (!selectedPattern) return;
    setPatternForm({ ...selectedPattern });
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleSavePattern = async (e) => {
    e.preventDefault();
    if (!patternForm.name.trim()) return;

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert('Please sign in to save patterns.');
        return;
      }

      if (isCreating) {
        const { data: newPat, error } = await supabase
          .from('patterns')
          .insert({
            user_id: user.id,
            ...patternForm,
          })
          .select()
          .single();

        if (error) throw error;
        setPatterns((prev) => [...prev, newPat]);
        setSelectedPattern(newPat);
        setIsCreating(false);
      } else if (isEditing && selectedPattern?.id) {
        const { data: updated, error } = await supabase
          .from('patterns')
          .update({
            ...patternForm,
            updated_at: new Date().toISOString(),
          })
          .eq('id', selectedPattern.id)
          .select()
          .single();

        if (error) throw error;
        setPatterns((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
        setSelectedPattern(updated);
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Save pattern error:', err);
      alert(`Error saving pattern: ${err.message}`);
    }
  };

  const handleDeletePattern = async () => {
    if (!selectedPattern?.id) return;
    if (!window.confirm(`Delete pattern "${selectedPattern.name}"?`)) return;

    try {
      const supabase = createClient();
      await supabase.from('patterns').delete().eq('id', selectedPattern.id);
      const remaining = patterns.filter((p) => p.id !== selectedPattern.id);
      setPatterns(remaining);
      setSelectedPattern(remaining[0] || null);
    } catch (err) {
      console.error('Delete pattern error:', err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-0 bg-page text-foreground overflow-hidden">
      {/* Left List of Patterns */}
      <div className="w-full md:w-72 lg:w-80 border-r border-border bg-panel flex flex-col shrink-0">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <h2 className="text-sm font-bold text-foreground">Pattern Library</h2>
          </div>
          <button
            type="button"
            onClick={handleStartCreate}
            className="p-1.5 rounded-lg border border-border text-muted hover:text-foreground hover:bg-elevated transition-colors"
            title="Create New Pattern"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {patterns.map((pat) => {
            const isSelected = selectedPattern?.id === pat.id && !isCreating;
            return (
              <button
                key={pat.id}
                onClick={() => handleSelectPattern(pat)}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-elevated text-foreground font-semibold border-l-2 border-accent'
                    : 'text-muted hover:text-foreground hover:bg-elevated/50'
                }`}
              >
                <span className="truncate">{pat.name}</span>
                <span className="text-[10px] text-muted opacity-70">DSA</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Pattern Detail / Editor Surface */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
        {isCreating || isEditing ? (
          /* Form for Create / Edit Pattern */
          <form onSubmit={handleSavePattern} className="max-w-3xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">
                {isCreating ? 'Create Algorithmic Pattern' : `Edit ${patternForm.name}`}
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsCreating(false);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="gap-1.5">
                  <Save className="w-4 h-4" />
                  <span>Save Pattern</span>
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Pattern Name
              </label>
              <Input
                required
                value={patternForm.name}
                onChange={(e) => setPatternForm({ ...patternForm, name: e.target.value })}
                placeholder="e.g. Fast & Slow Pointers"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Pattern Overview & Description
              </label>
              <Textarea
                rows={3}
                value={patternForm.description}
                onChange={(e) => setPatternForm({ ...patternForm, description: e.target.value })}
                placeholder="Core definition and high-level premise..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Recognition Clues (Problem signals)
              </label>
              <Textarea
                rows={3}
                value={patternForm.recognition_clues}
                onChange={(e) => setPatternForm({ ...patternForm, recognition_clues: e.target.value })}
                placeholder="What keywords, constraints, or structures hint at this pattern?"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  When To Use
                </label>
                <Textarea
                  rows={3}
                  value={patternForm.when_to_use}
                  onChange={(e) => setPatternForm({ ...patternForm, when_to_use: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  When Unsuitable / Avoid
                </label>
                <Textarea
                  rows={3}
                  value={patternForm.when_not_to_use}
                  onChange={(e) => setPatternForm({ ...patternForm, when_not_to_use: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Algorithmic Intuition & Invariant
              </label>
              <Textarea
                rows={4}
                value={patternForm.algorithmic_intuition}
                onChange={(e) => setPatternForm({ ...patternForm, algorithmic_intuition: e.target.value })}
                placeholder="Mental model, state transitions, step invariant..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Common Pitfalls & Mistakes
                </label>
                <Textarea
                  rows={3}
                  value={patternForm.common_mistakes}
                  onChange={(e) => setPatternForm({ ...patternForm, common_mistakes: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Complexity Considerations
                </label>
                <Textarea
                  rows={3}
                  value={patternForm.complexity_considerations}
                  onChange={(e) => setPatternForm({ ...patternForm, complexity_considerations: e.target.value })}
                  placeholder="e.g. O(N) time, O(1) space"
                />
              </div>
            </div>
          </form>
        ) : selectedPattern ? (
          /* View Mode for Selected Pattern */
          <div className="max-w-4xl space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-border">
              <div>
                <span className="text-xs font-semibold uppercase text-purple-400 tracking-wider">
                  Algorithmic Pattern
                </span>
                <h1 className="text-2xl font-bold text-foreground mt-0.5">
                  {selectedPattern.name}
                </h1>
                <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed max-w-2xl">
                  {selectedPattern.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleStartEdit} className="gap-1.5">
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Button>
                <Button variant="danger" size="sm" onClick={handleDeletePattern} className="gap-1.5">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </Button>
              </div>
            </div>

            {/* Recognition Clues */}
            {selectedPattern.recognition_clues && (
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4" /> Recognition Clues
                </span>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  {selectedPattern.recognition_clues}
                </p>
              </div>
            )}

            {/* Intuition & Invariant */}
            {selectedPattern.algorithmic_intuition && (
              <div className="p-4 rounded-xl border border-border bg-panel space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-accent" /> Algorithmic Intuition
                </span>
                <p className="text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedPattern.algorithmic_intuition}
                </p>
              </div>
            )}

            {/* When to use vs When not to use */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> When To Use
                </span>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  {selectedPattern.when_to_use || 'Specific problem types where this pattern yields optimal complexity.'}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> When Unsuitable
                </span>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  {selectedPattern.when_not_to_use || 'Cases where constraints or properties invalidate this approach.'}
                </p>
              </div>
            </div>

            {/* Associated Problems in this Pattern */}
            <div className="pt-4 border-t border-border">
              <span className="text-xs font-bold uppercase tracking-wider text-muted block mb-3">
                Associated Problems ({associatedProblems.length})
              </span>

              {associatedProblems.length === 0 ? (
                <p className="text-xs text-muted">
                  No problems tagged with this pattern yet. Tag problems in the problem notebook.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {associatedProblems.map((prob) => (
                    <Link
                      key={prob.id}
                      href={`/problems/${prob.id}`}
                      className="p-3 rounded-lg border border-border bg-panel hover:bg-elevated flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        {prob.problem_number && (
                          <span className="font-mono text-muted text-xs">
                            #{prob.problem_number}
                          </span>
                        )}
                        <span className="text-xs font-semibold text-foreground truncate">
                          {prob.title}
                        </span>
                      </div>
                      <DifficultyBadge difficulty={prob.difficulty} size="sm" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center p-12 text-muted text-sm">
            Select a pattern to view details or create a new one.
          </div>
        )}
      </div>
    </div>
  );
}

