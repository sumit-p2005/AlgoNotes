'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  FolderTree,
  Folder,
  FolderOpen,
  Plus,
  Trash2,
  Edit2,
  ChevronRight,
  ChevronDown,
  FileCode2,
  AlertCircle,
  Save,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DifficultyBadge } from '@/components/ui/Badge';

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [problems, setProblems] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [expandedTopics, setExpandedTopics] = useState({});
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicParentId, setNewTopicParentId] = useState('');
  const [editingTopicId, setEditingTopicId] = useState(null);
  const [editTopicName, setEditTopicName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTopicsAndProblems = useCallback(async () => {
    try {
      const supabase = createClient();
      const [{ data: tData }, { data: pData }] = await Promise.all([
        supabase.from('topics').select('*').order('order_index', { ascending: true }),
        supabase.from('problems').select('id, title, difficulty, status, topic_id, problem_number'),
      ]);

      const loadedTopics = tData || [];
      setTopics(loadedTopics);
      setProblems(pData || []);
      setSelectedTopicId((prev) => prev || (loadedTopics.length > 0 ? loadedTopics[0].id : null));
    } catch (err) {
      console.error('Failed to load topics:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopicsAndProblems();
  }, [fetchTopicsAndProblems]);

  const toggleExpand = (id, e) => {
    e.stopPropagation();
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please sign in to add topics.');
        return;
      }

      const { data: created, error } = await supabase
        .from('topics')
        .insert({
          user_id: user.id,
          name: newTopicName.trim(),
          parent_id: newTopicParentId || null,
          order_index: topics.length + 1,
        })
        .select()
        .single();

      if (error) throw error;
      setTopics((prev) => [...prev, created]);
      setNewTopicName('');
      setNewTopicParentId('');
      setIsCreatingTopic(false);
      setSelectedTopicId(created.id);
    } catch (err) {
      console.error('Create topic error:', err);
      alert(`Could not create topic: ${err.message}`);
    }
  };

  const handleRenameTopic = async (topicId) => {
    if (!editTopicName.trim()) return;
    try {
      const supabase = createClient();
      await supabase.from('topics').update({ name: editTopicName.trim() }).eq('id', topicId);
      setTopics((prev) =>
        prev.map((t) => (t.id === topicId ? { ...t, name: editTopicName.trim() } : t))
      );
      setEditingTopicId(null);
    } catch (err) {
      console.error('Rename error:', err);
    }
  };

  const handleDeleteTopic = async (topic) => {
    const topicProblems = problems.filter((p) => p.topic_id === topic.id);
    const confirmMessage =
      topicProblems.length > 0
        ? `Warning: Topic "${topic.name}" contains ${topicProblems.length} problem note(s). Deleting the topic will unassign these problems. Continue?`
        : `Delete topic "${topic.name}"?`;

    if (!window.confirm(confirmMessage)) return;

    try {
      const supabase = createClient();
      await supabase.from('topics').delete().eq('id', topic.id);
      const remaining = topics.filter((t) => t.id !== topic.id);
      setTopics(remaining);
      if (selectedTopicId === topic.id) {
        setSelectedTopicId(remaining[0]?.id || null);
      }
    } catch (err) {
      console.error('Delete topic error:', err);
    }
  };

  const rootTopics = topics.filter((t) => !t.parent_id);
  const getSubtopics = (parentId) => topics.filter((t) => t.parent_id === parentId);

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);
  const selectedTopicProblems = problems.filter((p) => p.topic_id === selectedTopicId);

  return (
    <div className="flex flex-col md:flex-row h-full min-h-0 bg-page text-foreground overflow-hidden">
      {/* Left Tree Explorer */}
      <div className="w-full md:w-80 border-r border-border bg-panel flex flex-col shrink-0">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold text-foreground">Topic Explorer</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCreatingTopic(true)}
            className="p-1.5 rounded-lg border border-border text-muted hover:text-foreground hover:bg-elevated transition-colors"
            title="Create Topic"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Create Topic inline drawer */}
        {isCreatingTopic && (
          <form onSubmit={handleCreateTopic} className="p-3 border-b border-border bg-elevated/50 space-y-2.5">
            <span className="text-[11px] font-semibold uppercase text-muted tracking-wider block">
              Add New Topic
            </span>
            <Input
              required
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              placeholder="Topic name (e.g. Graphs, Trees)..."
              className="text-xs"
            />
            <select
              value={newTopicParentId}
              onChange={(e) => setNewTopicParentId(e.target.value)}
              className="w-full bg-panel border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
            >
              <option value="">Root level (No parent)</option>
              {rootTopics.map((rt) => (
                <option key={rt.id} value={rt.id}>
                  Inside: {rt.name}
                </option>
              ))}
            </select>
            <div className="flex items-center justify-end gap-2 pt-1">
              <Button variant="outline" size="sm" onClick={() => setIsCreatingTopic(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Create
              </Button>
            </div>
          </form>
        )}

        {/* Topics Tree */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {rootTopics.map((topic) => {
            const subtopics = getSubtopics(topic.id);
            const hasSub = subtopics.length > 0;
            const isSelected = selectedTopicId === topic.id;
            const isExpanded = !!expandedTopics[topic.id];

            return (
              <div key={topic.id} className="space-y-0.5">
                <div
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-elevated font-semibold text-foreground border-l-2 border-accent'
                      : 'text-muted hover:text-foreground hover:bg-elevated/40'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {hasSub ? (
                      <button
                        type="button"
                        onClick={(e) => toggleExpand(topic.id, e)}
                        className="p-0.5 text-muted hover:text-foreground"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                      </button>
                    ) : (
                      <Folder className="w-3.5 h-3.5 text-amber-400/80" />
                    )}
                    <span className="truncate">{topic.name}</span>
                  </div>

                  <span className="text-[10px] text-muted">
                    {problems.filter((p) => p.topic_id === topic.id).length}
                  </span>
                </div>

                {/* Subtopics */}
                {hasSub && isExpanded && (
                  <div className="pl-6 space-y-0.5 border-l border-border/40 ml-3.5 mt-0.5">
                    {subtopics.map((sub) => {
                      const isSubSelected = selectedTopicId === sub.id;
                      return (
                        <div
                          key={sub.id}
                          onClick={() => setSelectedTopicId(sub.id)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                            isSubSelected
                              ? 'bg-elevated font-semibold text-foreground'
                              : 'text-muted hover:text-foreground hover:bg-elevated/40'
                          }`}
                        >
                          <span className="truncate">{sub.name}</span>
                          <span className="text-[10px] text-muted">
                            {problems.filter((p) => p.topic_id === sub.id).length}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Panel: Selected Topic & its Problems */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
        {selectedTopic ? (
          <div className="max-w-4xl space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-border">
              <div>
                <span className="text-xs font-semibold uppercase text-amber-500 tracking-wider">
                  Topic Notebook
                </span>
                {editingTopicId === selectedTopic.id ? (
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      value={editTopicName}
                      onChange={(e) => setEditTopicName(e.target.value)}
                      className="text-lg font-bold"
                    />
                    <Button size="sm" onClick={() => handleRenameTopic(selectedTopic.id)}>
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingTopicId(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <h1 className="text-2xl font-bold text-foreground mt-0.5">
                    {selectedTopic.name}
                  </h1>
                )}
                <p className="text-xs text-muted mt-1">
                  {selectedTopicProblems.length} saved problem note(s) in this topic.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/problems/new?topic_id=${selectedTopic.id}`}>
                  <Button size="sm" className="gap-1.5">
                    <Plus className="w-4 h-4" />
                    <span>Add Problem</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingTopicId(selectedTopic.id);
                    setEditTopicName(selectedTopic.name);
                  }}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteTopic(selectedTopic)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* List of Problems under this topic */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted block">
                Problems In This Topic
              </span>

              {selectedTopicProblems.length === 0 ? (
                <div className="p-8 text-center rounded-xl border border-border bg-panel space-y-2">
                  <p className="text-xs text-muted">
                    No problems in &quot;{selectedTopic.name}&quot; yet.
                  </p>
                  <Link href={`/problems/new?topic_id=${selectedTopic.id}`}>
                    <Button size="sm">Create First Problem Note</Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-border/60 rounded-xl border border-border bg-panel overflow-hidden">
                  {selectedTopicProblems.map((prob) => (
                    <div
                      key={prob.id}
                      className="p-3.5 flex items-center justify-between hover:bg-elevated/40 transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        {prob.problem_number && (
                          <span className="font-mono text-muted text-xs">
                            #{prob.problem_number}
                          </span>
                        )}
                        <Link
                          href={`/problems/${prob.id}`}
                          className="text-xs font-semibold text-foreground hover:text-amber-400 truncate"
                        >
                          {prob.title}
                        </Link>
                      </div>

                      <div className="flex items-center gap-2">
                        <DifficultyBadge difficulty={prob.difficulty} size="sm" />
                        <Link
                          href={`/problems/${prob.id}`}
                          className="p-1 rounded text-muted hover:text-foreground"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-muted">
            Select a topic to explore its problems or create a new topic.
          </div>
        )}
      </div>
    </div>
  );
}

