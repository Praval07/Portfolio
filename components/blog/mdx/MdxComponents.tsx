import React from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle, Info, Zap, Scale, GitPullRequest, Search } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { ArticleImage } from "./ArticleImage";

// Custom heading renderer to auto-generate IDs for TOC navigation
const Heading2 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  const text = typeof children === "string" ? children : "";
  const id = text
    ? text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    : undefined;
  return (
    <h2
      id={id}
      className="text-2xl sm:text-3xl font-display font-semibold mt-12 mb-6 text-ink scroll-mt-20 border-b border-line pb-3 tracking-tight"
      {...props}
    >
      {children}
    </h2>
  );
};

const Heading3 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  const text = typeof children === "string" ? children : "";
  const id = text
    ? text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    : undefined;
  return (
    <h3
      id={id}
      className="text-xl sm:text-2xl font-display font-medium mt-8 mb-4 text-ink scroll-mt-20 tracking-tight"
      {...props}
    >
      {children}
    </h3>
  );
};

// Generic Callout Box
interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "success" | "note";
  title?: string;
}

export function Callout({ children, type = "info", title }: CalloutProps) {
  const styles = {
    info: {
      text: "text-ink-soft",
      icon: <Info size={16} className="text-gold" />,
    },
    warning: {
      text: "text-ink-soft",
      icon: <AlertCircle size={16} className="text-gold-deep" />,
    },
    success: {
      text: "text-ink-soft",
      icon: <CheckCircle size={16} className="text-emerald-500" />,
    },
    note: {
      text: "text-ink-soft",
      icon: <Info size={16} className="text-gold" />,
    },
  };

  const current = styles[type] || styles.info;
  const calloutClass = type === "warning" ? "callout-warning" : "callout-info";

  return (
    <div className={`my-8 p-5 sm:p-6 rounded-2xl ${calloutClass} ${current.text} shadow-soft`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 select-none">{current.icon}</div>
        <div className="flex-1">
          {title && (
            <h5 className="font-mono text-xs font-semibold tracking-wider text-ink uppercase mb-2 select-none">
              {title}
            </h5>
          )}
          <div className="text-sm sm:text-[15px] leading-relaxed font-body [&>p]:m-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Engineering Notes (Decision, Tradeoff, Perf, Architecture, Finding)
interface EngineeringNoteProps {
  children: React.ReactNode;
  type: "decision" | "tradeoff" | "performance" | "architecture" | "finding";
  title: string;
}

export function EngineeringNote({ children, type, title }: EngineeringNoteProps) {
  const config = {
    decision: {
      icon: <GitPullRequest size={16} />,
      label: "Engineering Decision",
    },
    tradeoff: {
      icon: <Scale size={16} />,
      label: "Architectural Trade-off",
    },
    performance: {
      icon: <Zap size={16} />,
      label: "Performance Optimization",
    },
    architecture: {
      icon: <Info size={16} />,
      label: "System Blueprint",
    },
    finding: {
      icon: <Search size={16} />,
      label: "Research Note",
    },
  };

  const item = config[type] || config.architecture;

  return (
    <div className="my-8 callout-engineering p-6 rounded-r-2xl shadow-soft">
      <div className="flex items-center gap-2 mb-3 text-stone font-mono text-[10px] uppercase tracking-wider select-none">
        {item.icon}
        <span>{item.label}</span>
      </div>
      <h4 className="text-base sm:text-lg font-display font-medium text-ink mb-3 tracking-tight">
        {title}
      </h4>
      <div className="text-sm sm:text-[15px] leading-relaxed text-ink-soft font-body [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}

// Custom Checklist Component
export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3 my-6 list-none p-0">
      {(items ?? []).map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-ink-soft list-none m-0">
          <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full border border-gold bg-gold/5 flex items-center justify-center text-[10px] text-gold-deep font-bold select-none">
            ✓
          </span>
          <span className="font-body leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Vertical Editorial Timeline
interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative border-l border-line pl-6 my-10 flex flex-col gap-8 ml-3">
      {(items ?? []).map((item, i) => (
        <div key={i} className="relative group">
          {/* Node */}
          <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-gold bg-paper group-hover:scale-110 transition-transform select-none" />
          <span className="font-mono text-[10px] text-gold-deep font-semibold tracking-wider block mb-1">
            {item.date}
          </span>
          <h4 className="text-base font-display font-medium text-ink mb-1.5 tracking-tight">
            {item.title}
          </h4>
          <p className="text-sm text-ink-soft leading-relaxed font-body m-0">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

// Math Formula Block
export function MathBlock({ formula, caption }: { formula: string; caption?: string }) {
  return (
    <div className="my-8 text-center bg-paper-deep border border-line rounded-2xl p-6 sm:p-8 font-mono select-all">
      <div className="text-lg sm:text-xl text-ink font-semibold tracking-wide overflow-x-auto py-2">
        {formula}
      </div>
      {caption && (
        <div className="text-stone font-mono text-[10px] mt-4 uppercase tracking-wider select-none">
          {caption}
        </div>
      )}
    </div>
  );
}

// Footnotes list wrapper
export function Footnotes({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-line mt-16 pt-8 font-body">
      <span className="font-mono text-[10px] text-stone uppercase tracking-wider mb-4 block select-none">
        Footnotes & References
      </span>
      <div className="text-xs text-stone leading-relaxed flex flex-col gap-3 [&_a]:text-gold-deep hover:[&_a]:text-gold [&_a]:underline">
        {children}
      </div>
    </div>
  );
}

// Export custom MDX component dictionary
export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl sm:text-4xl font-display font-semibold mt-16 mb-8 text-ink tracking-tight leading-tight"
      {...props}
    />
  ),
  h2: Heading2,
  h3: Heading3,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base sm:text-lg leading-relaxed text-ink-soft mb-6 font-body font-normal" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc pl-6 mb-6 flex flex-col gap-2 font-body text-ink-soft" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal pl-6 mb-6 flex flex-col gap-2 font-body text-ink-soft" {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="text-sm sm:text-base leading-relaxed pl-1" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = props.href?.startsWith("/");
    if (isInternal) {
      return (
        <Link
          href={props.href || ""}
          className="text-gold-deep dark:text-gold hover:text-ink hover:underline font-medium transition-colors"
          {...(props as unknown as Record<string, unknown>)}
        />
      );
    }
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold-deep dark:text-gold hover:text-ink hover:underline font-medium transition-colors inline-flex items-center gap-0.5"
        {...props}
      />
    );
  },
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-gold bg-[#F9F8F4] pl-6 py-5 my-8 rounded-r-2xl font-display text-lg sm:text-xl text-ink leading-relaxed italic">
      {props.children}
    </blockquote>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="font-mono text-xs sm:text-sm bg-stone-light/35 dark:bg-stone-light/10 text-gold-deep px-1.5 py-0.5 rounded border border-line"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
    // Intercept code blocks to render CodeBlock with line numbers and copy buttons
    const children = props.children;
    if (children && React.isValidElement(children)) {
      const codeProps = children.props as { className?: string; filename?: string; title?: string; "data-filename"?: string; children?: string };
      return (
        <CodeBlock
          className={codeProps.className}
          filename={codeProps.filename || codeProps.title || codeProps["data-filename"]}
        >
          {codeProps.children || ""}
        </CodeBlock>
      );
    }
    return <pre {...props} />;
  },
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8 border border-line rounded-2xl">
      <table className="w-full text-left border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <thead className="bg-[#F7F5EF] border-b border-line font-mono text-[10px] uppercase tracking-wider text-stone" {...props} />,
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => <th className="px-6 py-3.5 font-semibold text-ink select-none" {...props} />,
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody className="divide-y divide-line" {...props} />,
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => <td className="px-6 py-4 text-ink-soft" {...props} />,
  
  // Custom custom named components that can be used directly in MDX
  Callout,
  EngineeringNote,
  Checklist,
  Timeline,
  MathBlock,
  Footnotes,
  ArticleImage,
};
