"use client";

import { useState } from "react";
import { Shield, Star, Send, Share2, Plus, X, QrCode, ShoppingBag, Award, Wallet } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { PRODUCT_CONFIG } from "@/lib/product-config";

const QRModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
    <div className="relative glass-card rounded-2xl p-6 w-full max-w-xs animate-slide-up">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X size={20} />
      </button>
      <h3 className="text-center font-bold text-lg mb-1 neon-text">بطاقتي</h3>
      <p className="text-center text-muted-foreground text-xs mb-4">امسح الرمز لإرسال Pi</p>

      {/* QR Code simulation */}
      <div className="flex justify-center mb-4">
        <div
          className="w-40 h-40 rounded-xl p-2 animate-pulse-glow"
          style={{ background: "oklch(0.15 0.04 230 / 0.8)", border: "1px solid oklch(0.75 0.18 195 / 0.5)" }}
        >
          <div className="w-full h-full rounded-lg grid grid-cols-7 gap-0.5 p-1">
            {Array.from({ length: 49 }).map((_, i) => {
              const corners = [0, 1, 2, 7, 8, 9, 14, 15, 16, 6, 13, 20, 28, 35, 42, 36, 37, 38, 43, 44, 45, 42, 43, 44];
              const dark = Math.random() > 0.45 || corners.includes(i);
              return (
                <div
                  key={i}
                  className="rounded-sm"
                  style={{
                    background: dark ? "oklch(0.75 0.18 195)" : "transparent",
                    opacity: dark ? 1 : 0.1,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground font-mono">@pi_user_hologram</p>
      <p className="text-center text-xs neon-text font-mono mt-1">GAXK...7YPQ</p>
    </div>
  </div>
);

export default function IdentityTab() {
  const [showQR, setShowQR] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const { products } = usePiAuth();
  const product = products?.find((p) => p.id === PRODUCT_CONFIG.PRODUCT_69a743cb654e21c0494c659b);
  const amount = product?.price_in_pi;

  const handlePayment = () => {
    if (!product || amount === undefined) return;

    setPaymentStatus("loading");
    setPaymentError(null);

    window.pay({
      amount,
      memo: product.name,
      metadata: { productId: product.id },
      onComplete: () => {
        setPaymentStatus("success");
        setTimeout(() => setPaymentStatus("idle"), 3000);
      },
      onError: (error: Error) => {
        setPaymentStatus("error");
        setPaymentError(error?.message ?? "Payment failed. Please try again.");
        setTimeout(() => {
          setPaymentStatus("idle");
          setPaymentError(null);
        }, 4000);
      },
    });
  };

  return (
    <div className="min-h-full pb-4">
      {showQR && <QRModal onClose={() => setShowQR(false)} />}

      {/* Header */}
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold neon-text">هويتي</h1>
          <span className="text-xs text-muted-foreground font-mono">Pi Network</span>
        </div>
      </div>

      {/* Holographic Identity Card */}
      <div className="px-4 mb-4">
        <div
          className="relative rounded-2xl p-5 overflow-hidden animate-hologram"
          style={{
            background: "linear-gradient(135deg, oklch(0.10 0.04 230 / 0.95) 0%, oklch(0.14 0.06 250 / 0.95) 50%, oklch(0.10 0.05 280 / 0.95) 100%)",
            border: "1px solid oklch(0.75 0.18 195 / 0.4)",
            boxShadow: "0 0 30px oklch(0.75 0.18 195 / 0.15), inset 0 0 40px oklch(0.75 0.18 195 / 0.05)",
          }}
        >
          {/* Grid bg overlay */}
          <div className="absolute inset-0 grid-bg opacity-40" />

          {/* Scan Line */}
          <div
            className="absolute left-0 right-0 h-px animate-scan-line"
            style={{
              background: "linear-gradient(90deg, transparent, oklch(0.75 0.18 195 / 0.8), transparent)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 rounded-tl" style={{ borderColor: "oklch(0.75 0.18 195)" }} />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 rounded-tr" style={{ borderColor: "oklch(0.75 0.18 195)" }} />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 rounded-bl" style={{ borderColor: "oklch(0.75 0.18 195)" }} />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 rounded-br" style={{ borderColor: "oklch(0.75 0.18 195)" }} />

          {/* Card Content */}
          <div className="relative flex items-start gap-4 z-10">
            {/* Avatar with spinning rings */}
            <div className="relative flex-shrink-0" style={{ width: 80, height: 80 }}>
              {/* Outer ring */}
              <div
                className="hologram-ring-outer animate-spin-ring"
                style={{ inset: -8, width: "calc(100% + 16px)", height: "calc(100% + 16px)" }}
              />
              {/* Inner ring */}
              <div
                className="hologram-ring-inner animate-spin-ring-reverse"
                style={{ inset: -2, width: "calc(100% + 4px)", height: "calc(100% + 4px)" }}
              />
              {/* Avatar */}
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-2xl font-bold"
                style={{
                  background: "linear-gradient(135deg, oklch(0.25 0.10 200), oklch(0.20 0.12 260))",
                  border: "2px solid oklch(0.75 0.18 195 / 0.6)",
                  boxShadow: "0 0 20px oklch(0.75 0.18 195 / 0.4)",
                  color: "oklch(0.85 0.20 195)",
                }}
              >
                AH
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h2 className="font-bold text-base text-foreground truncate">Ahmed Hassan</h2>
              </div>
              <p className="text-xs text-muted-foreground font-mono mb-2">@ahmed.pi · GAXK...7YPQ</p>

              {/* Badges */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: "oklch(0.20 0.10 150 / 0.8)", color: "oklch(0.75 0.18 150)", border: "1px solid oklch(0.55 0.18 150 / 0.5)" }}
                >
                  <Shield size={10} />
                  KYC
                </span>
                <span
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: "oklch(0.22 0.12 70 / 0.8)", color: "oklch(0.85 0.18 70)", border: "1px solid oklch(0.65 0.18 70 / 0.5)" }}
                >
                  <Award size={10} />
                  Pro
                </span>
                <span
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: "oklch(0.18 0.08 195 / 0.8)", color: "oklch(0.75 0.18 195)", border: "1px solid oklch(0.55 0.18 195 / 0.5)" }}
                >
                  Pioneer
                </span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="relative z-10 mt-4 grid grid-cols-3 gap-2">
            {[
              { label: "المعاملات", value: "247" },
              { label: "التقييم", value: "4.9 ★" },
              { label: "Pi المكتسب", value: "1,842" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center rounded-xl py-2 px-1"
                style={{ background: "oklch(0.08 0.03 220 / 0.8)", border: "1px solid oklch(0.75 0.18 195 / 0.15)" }}
              >
                <p className="neon-text font-bold text-sm">{stat.value}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 mt-3 grid grid-cols-2 gap-2">
            <button
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95"
              style={{
                background: "oklch(0.75 0.18 195 / 0.15)",
                border: "1px solid oklch(0.75 0.18 195 / 0.5)",
                color: "oklch(0.85 0.20 195)",
              }}
            >
              <Send size={14} />
              إرسال Pi
            </button>
            <button
              onClick={() => setShowQR(true)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95"
              style={{
                background: "oklch(0.65 0.22 290 / 0.15)",
                border: "1px solid oklch(0.65 0.22 290 / 0.5)",
                color: "oklch(0.75 0.22 290)",
              }}
            >
              <QrCode size={14} />
              مشاركة بطاقتي
            </button>
          </div>

          {/* Hologram.pi Payment Button */}
          <div className="relative z-10 mt-2">
            <button
              onClick={handlePayment}
              disabled={!product || paymentStatus === "loading" || paymentStatus === "success"}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={
                paymentStatus === "success"
                  ? {
                      background: "oklch(0.20 0.10 150 / 0.8)",
                      border: "1px solid oklch(0.55 0.18 150 / 0.6)",
                      color: "oklch(0.75 0.18 150)",
                    }
                  : paymentStatus === "error"
                  ? {
                      background: "oklch(0.18 0.10 20 / 0.8)",
                      border: "1px solid oklch(0.55 0.18 20 / 0.6)",
                      color: "oklch(0.75 0.18 20)",
                    }
                  : !product
                  ? {
                      background: "oklch(0.12 0.03 230 / 0.6)",
                      border: "1px solid oklch(0.40 0.05 230 / 0.4)",
                      color: "oklch(0.55 0.05 230)",
                    }
                  : {
                      background: "oklch(0.22 0.12 70 / 0.25)",
                      border: "1px solid oklch(0.65 0.18 70 / 0.6)",
                      color: "oklch(0.85 0.18 70)",
                    }
              }
            >
              <Wallet size={14} />
              {paymentStatus === "loading"
                ? "جاري المعالجة..."
                : paymentStatus === "success"
                ? "تمت الدفعة بنجاح!"
                : paymentStatus === "error"
                ? "فشلت الدفعة"
                : !product
                ? "المنتج غير متاح"
                : `${product.name} · ${amount} π`}
            </button>
            {paymentStatus === "error" && paymentError && (
              <p className="text-xs mt-1 text-center" style={{ color: "oklch(0.70 0.18 20)" }}>
                {paymentError}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mini Store Section */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-foreground">متجري الصغير</h3>
          <span className="text-xs text-muted-foreground">2 منتجات</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { name: "ساعة ذكية Pro", price: "45 π", emoji: "⌚", gradient: "from-blue-900/60 to-cyan-900/60" },
            { name: "كتاب Pi Network", price: "12 π", emoji: "📘", gradient: "from-purple-900/60 to-blue-900/60" },
          ].map((product) => (
            <div
              key={product.name}
              className="rounded-xl overflow-hidden"
              style={{ background: "oklch(0.12 0.04 230 / 0.8)", border: "1px solid oklch(0.75 0.18 195 / 0.2)" }}
            >
              <div
                className="h-20 flex items-center justify-center text-3xl"
                style={{ background: "oklch(0.15 0.05 220 / 0.9)" }}
              >
                {product.emoji}
              </div>
              <div className="p-2">
                <p className="text-xs font-semibold text-foreground truncate">{product.name}</p>
                <p className="neon-text text-xs font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Product Button */}
        <button
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
          style={{
            background: "oklch(0.14 0.04 240 / 0.8)",
            border: "1px dashed oklch(0.75 0.18 195 / 0.4)",
            color: "oklch(0.75 0.18 195)",
          }}
        >
          <Plus size={16} />
          إضافة منتج
        </button>
      </div>
    </div>
  );
}
