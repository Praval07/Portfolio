"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";

export function CommentSection() {
  const [comments, setComments] = useState([
    {
      name: "Aryan Sharma",
      date: "1 day ago",
      text: "Excellent writeup on agent loops. Dynamic streaming with server-sent events seems like the best path to prevent hitting API timeout thresholds on Vercel edge functions.",
    }
  ]);
  const [formData, setFormData] = useState({ name: "", email: "", text: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) return;
    
    setComments([
      ...comments,
      {
        name: formData.name,
        date: "Just now",
        text: formData.text,
      }
    ]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", text: "" });
    }, 1500);
  }

  return (
    <section className="border-t border-line pt-16 mt-16 w-full font-body">
      <h3 className="font-display text-2xl font-semibold mb-8 flex items-center gap-2.5 text-ink tracking-tight">
        <MessageSquare size={22} className="text-gold" /> 
        Discussion <span className="text-sm font-mono font-normal text-stone">({comments.length})</span>
      </h3>
      
      {/* Comments list */}
      <div className="flex flex-col gap-6 mb-12">
        {comments.map((comment, i) => (
          <div key={i} className="bg-surface border border-line rounded-2xl p-6 shadow-sm relative transition-all duration-300 hover:border-stone-light/50">
            <div className="flex items-center gap-3 mb-3 border-b border-line pb-3">
              <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-xs font-mono font-bold text-gold-deep select-none">
                {comment.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-ink leading-tight">{comment.name}</span>
                <span className="text-[10px] font-mono text-stone mt-0.5">{comment.date}</span>
              </div>
            </div>
            <p className="text-sm sm:text-[15px] text-ink-soft leading-relaxed font-body m-0">
              {comment.text}
            </p>
          </div>
        ))}
      </div>

      {/* Leave Reply Form */}
      <form onSubmit={handleSubmit} className="bg-[#FAF7F0]/30 dark:bg-[#161617]/20 border border-line rounded-3xl p-6 sm:p-8 flex flex-col gap-5">
        <div>
          <h4 className="font-display text-lg font-semibold text-ink tracking-tight mb-1">Join the Discussion</h4>
          <p className="text-xs text-stone leading-relaxed m-0 font-body">
            Share your insights or ask technical questions. Your email address will not be published.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center font-mono text-xs text-gold-deep border border-dashed border-gold/30 rounded-2xl bg-gold/5 animate-pulse">
            ✓ Comment posted successfully!
          </div>
        ) : (
          <>
             <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="commenter_name" className="font-mono text-[9px] text-stone uppercase tracking-wider font-semibold">Name</label>
                <input
                  type="text"
                  id="commenter_name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Praval Saxena"
                  className="blog-input rounded-full px-5 py-3 text-xs sm:text-sm outline-none font-body shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="commenter_email" className="font-mono text-[9px] text-stone uppercase tracking-wider font-semibold">Email</label>
                <input
                  type="email"
                  id="commenter_email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@email.com"
                  className="blog-input rounded-full px-5 py-3 text-xs sm:text-sm outline-none font-body shadow-sm"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="commenter_text" className="font-mono text-[9px] text-stone uppercase tracking-wider font-semibold">Comment</label>
              <textarea
                id="commenter_text"
                rows={5}
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder="Type your insights here..."
                className="blog-input rounded-2xl px-5 py-4 text-xs sm:text-sm outline-none font-body resize-none shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gold hover:bg-gold-hover text-ink font-mono text-xs font-semibold rounded-full py-3.5 px-8 transition-colors w-max cursor-pointer border border-transparent shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200"
            >
              Post Comment
            </button>
          </>
        )}
      </form>
    </section>
  );
}
