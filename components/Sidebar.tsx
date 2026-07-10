"use client";

import { usePiAuth } from "@/contexts/pi-auth-context";

const NAV_LINKS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
    ),
    label: "هويتي",
    sub: "My Identity",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    label: "السوق",
    sub: "Marketplace",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    label: "استكشاف",
    sub: "Explore",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
        <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
        <path d="M18 12a2 2 0 0 0-2 2 2 2 0 0 0 2 2h4v-4h-4z" />
      </svg>
    ),
    label: "المحفظة",
    sub: "Wallet",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    label: "الخطط",
    sub: "Plans",
  },
];

const EXTRA_LINKS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    label: "سجل النشاط",
    sub: "Activity Log",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: "الإحالات",
    sub: "Referrals",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    ),
    label: "المساعدة",
    sub: "Help",
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { user } = usePiAuth();

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

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="القائمة الرئيسية"
        className="fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          width: "72vw",
          maxWidth: "300px",
          background: "oklch(0.09 0.03 240)",
          borderLeft: "1px solid oklch(0.75 0.18 195 / 0.2)",
          boxShadow: "-20px 0 60px oklch(0.04 0.02 240 / 0.8)",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid oklch(0.75 0.18 195 / 0.12)" }}
        >
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, oklch(0.20 0.10 200), oklch(0.18 0.12 260))",
                border: "1px solid oklch(0.75 0.18 195 / 0.5)",
                boxShadow: "0 0 14px oklch(0.75 0.18 195 / 0.35)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="oklch(0.85 0.20 195)" />
                <circle cx="12" cy="12" r="7" stroke="oklch(0.75 0.18 195)" strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="12" cy="12" r="11" stroke="oklch(0.65 0.22 290)" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold leading-none" style={{ color: "oklch(0.90 0.20 195)" }}>
                Hologram
              </p>
              <p className="text-xs mt-0.5" style={{ color: "oklch(0.50 0.08 200)" }}>
                hologram.pi
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            style={{ color: "oklch(0.55 0.08 200)" }}
            aria-label="إغلاق القائمة"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* User mini-profile */}
        <div
          className="mx-4 my-4 px-4 py-3 rounded-2xl flex items-center gap-3 flex-shrink-0"
          style={{
            background: "oklch(0.12 0.05 240 / 0.8)",
            border: "1px solid oklch(0.75 0.18 195 / 0.18)",
          }}
        >
          {/* Avatar */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, oklch(0.35 0.15 200), oklch(0.30 0.18 260))",
              border: "2px solid oklch(0.75 0.18 195 / 0.5)",
              color: "oklch(0.95 0.05 200)",
            }}
          >
            {user?.username?.slice(0, 1).toUpperCase() ?? "U"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: "oklch(0.88 0.10 200)" }}>
              {user?.username ?? "مستخدم"}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="text-xs px-1.5 py-0.5 rounded-md font-medium"
                style={{ background: "oklch(0.20 0.10 150 / 0.5)", color: "oklch(0.75 0.18 150)", border: "1px solid oklch(0.55 0.18 150 / 0.4)" }}
              >
                KYC
              </span>
              <span
                className="text-xs px-1.5 py-0.5 rounded-md font-medium"
                style={{ background: "oklch(0.22 0.12 70 / 0.4)", color: "oklch(0.80 0.18 70)", border: "1px solid oklch(0.65 0.18 70 / 0.4)" }}
              >
                Pro
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable nav */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {/* Main nav */}
          <p className="text-xs font-semibold uppercase tracking-widest px-2 mb-2" style={{ color: "oklch(0.40 0.06 220)" }}>
            التنقل
          </p>
          <ul className="space-y-0.5 mb-5">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <button
                  onClick={onClose}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-right transition-colors"
                  style={{ color: "oklch(0.65 0.08 200)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.75 0.18 195 / 0.08)";
                    (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.85 0.18 195)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.65 0.08 200)";
                  }}
                >
                  <span style={{ flexShrink: 0 }}>{item.icon}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span className="block text-xs" style={{ color: "oklch(0.42 0.05 220)" }}>{item.sub}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="h-px mx-2 mb-4" style={{ background: "oklch(0.75 0.18 195 / 0.10)" }} />

          <p className="text-xs font-semibold uppercase tracking-widest px-2 mb-2" style={{ color: "oklch(0.40 0.06 220)" }}>
            أخرى
          </p>
          <ul className="space-y-0.5">
            {EXTRA_LINKS.map((item) => (
              <li key={item.label}>
                <button
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-right transition-colors"
                  style={{ color: "oklch(0.65 0.08 200)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.75 0.18 195 / 0.08)";
                    (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.85 0.18 195)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.65 0.08 200)";
                  }}
                >
                  <span style={{ flexShrink: 0 }}>{item.icon}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span className="block text-xs" style={{ color: "oklch(0.42 0.05 220)" }}>{item.sub}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer version */}
        <div
          className="px-5 py-3 flex-shrink-0 text-center"
          style={{ borderTop: "1px solid oklch(0.75 0.18 195 / 0.10)" }}
        >
          <p className="text-xs" style={{ color: "oklch(0.35 0.04 220)" }}>
            Hologram v1.0 · Pi Network
          </p>
        </div>
      </aside>
    </>
  );
}
