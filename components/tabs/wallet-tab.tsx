"use client";

import { useState } from "react";
import { Send, Download, BarChart2, ArrowDownLeft, ArrowUpRight, Copy, Check, RefreshCw } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "in",
    name: "Sara Al-Rashid",
    desc: "دفع مقابل خدمة",
    date: "اليوم، 14:32",
    amount: "+18.5 π",
    color: "oklch(0.75 0.18 150)",
    bg: "oklch(0.20 0.10 150 / 0.2)",
  },
  {
    id: 2,
    type: "out",
    name: "TechStore.pi",
    desc: "شراء سماعات",
    date: "أمس، 10:15",
    amount: "-28.0 π",
    color: "oklch(0.65 0.20 25)",
    bg: "oklch(0.20 0.10 25 / 0.2)",
  },
  {
    id: 3,
    type: "in",
    name: "Mohammed Khalid",
    desc: "تسوية معاملة",
    date: "23 فبراير",
    amount: "+7.2 π",
    color: "oklch(0.75 0.18 150)",
    bg: "oklch(0.20 0.10 150 / 0.2)",
  },
  {
    id: 4,
    type: "out",
    name: "EduPi.pi",
    desc: "دورة Python",
    date: "20 فبراير",
    amount: "-15.0 π",
    color: "oklch(0.65 0.20 25)",
    bg: "oklch(0.20 0.10 25 / 0.2)",
  },
  {
    id: 5,
    type: "in",
    name: "Mining Reward",
    desc: "مكافأة التعدين اليومي",
    date: "18 فبراير",
    amount: "+0.8 π",
    color: "oklch(0.75 0.18 150)",
    bg: "oklch(0.20 0.10 150 / 0.2)",
  },
  {
    id: 6,
    type: "out",
    name: "Layla Osman",
    desc: "دفع للخدمة",
    date: "15 فبراير",
    amount: "-9.5 π",
    color: "oklch(0.65 0.20 25)",
    bg: "oklch(0.20 0.10 25 / 0.2)",
  },
];

export default function WalletTab() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-full pb-4">
      {/* Header */}
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold neon-text">المحفظة</h1>
          <button
            className="p-2 rounded-xl"
            style={{ background: "oklch(0.14 0.04 240 / 0.8)", border: "1px solid oklch(0.75 0.18 195 / 0.2)" }}
          >
            <RefreshCw size={14} style={{ color: "oklch(0.75 0.18 195)" }} />
          </button>
        </div>
      </div>

      {/* Wallet Card */}
      <div className="px-4 mb-4">
        <div
          className="relative rounded-2xl p-5 overflow-hidden animate-float"
          style={{
            background: "linear-gradient(135deg, oklch(0.12 0.06 230) 0%, oklch(0.15 0.10 260) 50%, oklch(0.12 0.08 290) 100%)",
            border: "1px solid oklch(0.75 0.18 195 / 0.35)",
            boxShadow: "0 0 40px oklch(0.75 0.18 195 / 0.12), 0 20px 40px oklch(0.05 0.02 240)",
          }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 rounded-tl" style={{ borderColor: "oklch(0.75 0.18 195 / 0.7)" }} />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 rounded-tr" style={{ borderColor: "oklch(0.75 0.18 195 / 0.7)" }} />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 rounded-bl" style={{ borderColor: "oklch(0.75 0.18 195 / 0.7)" }} />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 rounded-br" style={{ borderColor: "oklch(0.75 0.18 195 / 0.7)" }} />

          <div className="relative z-10">
            {/* Wallet label */}
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "oklch(0.75 0.18 195 / 0.15)", color: "oklch(0.75 0.18 195)", border: "1px solid oklch(0.75 0.18 195 / 0.3)" }}
              >
                Pi Wallet
              </span>
              <span className="text-xs text-muted-foreground font-mono">Mainnet</span>
            </div>

            {/* Balance */}
            <div className="mb-1">
              <p className="text-xs text-muted-foreground mb-1">الرصيد الكلي</p>
              <div className="flex items-end gap-2">
                <span
                  className="text-4xl font-bold"
                  style={{
                    color: "oklch(0.90 0.20 195)",
                    textShadow: "0 0 20px oklch(0.75 0.18 195 / 0.6)",
                  }}
                >
                  142.5
                </span>
                <span className="text-2xl font-bold mb-0.5" style={{ color: "oklch(0.75 0.18 195)" }}>
                  π
                </span>
              </div>
              <p className="text-sm mt-1" style={{ color: "oklch(0.65 0.08 195)" }}>
                ≈ $28.50 USD
              </p>
            </div>

            {/* Wallet address */}
            <div
              className="flex items-center justify-between mt-3 px-3 py-2 rounded-xl"
              style={{ background: "oklch(0.08 0.03 230 / 0.7)", border: "1px solid oklch(0.22 0.05 220)" }}
            >
              <span className="text-xs font-mono text-muted-foreground">GAXK...7YPQ</span>
              <button onClick={handleCopy} className="transition-colors">
                {copied ? (
                  <Check size={13} style={{ color: "oklch(0.75 0.18 150)" }} />
                ) : (
                  <Copy size={13} style={{ color: "oklch(0.55 0.08 220)" }} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 mb-5">
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              icon: <Send size={18} />,
              label: "إرسال",
              colorBg: "oklch(0.75 0.18 195 / 0.12)",
              colorBorder: "oklch(0.75 0.18 195 / 0.4)",
              colorText: "oklch(0.85 0.20 195)",
            },
            {
              icon: <Download size={18} />,
              label: "استلام",
              colorBg: "oklch(0.65 0.22 290 / 0.12)",
              colorBorder: "oklch(0.65 0.22 290 / 0.4)",
              colorText: "oklch(0.75 0.22 290)",
            },
            {
              icon: <BarChart2 size={18} />,
              label: "تحليل",
              colorBg: "oklch(0.80 0.18 70 / 0.12)",
              colorBorder: "oklch(0.80 0.18 70 / 0.4)",
              colorText: "oklch(0.85 0.18 70)",
            },
          ].map((btn) => (
            <button
              key={btn.label}
              className="flex flex-col items-center gap-2 py-3 rounded-xl transition-all active:scale-95"
              style={{
                background: btn.colorBg,
                border: `1px solid ${btn.colorBorder}`,
                color: btn.colorText,
              }}
            >
              {btn.icon}
              <span className="text-xs font-semibold">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-foreground">سجل المعاملات</h3>
          <button className="text-xs" style={{ color: "oklch(0.75 0.18 195)" }}>
            عرض الكل
          </button>
        </div>

        <div className="space-y-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center gap-3 p-3 rounded-2xl"
              style={{
                background: "oklch(0.12 0.04 230 / 0.8)",
                border: "1px solid oklch(0.22 0.05 220 / 0.6)",
              }}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: tx.bg, border: `1px solid ${tx.color}40` }}
              >
                {tx.type === "in" ? (
                  <ArrowDownLeft size={16} style={{ color: tx.color }} />
                ) : (
                  <ArrowUpRight size={16} style={{ color: tx.color }} />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground truncate text-right" dir="rtl">
                  {tx.name}
                </p>
                <p className="text-xs text-muted-foreground truncate text-right" dir="rtl">
                  {tx.desc} · {tx.date}
                </p>
              </div>

              {/* Amount */}
              <span className="font-bold text-sm flex-shrink-0" style={{ color: tx.color }}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
