'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  User,
  Moon,
  Sun,
  Laptop,
  Code2,
  CalendarCheck2,
  Download,
  ShieldAlert,
  Save,
  CheckCircle2,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { CurrentProgressWizard } from '@/components/onboarding/CurrentProgressWizard';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState({
    display_name: '',
    email: '',
    preferred_language: 'javascript',
  });
  const [settings, setSettings] = useState({
    daily_review_goal: 10,
    preferred_code_language: 'javascript',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [curriculumData, setCurriculumData] = useState(null);

  useEffect(() => {
    async function loadCurriculum() {
      try {
        const res = await fetch('/api/curriculum');
        if (res.ok) {
          const data = await res.json();
          setCurriculumData(data);
        }
      } catch (e) {}
    }
    loadCurriculum();
  }, []);

  useEffect(() => {
    async function loadUserData() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const [{ data: prof }, { data: setts }] = await Promise.all([
            supabase.from('profiles').select('*').eq('id', user.id).single(),
            supabase.from('user_settings').select('*').eq('user_id', user.id).maybeSingle(),
          ]);

          if (prof) {
            setProfile({
              display_name: prof.display_name || '',
              email: prof.email || user.email || '',
              preferred_language: prof.preferred_language || 'javascript',
            });
          } else {
            setProfile((prev) => ({ ...prev, email: user.email || '' }));
          }

          if (setts) {
            setSettings({
              daily_review_goal: setts.daily_review_goal || 10,
              preferred_code_language: setts.preferred_code_language || 'javascript',
            });
          }
        }
      } catch (err) {
        console.error('Settings load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadUserData();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaveSuccess(false);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        await supabase
          .from('profiles')
          .update({
            display_name: profile.display_name,
            preferred_language: profile.preferred_language,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);

        await supabase
          .from('user_settings')
          .upsert(
            {
              user_id: user.id,
              daily_review_goal: Number(settings.daily_review_goal),
              preferred_code_language: settings.preferred_code_language,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id' }
          );

        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Save settings error:', err);
      alert('Error updating profile settings.');
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const supabase = createClient();
      const [{ data: probs }, { data: tops }, { data: pats }, { data: hist }] =
        await Promise.all([
          supabase.from('problems').select('*'),
          supabase.from('topics').select('*'),
          supabase.from('patterns').select('*'),
          supabase.from('problem_review_history').select('*'),
        ]);

      const exportPayload = {
        exported_at: new Date().toISOString(),
        version: '1.0',
        app: 'AlgoNotes',
        topics: tops || [],
        patterns: pats || [],
        problems: probs || [],
        review_history: hist || [],
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `algonotes-export-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error('Export error:', err);
      alert('Could not generate data export.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Settings className="w-6 h-6 text-accent" />
          Settings & Preferences
        </h1>
        <p className="text-xs text-muted mt-1">
          Customize your workspace appearance, code defaults, and export notes.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-500 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Theme Selection */}
      <div className="p-6 rounded-xl border border-border bg-panel shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-foreground">Workspace Theme</h2>
          <p className="text-xs text-muted mt-0.5">
            Choose your interface visual scheme. Persisted across all sessions.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-md pt-1">
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-2 transition-colors ${
              theme === 'light'
                ? 'border-accent bg-accent-subtle text-foreground'
                : 'border-border bg-elevated/40 text-muted hover:text-foreground'
            }`}
          >
            <Sun className="w-5 h-5 text-amber-500" />
            <span>Light</span>
          </button>

          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-2 transition-colors ${
              theme === 'dark'
                ? 'border-accent bg-accent/15 text-foreground'
                : 'border-border bg-elevated/40 text-muted hover:text-foreground'
            }`}
          >
            <Moon className="w-5 h-5 text-amber-400" />
            <span>Dark</span>
          </button>

          <button
            type="button"
            onClick={() => setTheme('system')}
            className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-2 transition-colors ${
              theme === 'system'
                ? 'border-accent bg-accent/15 text-foreground'
                : 'border-border bg-elevated/40 text-muted hover:text-foreground'
            }`}
          >
            <Laptop className="w-5 h-5 text-muted" />
            <span>System</span>
          </button>
        </div>
      </div>

      {/* Profile & Code Defaults Form */}
      <form onSubmit={handleSaveProfile} className="p-6 rounded-xl border border-border bg-panel shadow-xs space-y-5">
        <div>
          <h2 className="text-sm font-bold text-foreground">Account & Programming Preferences</h2>
          <p className="text-xs text-muted mt-0.5">
            Manage your display information and editor defaults.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
              Display Name
            </label>
            <Input
              value={profile.display_name}
              onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
              placeholder="Candidate Name"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <Input
              value={profile.email}
              disabled
              className="opacity-70 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
              Default Code Language
            </label>
            <Select
              value={settings.preferred_code_language}
              onChange={(e) =>
                setSettings({ ...settings, preferred_code_language: e.target.value })
              }
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="c">C</option>
            </Select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
              Daily Revision Target
            </label>
            <Input
              type="number"
              min={1}
              max={50}
              value={settings.daily_review_goal}
              onChange={(e) =>
                setSettings({ ...settings, daily_review_goal: e.target.value })
              }
            />
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" size="sm" className="gap-2">
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </Button>
        </div>
      </form>

      {/* Striver A2Z Progress Management */}
      <div className="p-6 rounded-xl border border-border bg-panel shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Striver A2Z Curriculum & Progress</span>
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Revisit your completed topics, mark newly solved questions, or adjust your active recall revision queue.
            </p>
          </div>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => setIsWizardOpen(true)}
            className="gap-2 font-bold shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Update My Progress</span>
          </Button>
        </div>

        {curriculumData?.stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs">
            <div className="p-3 rounded-lg bg-elevated/40 border border-border">
              <span className="font-bold text-foreground text-base block">
                {curriculumData.stats.totalTopicsStudied} / 18
              </span>
              <span className="text-[10px] text-muted">Topics Studied</span>
            </div>
            <div className="p-3 rounded-lg bg-elevated/40 border border-border">
              <span className="font-bold text-emerald-400 text-base block">
                {curriculumData.stats.totalSolved} / 463
              </span>
              <span className="text-[10px] text-muted">Questions Solved</span>
            </div>
            <div className="p-3 rounded-lg bg-elevated/40 border border-border">
              <span className="font-bold text-blue-400 text-base block">
                {curriculumData.stats.totalAttempted}
              </span>
              <span className="text-[10px] text-muted">Attempted</span>
            </div>
            <div className="p-3 rounded-lg bg-elevated/40 border border-border">
              <span className="font-bold text-amber-400 text-base block">
                {curriculumData.stats.totalNeedsRevision}
              </span>
              <span className="text-[10px] text-muted">Needs Revision</span>
            </div>
          </div>
        )}
      </div>

      {/* Progress Wizard Modal */}
      <CurrentProgressWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        curriculumData={curriculumData}
        initialMode="wizard"
        onComplete={() => {
          fetch('/api/curriculum').then(res => res.json()).then(data => setCurriculumData(data));
        }}
      />

      {/* Data Export & Backup */}
      <div className="p-6 rounded-xl border border-border bg-panel shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-foreground">Data Export & Backup</h2>
          <p className="text-xs text-muted mt-0.5">
            Download your full notebook database in JSON format (notes, solutions, patterns, and recall history).
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExportData}
          loading={isExporting}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export All Data (JSON)</span>
        </Button>
      </div>
    </div>
  );
}

