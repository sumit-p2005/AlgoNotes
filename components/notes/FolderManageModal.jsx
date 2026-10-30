'use client';

import React, { useState } from 'react';
import { Folder, X, Plus, Edit2, Trash2, Check, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function FolderManageModal({
  isOpen,
  onClose,
  folders = [],
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
}) {
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editName, setEditName] = useState('');
  const [deletingFolder, setDeletingFolder] = useState(null); // folder obj
  const [destinationFolderId, setDestinationFolderId] = useState('');

  if (!isOpen) return null;

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    await onCreateFolder(newFolderName.trim());
    setNewFolderName('');
  };

  const handleStartRename = (folder) => {
    setEditingFolderId(folder.id);
    setEditName(folder.name);
  };

  const handleSaveRename = async (folderId) => {
    if (!editName.trim()) return;
    await onRenameFolder(folderId, editName.trim());
    setEditingFolderId(null);
    setEditName('');
  };

  const handleConfirmDelete = async () => {
    if (!deletingFolder) return;
    await onDeleteFolder(deletingFolder.id, destinationFolderId || null);
    setDeletingFolder(null);
    setDestinationFolderId('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Manage Folders"
        className="w-full max-w-md rounded-2xl border border-border bg-panel shadow-2xl overflow-hidden text-foreground"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-elevated/40">
          <div className="flex items-center gap-2.5">
            <Folder className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-sm text-foreground">Manage Folders</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-elevated transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Create New Folder Input */}
          <form onSubmit={handleCreate} className="space-y-2">
            <label className="text-xs font-semibold text-muted block">
              Create New Folder
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="e.g. System Design, College Notes..."
                className="flex-1 px-3 py-2 rounded-xl border border-border bg-page text-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="submit"
                disabled={!newFolderName.trim()}
                className="px-4 py-2 rounded-xl bg-accent text-accent-text hover:bg-accent-hover font-bold text-xs transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create</span>
              </button>
            </div>
          </form>

          {/* Folder List */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted block">
              Existing Folders ({folders.length})
            </label>
            {folders.length === 0 ? (
              <p className="text-xs text-muted/60 italic py-2">No folders created yet.</p>
            ) : (
              <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
                {folders.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between p-2 rounded-xl border border-border/60 bg-elevated/40 hover:bg-elevated transition-colors"
                  >
                    {editingFolderId === f.id ? (
                      <div className="flex items-center gap-2 flex-1 mr-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="flex-1 px-2 py-1 rounded-lg border border-accent bg-page text-xs text-foreground focus:outline-none"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveRename(f.id)}
                          className="p-1 rounded text-emerald-400 hover:bg-emerald-400/10"
                          title="Save name"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingFolderId(null)}
                          className="p-1 rounded text-muted hover:text-foreground"
                          title="Cancel"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 min-w-0">
                          <Folder className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span className="text-xs font-medium text-foreground truncate">
                            {f.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleStartRename(f)}
                            className="p-1 rounded text-muted hover:text-foreground hover:bg-page transition-colors"
                            title="Rename"
                            aria-label={`Rename folder ${f.name}`}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingFolder(f)}
                            className="p-1 rounded text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete"
                            aria-label={`Delete folder ${f.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delete Confirmation Sub-Dialog */}
          {deletingFolder && (
            <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-3 animate-in fade-in">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-rose-400">
                    Delete Folder: &quot;{deletingFolder.name}&quot;?
                  </h4>
                  <p className="text-[11px] text-muted mt-0.5">
                    What should happen to the notes inside this folder?
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-muted block">
                  Move existing notes to:
                </label>
                <select
                  value={destinationFolderId}
                  onChange={(e) => setDestinationFolderId(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-panel text-xs text-foreground focus:outline-none cursor-pointer"
                >
                  <option value="">(Unorganized / No Folder)</option>
                  {folders
                    .filter((f) => f.id !== deletingFolder.id)
                    .map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setDeletingFolder(null)}
                  className="px-3 py-1.5 rounded-lg border border-border bg-panel text-xs font-medium text-muted hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-3 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-colors cursor-pointer"
                >
                  Delete Folder
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
