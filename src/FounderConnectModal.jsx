import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Mail, 
  Check, 
  Copy, 
  ExternalLink, 
  Github, 
  Linkedin, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Camera,
  ShoppingBag
} from 'lucide-react';

export default function FounderConnectModal({ isOpen, onClose, intent = 'apply' }) {
  const [copied, setCopied] = useState(false);
  const founderName = 'Harshit Agarwal';
  const founderRole = 'AI Product Manager & 0-to-1 Systems Builder';
  const founderEmail = 'agarwal.harshit97@gmail.com';
  const githubUser = 'https://github.com/1997agarwal';
  const githubRepo = 'https://github.com/Trend-Tribe/DupeScout';
  const linkedinUrl = 'https://www.linkedin.com/in/1997agarwal';
  const xUrl = 'https://x.com/1997agarwal';

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(founderEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getSubject = () => {
    if (intent === 'signin') {
      return '[DupeScout Seller Access] Seller Portal Access & API Integration Request';
    }
    if (intent === 'demo') {
      return '[DupeScout Walkthrough] Multimodal AI Visual Catalog Walkthrough Request';
    }
    if (intent === 'radar') {
      return '[DupeScout Merchant] Trending Dupe Radar & Catalog Vectorization Inquiry';
    }
    return '[DupeScout Seller] Merchant Onboarding & Catalog Walkthrough';
  };

  const getHeading = () => {
    if (intent === 'signin') {
      return 'Seller Portal & API Access';
    }
    if (intent === 'demo') {
      return 'Explore Multimodal Visual Search Live';
    }
    if (intent === 'radar') {
      return 'Access Live Trending Dupe Radar';
    }
    return 'Book 1-on-1 Merchant Onboarding & Catalog Walkthrough';
  };

  const mailtoSubject = encodeURIComponent(getSubject());
  const mailtoBody = encodeURIComponent(
    `Hi Harshit,\n\nI was exploring the DupeScout merchant showcase and would love to schedule a 1-on-1 walkthrough to onboard our apparel/fashion catalog and explore how your Visual AI matches Gen Z screenshot demand to our inventory.\n\nBrand Name:\nProduct Category:\nEstimated Monthly Units:\n\nBest,\n`
  );

  const mailtoLink = `mailto:${founderEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div 
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl p-6 sm:p-8 z-10 transition-all"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Public Showcase • Private Multi-Modal Visual Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white tracking-tight leading-snug">
              {getHeading()}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Narrative */}
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
          You are viewing the public merchant onboarding showcase for <strong>DupeScout</strong>. Our high-throughput CLIP visual embeddings, PostgreSQL <code>pgvector</code> similarity engines, and automated daily UPI settlement ledgers operate inside our private monorepo infrastructure. Connect directly with the founder for a guided catalog vectorization session and immediate 0% commission whitelist access.
        </p>

        {/* Action Options */}
        <div className="flex flex-col gap-4">
          
          {/* Option 1: Direct 1-on-1 Walkthrough */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/25 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-sm sm:text-base font-extrabold text-stone-900 dark:text-white">
                1. Schedule 1-on-1 Merchant Onboarding &amp; Catalog Walkthrough
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-normal pl-12">
              See how our multimodal AI vectorizes your lookbooks, matches real luxury screenshots from 500k+ Gen Z shoppers to your SKUs, and unlocks 0% commission for 90 days.
            </p>
            <div className="pl-12 pt-1">
              <a
                href={mailtoLink}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/25 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Book 1-on-1 Merchant Onboarding</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Option 2: Direct Contact / Copy Founder Email */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-stone-900 dark:bg-stone-700 text-white flex items-center justify-center text-xs font-black">
                  HA
                </div>
                <div>
                  <span className="text-sm font-extrabold text-stone-900 dark:text-white block">
                    {founderName}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-medium block">
                    {founderRole}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                Active &amp; Rapid Response
              </span>
            </div>
            
            <div className="flex items-center justify-between gap-2 bg-white dark:bg-stone-900 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-800">
              <span className="text-xs sm:text-sm font-mono font-medium text-stone-800 dark:text-stone-200 truncate select-all">
                {founderEmail}
              </span>
              <button
                onClick={handleCopyEmail}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all shrink-0 ${
                  copied 
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400' 
                    : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Option 3: Verified Founder & Monorepo Links */}
          <div className="flex flex-col gap-2 pt-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
              Verified Founder &amp; Monorepo Profiles
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>

              <a
                href={githubUser}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>

              <a
                href={xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
              >
                <span className="text-sm font-black">𝕏</span>
                <span>Twitter</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            </div>
          </div>

        </div>

        {/* Architectural Guarantee Callout */}
        <div className="mt-5 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-start gap-2.5 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>Architectural Guarantee:</strong> DupeScout enforces the <em>Universal Parent Monorepo &amp; Satellite Architecture Standard</em> under <code>Trend-Tribe</code>. Proprietary Python FastAPI vector search engines, PostgreSQL pgvector databases, and fine-tuned CLIP models remain strictly isolated from this public client showcase.
          </span>
        </div>

      </div>
    </div>
  );
}
