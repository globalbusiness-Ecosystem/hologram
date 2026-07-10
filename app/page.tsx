"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import SettingsPanel from "@/components/SettingsPanel";

const IdentityTab = dynamic(() => import("@/components/tabs/identity-tab"), { ssr: false });
const MarketplaceTab = dynamic(() => import("@/components/tabs/marketplace-tab"), { ssr: false });
const ExploreTab = dynamic(() => import("@/components/tabs/explore-tab"), { ssr: false });
const WalletTab = dynamic(() => import("@/components/tabs/wallet-tab"), { ssr: false });
const PlansTab = dynamic(() => import("@/components/tabs/plans-tab"), { ssr: false });

type Tab = "identity" | "marketplace" | "explore" | "wallet" | "plans";

const tabs: { id: Tab; labelAr: string; labelEn: string; icon: React.ReactNode }[] = [
  {
    id: "identity",
    labelAr: "هويتي",
    labelEn: "Identity",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21a8 8 0 1 0-16 0" />
        <circle cx="12" cy="12" r="10" strokeDasharray="2 3" />
      </svg>
    ),
  },
  {
    id: "marketplace",
    labelAr: "السوق",
    labelEn: "Market",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: "explore",
    labelAr: "استكشاف",
    labelEn: "Explore",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <circle cx="11" cy="11" r="3" />
      </svg>
    ),
  },
  {
    id: "wallet",
    labelAr: "المحفظة",
    labelEn: "Wallet",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
        <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
        <path d="M18 12a2 2 0 0 0-2 2 2 2 0 0 0 2 2h4v-4h-4z" />
      </svg>
    ),
  },
  {
    id: "plans",
    labelAr: "الخطط",
    labelEn: "Plans",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("identity");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.08 0.02 240)" }}
    >
      {/* Sidebar + Settings overlays */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* Top header — 3 zones: hamburger | logo+domain | settings */}
      <header
        className="flex items-center justify-between px-3 py-2.5 flex-shrink-0"
        style={{
          background: "oklch(0.09 0.03 240 / 0.97)",
          borderBottom: "1px solid oklch(0.75 0.18 195 / 0.15)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Left — hamburger menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="فتح القائمة"
          className="w-10 h-10 flex items-center justify-center rounded-xl transition-all active:scale-95 flex-shrink-0"
          style={{
            background: "oklch(0.13 0.04 240 / 0.8)",
            border: "1px solid oklch(0.75 0.18 195 / 0.18)",
            color: "oklch(0.70 0.10 200)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Center — logo + domain */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-2">
            {/* Hologram logo mark */}
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, oklch(0.20 0.10 200), oklch(0.18 0.12 260))",
                border: "1px solid oklch(0.75 0.18 195 / 0.55)",
                boxShadow: "0 0 12px oklch(0.75 0.18 195 / 0.35)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="oklch(0.88 0.20 195)" />
                <circle cx="12" cy="12" r="7" stroke="oklch(0.75 0.18 195)" strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="12" cy="12" r="11" stroke="oklch(0.65 0.22 290)" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
              </svg>
            </div>
            <span
              className="text-base font-bold tracking-wide"
              style={{
                color: "oklch(0.90 0.20 195)",
                textShadow: "0 0 14px oklch(0.75 0.18 195 / 0.55)",
              }}
            >
              Hologram
            </span>
          </div>
          <span
            className="text-xs font-mono tracking-wider"
            style={{ color: "oklch(0.50 0.10 290)", letterSpacing: "0.08em" }}
          >
            hologram.pi
          </span>
        </div>

        {/* Right — settings gear */}
        <button
          onClick={() => setSettingsOpen(true)}
          aria-label="فتح الإعدادات"
          className="w-10 h-10 flex items-center justify-center rounded-xl transition-all active:scale-95 flex-shrink-0"
          style={{
            background: "oklch(0.13 0.04 240 / 0.8)",
            border: "1px solid oklch(0.75 0.18 195 / 0.18)",
            color: "oklch(0.70 0.10 200)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" opacity="0" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        </button>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="grid-bg min-h-full">
          {activeTab === "identity" && <IdentityTab />}
          {activeTab === "marketplace" && <MarketplaceTab />}
          {activeTab === "explore" && <ExploreTab />}
          {activeTab === "wallet" && <WalletTab />}
          {activeTab === "plans" && <PlansTab />}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav
        className="flex-shrink-0 px-2 py-2"
        style={{
          background: "oklch(0.09 0.03 240 / 0.97)",
          borderTop: "1px solid oklch(0.75 0.18 195 / 0.2)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="bottom-nav-item relative"
                style={{ minWidth: 0 }}
              >
                {/* Active indicator */}
                {isActive && (
                  <span
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                    style={{ background: "oklch(0.75 0.18 195)", boxShadow: "0 0 8px oklch(0.75 0.18 195)" }}
                  />
                )}

                {/* Icon */}
                <span
                  style={{
                    color: isActive ? "oklch(0.85 0.20 195)" : "oklch(0.45 0.05 220)",
                    filter: isActive ? "drop-shadow(0 0 6px oklch(0.75 0.18 195 / 0.8))" : "none",
                    transition: "all 0.2s",
                  }}
                >
                  {tab.icon}
                </span>

                {/* Arabic label */}
                <span
                  className="text-xs font-semibold"
                  style={{
                    color: isActive ? "oklch(0.85 0.20 195)" : "oklch(0.45 0.05 220)",
                    transition: "color 0.2s",
                  }}
                >
                  {tab.labelAr}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
