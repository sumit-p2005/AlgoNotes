'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

export function MarkdownRenderer({ content = '', className = '' }) {
  if (!content || !content.trim()) {
    return (
      <div className="text-sm italic text-muted">
        No notes provided yet.
      </div>
    );
  }

  return (
    <div className={`prose prose-stone dark:prose-invert max-w-none text-sm leading-relaxed ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-lg font-bold mt-4 mb-2 text-foreground" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-base font-semibold mt-3 mb-1.5 text-foreground" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-sm font-semibold mt-2.5 mb-1 text-foreground" {...props} />,
          p: ({ node, ...props }) => <p className="mb-2.5 text-foreground/90 leading-relaxed" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2.5 space-y-1 text-foreground/90" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-2.5 space-y-1 text-foreground/90" {...props} />,
          li: ({ node, ...props }) => <li className="text-foreground/90" {...props} />,
          code: ({ node, inline, ...props }) => (
            inline ? (
              <code className="px-1.5 py-0.5 rounded bg-elevated text-amber-500 font-mono text-xs" {...props} />
            ) : (
              <pre className="p-3 my-2 rounded-lg bg-elevated font-mono text-xs overflow-x-auto text-foreground border border-border">
                <code {...props} />
              </pre>
            )
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-2 border-accent pl-3 py-1 my-2 text-muted italic" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-3">
              <table className="w-full text-left border-collapse border border-border text-xs" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => <th className="border border-border p-2 bg-elevated font-semibold text-foreground" {...props} />,
          td: ({ node, ...props }) => <td className="border border-border p-2 text-foreground/90" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

