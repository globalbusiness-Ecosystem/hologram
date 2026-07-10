"use client";

import { useState } from "react";
import { Search, Shield, Star, ChevronRight, TrendingUp } from "lucide-react";

const users = [
  {
    id: 1,
    name: "Sara Al-Rashid",
    handle: "@sara.pi",
    wallet: "GBXP...4KMN",
    piEarned: "3,240 π",
    rating: 5.0,
    kyc: true,
    rank: 1,
    colorBg: "oklch(0.25 0.12 200)",
    colorText: "oklch(0.85 0.20 195)",
    initials: "SR",
  },
  {
    id: 2,
    name: "Mohammed Khalid",
    handle: "@mkhalid",
    wallet: "GCYX...9RTZ",
    piEarned: "2,870 π",
    rating: 4.9,
    kyc: true,
    rank: 2,
    colorBg: "oklch(0.25 0.12 280)",
    colorText: "oklch(0.75 0.22 290)",
    initials: "MK",
  },
  {
    id: 3,
    name: "Layla Osman",
    handle: "@layla.o",
    wallet: "GDTW...2PLF",
    piEarned: "2,115 π",
    rating: 4.8,
    kyc: true,
    rank: 3,
    colorBg: "oklch(0.25 0.12 60)",
    colorText: "oklch(0.85 0.18 70)",
    initials: "LO",
  },
  {
    id: 4,
    name: "Youssef Ben Ali",
    handle: "@y.benali",
    wallet: "GAKQ...5NVB",
    piEarned: "1,680 π",
    rating: 4.7,
    kyc: false,
    rank: 4,
    colorBg: "oklch(0.22 0.10 160)",
    colorText: "oklch(0.75 0.18 150)",
    initials: "YB",
  },
  {
    id: 5,
    name: "Fatima Al-Zahra",
    handle: "@fzahra",
    wallet: "GHWM...3QDX",
    piEarned: "1,420 π",
    rating: 4.6,
    kyc: true,
    rank: 5,
    colorBg: "oklch(0.22 0.10 320)",
    colorText: "oklch(0.75 0.20 320)",
    initials: "FZ",
  },
  {
    id: 6,
    name: "Omar Farouq",
    handle: "@ofarouq",
    wallet: "GNXC...8WKP",
    piEarned: "980 π",
    rating: 4.5,
    kyc: false,
    rank: 6,
    colorBg: "oklch(0.22 0.10 220)",
    colorText: "oklch(0.70 0.15 220)",
    initials: "OF",
  },
];

const rankColors: Record<number, string> = {
  1: "oklch(0.85 0.18 70)",
  2: "oklch(0.70 0.05 220)",
  3: "oklch(0.65 0.10 50)",
};

export default function ExploreTab() {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.handle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-full pb-4">
      {/* Header */}
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold neon-text">استكشاف</h1>
          <div className="flex items-center gap-1.5">
            <TrendingUp size={14} style={{ color: "oklch(0.75 0.18 195)" }} />
            <span className="text-xs text-muted-foreground">أفضل المستخدمين</span>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
          style={{ background: "oklch(0.13 0.04 230 / 0.8)", border: "1px solid oklch(0.75 0.18 195 / 0.25)" }}
        >
          <Search size={16} style={{ color: "oklch(0.55 0.06 220)" }} />
          <input
            type="text"
            placeholder="ابحث عن مستخدمين..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none text-right"
            dir="rtl"
          />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-4 mb-3">
        <div
          className="grid grid-cols-3 gap-2 p-3 rounded-xl"
          style={{ background: "oklch(0.12 0.04 230 / 0.6)", border: "1px solid oklch(0.22 0.05 220)" }}
        >
          {[
            { label: "المستخدمون", value: "42.1K" },
            { label: "معتمد KYC", value: "28.7K" },
            { label: "نشط اليوم", value: "3.2K" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="neon-text font-bold text-sm">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Users List */}
      <div className="px-4 space-y-2">
        <p className="text-xs text-muted-foreground mb-1">
          {filtered.length} مستخدم
        </p>

        {filtered.map((user, idx) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-3 rounded-2xl transition-all active:scale-98 cursor-pointer"
            style={{
              background: "oklch(0.12 0.04 230 / 0.8)",
              border: "1px solid oklch(0.75 0.18 195 / 0.15)",
              animationDelay: `${idx * 50}ms`,
            }}
          >
            {/* Rank */}
            <div
              className="w-5 text-center font-bold text-xs flex-shrink-0"
              style={{ color: rankColors[user.rank] || "oklch(0.50 0.05 220)" }}
            >
              {user.rank}
            </div>

            {/* Avatar */}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
              style={{
                background: user.colorBg,
                color: user.colorText,
                border: `2px solid ${user.colorText}40`,
                boxShadow: `0 0 12px ${user.colorText}30`,
              }}
            >
              {user.initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <p className="font-semibold text-sm text-foreground truncate">{user.name}</p>
                {user.kyc && (
                  <Shield
                    size={12}
                    style={{ color: "oklch(0.75 0.18 150)", flexShrink: 0 }}
                    fill="oklch(0.75 0.18 150)"
                  />
                )}
              </div>
              <p className="text-xs text-muted-foreground font-mono truncate">{user.wallet}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="neon-text text-xs font-semibold">{user.piEarned}</span>
                <div className="flex items-center gap-0.5">
                  <Star size={9} fill="oklch(0.85 0.18 70)" style={{ color: "oklch(0.85 0.18 70)" }} />
                  <span className="text-xs" style={{ color: "oklch(0.85 0.18 70)" }}>
                    {user.rating}
                  </span>
                </div>
              </div>
            </div>

            <ChevronRight size={14} style={{ color: "oklch(0.40 0.05 220)", flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
