"use client";

import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  children: string;
  className?: string;
  filename?: string;
}

export function CodeBlock({ children, className = "", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract language from class (e.g. language-js, language-python)
  const language = useMemo(() => {
    const match = className.match(/language-(\w+)/);
    return match ? match[1] : "txt";
  }, [className]);

  const rawCode = useMemo(() => children.trim(), [children]);

  // Clean lines of code
  const lines = useMemo(() => rawCode.split("\n"), [rawCode]);

  function copyToClipboard() {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Tokenize code for basic syntax highlighting matching the portfolio theme
  // Gold/Yellow: keywords, classes
  // Stone: comments
  // Cream/Light: text, parameters
  // Soft Gold: strings, functions
  const highlightedLines = useMemo(() => {
    return lines.map((line) => {
      if (!line.trim()) return "&nbsp;";

      // Escape HTML characters
      let escaped = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Skip parsing if it's plain text
      if (language === "txt" || language === "text") return escaped;

      // 1. Comments
      const commentRegex = /(\/\/.*|#.*|\/\*[\s\S]*?\*\/)/g;
      const comments: string[] = [];
      escaped = escaped.replace(commentRegex, (match) => {
        comments.push(match);
        return `__COMMENT_${comments.length - 1}__`;
      });

      // 2. Strings
      const stringRegex = /(["'`])(.*?)\1/g;
      const strings: string[] = [];
      escaped = escaped.replace(stringRegex, (match) => {
        strings.push(match);
        return `__STRING_${strings.length - 1}__`;
      });

      // 3. Keywords
      const keywords = [
        "const", "let", "var", "function", "class", "return", "if", "else", "for", "while",
        "async", "await", "try", "catch", "throw", "new", "import", "export", "default", "from",
        "as", "type", "interface", "def", "elif", "except", "with", "lambda", "self", "public",
        "private", "protected", "implements", "extends", "from", "select", "where", "insert",
        "into", "values", "update", "delete", "create", "table", "join", "on"
      ];
      const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
      escaped = escaped.replace(keywordRegex, '<span class="text-gold font-semibold">$1</span>');

      // 4. Common Types/Builtins
      const builtins = [
        "string", "number", "boolean", "any", "void", "unknown", "never", "Promise", "React",
        "useState", "useEffect", "useMemo", "useCallback", "console", "log", "error", "print",
        "len", "range", "list", "dict", "set", "int", "str", "float", "document", "window"
      ];
      const builtinRegex = new RegExp(`\\b(${builtins.join("|")})\\b`, "g");
      escaped = escaped.replace(builtinRegex, '<span class="text-gold-soft">$1</span>');

      // 5. Restoring Strings
      strings.forEach((str, index) => {
        escaped = escaped.replace(
          `__STRING_${index}__`,
          `<span class="text-amber-300/90 font-medium">${str}</span>`
        );
      });

      // 6. Restoring Comments
      comments.forEach((comment, index) => {
        escaped = escaped.replace(
          `__COMMENT_${index}__`,
          `<span class="text-stone italic">${comment}</span>`
        );
      });

      return escaped;
    });
  }, [lines, language]);

  return (
    <div className="border border-line rounded-2xl overflow-hidden bg-[#1F2025] my-8 font-mono text-sm leading-relaxed shadow-[0_12px_40px_-15px_rgba(0,0,0,0.4)]">
      {/* Header Panel */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-light/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-stone-light/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-stone-light/20" />
          </span>
          {filename && (
            <span className="text-stone-light/60 text-xs font-mono select-none border-l border-white/10 pl-3">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-stone-light/40 text-[10px] font-mono uppercase tracking-wider select-none bg-white/5 px-2 py-0.5 rounded">
            {language}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 text-stone-light/60 hover:text-white transition-colors text-xs select-none cursor-pointer"
            aria-label="Copy code block content"
          >
            {copied ? (
              <>
                <Check size={13} className="text-gold" />
                <span className="text-gold font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Container */}
      <div className="overflow-x-auto py-5 flex">
        {/* Line Numbers */}
        <div className="text-right select-none text-stone-light/20 pr-4 pl-6 border-r border-white/5 text-xs font-semibold flex flex-col justify-between align-middle min-w-[50px]">
          {lines.map((_, i) => (
            <span key={i} className="block leading-[1.7]">
              {i + 1}
            </span>
          ))}
        </div>

        {/* Highlighted Code */}
        <pre className="flex-1 px-6 text-[#F5F5F5] font-mono text-xs sm:text-sm overflow-x-auto leading-[1.7]">
          <code>
            {highlightedLines.map((line, i) => (
              <span
                key={i}
                className="block whitespace-pre"
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
