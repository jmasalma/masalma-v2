import React, { useState } from 'react';
import {
  Smartphone,
  Users,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowLeft,
  Mail,
  ShieldCheck,
  Bell,
  Clock,
  Compass
} from 'lucide-react';

interface AndroidAppsPageProps {
  onBackToHome: () => void;
}

export const AndroidAppsPage: React.FC<AndroidAppsPageProps> = ({ onBackToHome }) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const groupUrl = 'https://groups.google.com/g/masalma-app-testers';
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.masalma.athanalarm';
  const webTestingUrl = 'https://play.google.com/apps/testing/com.masalma.athanalarm';
  const directApkUrl = './Islam Adhan Alarm.apk';

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb / Back button */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
            <Smartphone className="w-4 h-4" />
            <span>Mobile Software & Beta Programs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            Android Applications
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed max-w-2xl">
            Download our native Android applications or participate in closed testing tracks to test upcoming releases before public distribution.
          </p>
        </div>

        {/* Featured App Showcase Card */}
        <div className="rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-xs mb-10">
          {/* App Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/70 dark:border-slate-800/70">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bell className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Athan Alarm
                  </h2>
                  <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded-md">
                    Closed Test Mode
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                  Package: com.masalma.athanalarm
                </div>
              </div>
            </div>

            <a
              href={directApkUrl}
              download
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Direct APK Download</span>
            </a>
          </div>

          {/* App Description */}
          <div className="py-6">
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              A lightweight, battery-efficient Islamic prayer alarm application for Android. Features accurate prayer time calculations, customizable Adhan calls, and reliable alarms without invasive tracking, ads, or battery-draining telemetry.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-2" />
                <div className="text-xs font-bold text-slate-900 dark:text-white">Precision Calculation</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Astronomical calculation methods tailored to your region.</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60">
                <Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-2" />
                <div className="text-xs font-bold text-slate-900 dark:text-white">Reliable Audio Alarms</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Custom Adhan audio notifications that fire reliably on Android.</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-2" />
                <div className="text-xs font-bold text-slate-900 dark:text-white">Zero Tracking or Ads</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">100% private, free, and built strictly to serve users.</div>
              </div>
            </div>
          </div>

          {/* Closed Testing Instructions Section */}
          <div className="mt-4 pt-6 border-t border-slate-200/70 dark:border-slate-800/70">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                How to Become a Tester (Closed Test Mode)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6">
              Google Play requires testers to be members of our authorized testing group before the store will grant access to download the build. Follow the two steps below:
            </p>

            {/* Step 1 & 2 Cards */}
            <div className="space-y-4">
              {/* STEP 1 */}
              <div className="p-5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Join the Google Testers Group
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      Visit the official Google Group using the same Google account you use on your Android phone, then click <strong>"Join group"</strong>.
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <a
                        href={groupUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-xs transition-colors"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Join Masalma App Testers Group</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                      </a>

                      <button
                        onClick={() => handleCopy(groupUrl, 'group')}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        {copiedLink === 'group' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Group Link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-800 dark:bg-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Download & Opt-in via Google Play
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      After joining the group, use either of the following links to accept the testing invite and download the app directly to your device:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {/* Link 1: Play Store */}
                      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                            <span>Google Play Store</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Direct store listing on Android devices.
                          </p>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <a
                            href={playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors text-center"
                          >
                            <span>Open on Play Store</span>
                          </a>
                          <button
                            onClick={() => handleCopy(playStoreUrl, 'store')}
                            aria-label="Copy Play Store Link"
                            className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            {copiedLink === 'store' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Link 2: Web Testing Opt-In */}
                      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                            <span>Web Testing Opt-In</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Browser portal to opt in as a tester.
                          </p>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <a
                            href={webTestingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors text-center"
                          >
                            <span>Opt-In on the Web</span>
                          </a>
                          <button
                            onClick={() => handleCopy(webTestingUrl, 'optin')}
                            aria-label="Copy Web Testing Link"
                            className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            {copiedLink === 'optin' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Tester Feedback & Bug Reports
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Found a bug or have ideas for alarm customization? Email us directly or post in the Google Group.
            </p>
          </div>
          <a
            href="mailto:developer@masalma.com?subject=Athan%20Alarm%20Closed%20Test%20Feedback"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Feedback</span>
          </a>
        </div>
      </div>
    </div>
  );
};
