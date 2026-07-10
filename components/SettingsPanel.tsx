"use client";

import { useState } from "react";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

const THEMES = [
  { id: "hologram", label: "هولوغرام", sub: "Hologram (Default)" },
  { id: "midnight", label: "منتصف الليل", sub: "Midnight" },
  { id: "aurora", label: "أورورا", sub: "Aurora" },
];

const LANGUAGES = [
  { id: "ar", label: "العربية", flag: "🇸🇦" },
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "fr", label: "Français", flag: "🇫🇷" },
];

const CURRENCIES = [
  { id: "pi", label: "Pi (π)" },
  { id: "usd", label: "USD ($)" },
  { id: "eur", label: "EUR (€)" },
];

function SectionHeader({ label }: { label: string }) {
  return (
    <p
      className="text-xs font-semibold uppercase tracking-widest px-1 mb-3 mt-5"
      style={{ color: "oklch(0.42 0.06 220)" }}
    >
      {label}
    </p>
  );
}

function SettingRow({
  icon,
  label,
  sub,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  right?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{ background: "oklch(0.12 0.04 240 / 0.6)", border: "1px solid oklch(0.75 0.18 195 / 0.10)" }}
    >
      <span
        className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0"
        style={{ background: "oklch(0.16 0.06 240)", color: "oklch(0.65 0.15 195)" }}
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: "oklch(0.85 0.08 210)" }}>
          {label}
        </p>
        {sub && (
          <p className="text-xs mt-0.5 truncate" style={{ color: "oklch(0.48 0.06 220)" }}>
            {sub}
          </p>
        )}
      </div>
      {right && <div className="flex-shrink-0">{right}</div>}
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className="w-11 h-6 rounded-full relative transition-all flex-shrink-0"
      style={{
        background: value ? "oklch(0.55 0.18 195)" : "oklch(0.22 0.04 230)",
        boxShadow: value ? "0 0 10px oklch(0.55 0.18 195 / 0.5)" : "none",
        transition: "background 0.2s, box-shadow 0.2s",
      }}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full shadow-md transition-all duration-200"
        style={{
          left: value ? "calc(100% - 1.375rem)" : "2px",
          background: value ? "oklch(0.95 0.05 200)" : "oklch(0.45 0.04 230)",
        }}
      />
    </button>
  );
}

function PillSelector<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string; flag?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={
              active
                ? {
                    background: "oklch(0.55 0.18 195 / 0.2)",
                    border: "1px solid oklch(0.65 0.18 195 / 0.6)",
                    color: "oklch(0.85 0.18 195)",
                    boxShadow: "0 0 8px oklch(0.55 0.18 195 / 0.3)",
                  }
                : {
                    background: "oklch(0.14 0.04 240)",
                    border: "1px solid oklch(0.25 0.05 230)",
                    color: "oklch(0.55 0.06 220)",
                  }
            }
          >
            {opt.flag ? `${opt.flag} ${opt.label}` : opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const [theme, setTheme] = useState<string>("hologram");
  const [language, setLanguage] = useState<string>("ar");
  const [currency, setCurrency] = useState<string>("pi");
  const [notifTransactions, setNotifTransactions] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifOffers, setNotifOffers] = useState(false);
  const [notifSystem, setNotifSystem] = useState(true);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: "oklch(0.04 0.02 240 / 0.75)", backdropFilter: "blur(4px)" }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Slide-up sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="الإعدادات"
        className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl flex flex-col transition-transform duration-350 ease-out"
        style={{
          maxHeight: "90dvh",
          background: "oklch(0.09 0.03 240)",
          border: "1px solid oklch(0.75 0.18 195 / 0.18)",
          borderBottom: "none",
          boxShadow: "0 -20px 60px oklch(0.04 0.02 240 / 0.9)",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.32s cubic-bezier(0.22, 0.61, 0.36, 1)",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full" style={{ background: "oklch(0.30 0.05 220)" }} />
        </div>

        {/* Title bar */}
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid oklch(0.75 0.18 195 / 0.12)" }}
        >
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg"
            style={{ color: "oklch(0.55 0.08 200)" }}
            aria-label="إغلاق الإعدادات"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <h2 className="text-base font-bold" style={{ color: "oklch(0.90 0.18 195)" }}>
            الإعدادات
          </h2>
          <div className="w-8" aria-hidden="true" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 pb-8">

          {/* Theme */}
          <SectionHeader label="المظهر · Theme" />
          <div className="space-y-2">
            {THEMES.map((t) => {
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right transition-all"
                  style={{
                    background: active ? "oklch(0.55 0.18 195 / 0.12)" : "oklch(0.12 0.04 240 / 0.6)",
                    border: active
                      ? "1px solid oklch(0.65 0.18 195 / 0.5)"
                      : "1px solid oklch(0.75 0.18 195 / 0.08)",
                  }}
                >
                  <span
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: t.id === "hologram"
                        ? "linear-gradient(135deg, oklch(0.35 0.18 195), oklch(0.30 0.22 290))"
                        : t.id === "midnight"
                        ? "linear-gradient(135deg, oklch(0.15 0.05 240), oklch(0.22 0.08 260))"
                        : "linear-gradient(135deg, oklch(0.40 0.18 160), oklch(0.35 0.20 230))",
                      border: active ? "2px solid oklch(0.75 0.18 195 / 0.8)" : "2px solid transparent",
                    }}
                  >
                    {active && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: active ? "oklch(0.88 0.18 195)" : "oklch(0.72 0.06 220)" }}>
                      {t.label}
                    </p>
                    <p className="text-xs" style={{ color: "oklch(0.45 0.05 220)" }}>
                      {t.sub}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Language */}
          <SectionHeader label="اللغة · Language" />
          <SettingRow
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            }
            label="اختر اللغة"
            sub="Choose interface language"
            right={
              <PillSelector
                options={LANGUAGES}
                value={language}
                onChange={setLanguage}
              />
            }
          />

          {/* Currency */}
          <SectionHeader label="العملة · Currency" />
          <SettingRow
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v12M9 9h4.5a2.5 2.5 0 0 1 0 5H9m0 0h6" />
              </svg>
            }
            label="وحدة العرض"
            sub="Display currency"
            right={
              <PillSelector
                options={CURRENCIES}
                value={currency}
                onChange={setCurrency}
              />
            }
          />

          {/* Notifications */}
          <SectionHeader label="الإشعارات · Notifications" />
          <div className="space-y-2">
            {[
              {
                key: "transactions",
                label: "المعاملات",
                sub: "Incoming & outgoing Pi payments",
                value: notifTransactions,
                onChange: setNotifTransactions,
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                    <path d="M18 12a2 2 0 0 0-2 2 2 2 0 0 0 2 2h4v-4h-4z" />
                  </svg>
                ),
              },
              {
                key: "messages",
                label: "الرسائل",
                sub: "Direct messages from users",
                value: notifMessages,
                onChange: setNotifMessages,
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
              },
              {
                key: "offers",
                label: "العروض",
                sub: "Promotions and marketplace offers",
                value: notifOffers,
                onChange: setNotifOffers,
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ),
              },
              {
                key: "system",
                label: "النظام",
                sub: "App updates and system alerts",
                value: notifSystem,
                onChange: setNotifSystem,
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
                  </svg>
                ),
              },
            ].map((item) => (
              <SettingRow
                key={item.key}
                icon={item.icon}
                label={item.label}
                sub={item.sub}
                right={<Toggle value={item.value} onChange={item.onChange} />}
              />
            ))}
          </div>

          {/* About */}
          <SectionHeader label="حول التطبيق · About" />
          <div className="space-y-2">
            <SettingRow
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              }
              label="الإصدار"
              sub="Version 1.0.0 · Build 2025"
            />
            <SettingRow
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              }
              label="سياسة الخصوصية"
              sub="Privacy Policy"
              right={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.45 0.06 220)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              }
            />
            <SettingRow
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              }
              label="شروط الاستخدام"
              sub="Terms of Service"
              right={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.45 0.06 220)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              }
            />
            <SettingRow
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              }
              label="GitHub / مفتوح المصدر"
              sub="Open source on GitHub"
              right={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.45 0.06 220)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              }
            />
          </div>

          {/* Pi Network badge */}
          <div
            className="mt-6 py-3 px-4 rounded-2xl text-center"
            style={{
              background: "oklch(0.14 0.06 260 / 0.5)",
              border: "1px solid oklch(0.65 0.22 290 / 0.2)",
            }}
          >
            <p className="text-xs font-mono" style={{ color: "oklch(0.55 0.12 290)" }}>
              Built exclusively on
            </p>
            <p className="text-sm font-bold mt-0.5" style={{ color: "oklch(0.75 0.18 290)" }}>
              Pi Network Blockchain
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
