"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    
    // Simulate API call
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 2500);
  }

  return (
    <div className="border border-line rounded-3xl p-6 sm:p-8 mt-8 bg-paper relative overflow-hidden flex flex-col gap-4 font-body shadow-soft">
      <div className="flex items-center gap-2 text-gold">
        <Send size={18} />
        <span className="font-mono text-[10px] text-stone uppercase tracking-wider select-none">Engineering Digest</span>
      </div>
      <h4 className="font-display text-xl font-semibold text-ink leading-tight m-0">
        Subscribe to the Journal
      </h4>
      <p className="text-xs sm:text-sm text-ink-soft leading-relaxed m-0 font-body">
        Deep-dives on distributed systems, AI agent workflows, and performance optimization guidelines. No spam, only engineering.
      </p>

      {subscribed ? (
        <div className="py-4 text-center font-mono text-xs text-gold-deep border border-dashed border-gold/30 rounded-2xl bg-gold/5 animate-pulse">
          ✓ Subscribed! Thank you for joining the digest.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@email.com"
            className="flex-1 blog-input rounded-full px-5 py-3 text-xs sm:text-sm outline-none font-body shadow-sm"
            required
          />
          <button 
            type="submit"
            className="bg-gold hover:bg-gold-hover text-ink font-mono text-xs font-semibold rounded-full py-3.5 px-6 transition-colors cursor-pointer border border-transparent shadow-sm whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
