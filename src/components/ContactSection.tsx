import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, MessageSquare, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [subjectTopic, setSubjectTopic] = useState('Feedback regarding Masalma tools');
  const [userMessage, setUserMessage] = useState('');

  const emailAddress = 'developer@masalma.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subjectTopic
    )}&body=${encodeURIComponent(userMessage || 'Hello JM,')}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Contact & Details */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2">
              Get In Touch
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
              Questions, Feedback or Collaborations
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              Have questions regarding prayer calculations, tool suggestions, or bug reports? Reach out directly.
            </p>

            {/* Email Address Card */}
            <div className="mt-8 p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Official Direct Email
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white select-all">
                {emailAddress}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${emailAddress}`}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Client</span>
                </a>
              </div>
            </div>

            {/* GitHub Card */}
            <a
              href="https://github.com/jmasalma/masalma"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-between p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 hover:bg-slate-200/70 dark:hover:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    GitHub Repository
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    github.com/jmasalma/masalma
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                Star & Fork →
              </span>
            </a>
          </div>

          {/* Right Column: Interactive Inquiry Composer */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Quick Email Composer
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Prepare an inquiry prefilled with your chosen topic, opening your default email application.
              </p>

              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label htmlFor="topic-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    id="topic-select"
                    value={subjectTopic}
                    onChange={(e) => setSubjectTopic(e.target.value)}
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                  >
                    <option value="Feedback regarding Masalma tools">General Feedback / Tool Request</option>
                    <option value="Question about Islamic Prayer Times calculations">Prayer Times & Islamic Suite</option>
                    <option value="Inquiry regarding Flooring Layout generator">Flooring Engine Calculator</option>
                    <option value="Bug report on Masalma.com">Bug Report / Correction</option>
                    <option value="Engineering & Development Collaboration">Collaboration / Engineering</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message-textarea" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Message (Optional)
                  </label>
                  <textarea
                    id="message-textarea"
                    rows={4}
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Describe your inquiry, suggestion, or calculation question..."
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to {emailAddress}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
