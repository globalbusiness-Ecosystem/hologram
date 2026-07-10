"use client";

import { useState } from "react";
import { Check, Zap, Building2, Shield, Star, X, Sparkles } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { PRODUCT_CONFIG } from "@/lib/product-config";

type Plan = {
  id: "free" | "pro" | "business";
  nameAr: string;
  nameEn: string;
  price: number | null;
  priceLabel: string;
  descAr: string;
  icon: React.ReactNode;
  accentColor: string;
  borderColor: string;
  bgColor: string;
  features: string[];
  popular?: boolean;
  productKey?: keyof typeof PRODUCT_CONFIG;
};

const PLANS: Plan[] = [
  {
    id: "free",
    nameAr: "مجاني",
    nameEn: "Free",
    price: null,
    priceLabel: "0 π",
    descAr: "ابدأ رحلتك في Pi Network",
    icon: <Shield size={22} />,
    accentColor: "oklch(0.65 0.08 220)",
    borderColor: "oklch(0.30 0.05 220 / 0.6)",
    bgColor: "oklch(0.12 0.03 230 / 0.6)",
    features: [
      "بطاقة هوية هولوغرافية",
      "3 منتجات في المتجر",
      "KYC أساسي",
      "محفظة Pi",
      "استكشاف المستخدمين",
    ],
  },
  {
    id: "pro",
    nameAr: "احترافي",
    nameEn: "Pro",
    price: 5,
    priceLabel: "5 π / شهر",
    descAr: "للمحترفين والتجار النشطين",
    icon: <Star size={22} />,
    accentColor: "oklch(0.75 0.18 195)",
    borderColor: "oklch(0.75 0.18 195 / 0.7)",
    bgColor: "oklch(0.12 0.06 210 / 0.7)",
    popular: true,
    productKey: "PRODUCT_69a743cb654e21c0494c659b",
    features: [
      "كل مميزات المجاني",
      "شارة Pro الذهبية",
      "منتجات غير محدودة",
      "تحليلات متقدمة",
      "أولوية في نتائج البحث",
      "QR مخصص للبطاقة",
      "دعم أولوية 24/7",
    ],
  },
  {
    id: "business",
    nameAr: "أعمال",
    nameEn: "Business",
    price: 15,
    priceLabel: "15 π / شهر",
    descAr: "للشركات والمتاجر الكبيرة",
    icon: <Building2 size={22} />,
    accentColor: "oklch(0.80 0.18 70)",
    borderColor: "oklch(0.80 0.18 70 / 0.6)",
    bgColor: "oklch(0.13 0.06 60 / 0.5)",
    features: [
      "كل مميزات الاحترافي",
      "شارة Business الذهبية",
      "لوحة تحكم للفريق",
      "تكامل API",
      "متجر مخصص بالنطاق",
      "تقارير مالية PDF",
      "مدير حساب مخصص",
    ],
  },
];

type PaymentState = {
  status: "idle" | "loading" | "success" | "error";
  message: string | null;
};

export default function PlansTab() {
  const [selectedPlan, setSelectedPlan] = useState<"free" | "pro" | "business">("pro");
  const [paymentStates, setPaymentStates] = useState<Record<string, PaymentState>>({
    pro: { status: "idle", message: null },
    business: { status: "idle", message: null },
  });
  const [showSuccessModal, setShowSuccessModal] = useState<Plan | null>(null);

  const { products } = usePiAuth();

  const updatePaymentState = (planId: string, state: PaymentState) => {
    setPaymentStates((prev) => ({ ...prev, [planId]: state }));
  };

  const handleSubscribe = (plan: Plan) => {
    if (!plan.price || !plan.productKey) return;

    const product = products?.find((p) => p.id === PRODUCT_CONFIG[plan.productKey!]);
    const amount = product?.price_in_pi ?? plan.price;

    updatePaymentState(plan.id, { status: "loading", message: null });

    window.pay({
      amount,
      memo: `${plan.nameEn} Plan - Hologram.pi`,
      metadata: { productId: product?.id ?? plan.id, planId: plan.id },
      onComplete: () => {
        updatePaymentState(plan.id, { status: "success", message: null });
        setShowSuccessModal(plan);
        setTimeout(() => {
          updatePaymentState(plan.id, { status: "idle", message: null });
        }, 4000);
      },
      onError: (error: Error) => {
        const msg = error?.message ?? "فشل الدفع. حاول مجددًا.";
        updatePaymentState(plan.id, { status: "error", message: msg });
        setTimeout(() => {
          updatePaymentState(plan.id, { status: "idle", message: null });
        }, 4000);
      },
    });
  };

  return (
    <div className="min-h-full pb-6" dir="rtl">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowSuccessModal(null)} />
          <div
            className="relative w-full max-w-sm rounded-3xl p-6 animate-slide-up"
            style={{
              background: "linear-gradient(135deg, oklch(0.10 0.06 200), oklch(0.14 0.08 250))",
              border: "1px solid oklch(0.75 0.18 195 / 0.5)",
              boxShadow: "0 0 60px oklch(0.75 0.18 195 / 0.3)",
            }}
          >
            <button
              onClick={() => setShowSuccessModal(null)}
              className="absolute top-4 left-4 text-muted-foreground"
            >
              <X size={18} />
            </button>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "oklch(0.20 0.10 150 / 0.8)",
                  border: "2px solid oklch(0.65 0.18 150)",
                  boxShadow: "0 0 20px oklch(0.65 0.18 150 / 0.5)",
                }}
              >
                <Check size={28} style={{ color: "oklch(0.75 0.18 150)" }} />
              </div>
              <h3
                className="text-lg font-bold mb-1"
                style={{ color: "oklch(0.90 0.20 195)" }}
              >
                اشتراك ناجح!
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                تم تفعيل خطة{" "}
                <span style={{ color: showSuccessModal.accentColor }} className="font-bold">
                  {showSuccessModal.nameAr}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                استمتع بجميع المميزات المتميزة الآن
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-4 pt-2 pb-4">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold neon-text">الخطط</h1>
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} style={{ color: "oklch(0.80 0.18 70)" }} />
            <span className="text-xs" style={{ color: "oklch(0.80 0.18 70)" }}>
              ارتقِ بهويتك
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          اختر الخطة المناسبة لك وابدأ رحلتك
        </p>
      </div>

      {/* Current Plan Banner */}
      <div className="px-4 mb-4">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: "oklch(0.20 0.10 150 / 0.15)",
            border: "1px solid oklch(0.55 0.18 150 / 0.4)",
          }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "oklch(0.20 0.10 150 / 0.5)", border: "1px solid oklch(0.55 0.18 150 / 0.5)" }}
          >
            <Shield size={15} style={{ color: "oklch(0.75 0.18 150)" }} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold" style={{ color: "oklch(0.75 0.18 150)" }}>
              خطتك الحالية: مجاني
            </p>
            <p className="text-xs text-muted-foreground">ترقّ الآن للحصول على مزايا أكثر</p>
          </div>
          <Zap size={14} style={{ color: "oklch(0.80 0.18 70)" }} />
        </div>
      </div>

      {/* Plan Cards */}
      <div className="px-4 space-y-3">
        {PLANS.map((plan) => {
          const pState = paymentStates[plan.id] ?? { status: "idle", message: null };
          const isSelected = selectedPlan === plan.id;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className="relative rounded-2xl p-4 cursor-pointer transition-all active:scale-98"
              style={{
                background: isSelected ? plan.bgColor : "oklch(0.10 0.03 230 / 0.7)",
                border: `1px solid ${isSelected ? plan.borderColor : "oklch(0.20 0.04 230)"}`,
                boxShadow: isSelected ? `0 0 20px ${plan.accentColor}25` : "none",
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div
                  className="absolute -top-2.5 right-4 px-3 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    background: "oklch(0.75 0.18 195)",
                    color: "oklch(0.08 0.02 240)",
                  }}
                >
                  الأكثر شيوعًا
                </div>
              )}

              {/* Plan Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${plan.accentColor}20`,
                      border: `1px solid ${plan.accentColor}50`,
                      color: plan.accentColor,
                    }}
                  >
                    {plan.icon}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">{plan.nameAr}</p>
                    <p className="text-xs text-muted-foreground">{plan.descAr}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p
                    className="font-bold text-base"
                    style={{ color: plan.accentColor }}
                  >
                    {plan.priceLabel}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-1.5 mb-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check
                      size={12}
                      className="flex-shrink-0"
                      style={{ color: plan.accentColor }}
                    />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              {plan.price === null ? (
                <div
                  className="w-full py-2.5 rounded-xl text-center text-xs font-semibold"
                  style={{
                    background: "oklch(0.15 0.03 230 / 0.8)",
                    border: "1px solid oklch(0.22 0.05 220)",
                    color: "oklch(0.55 0.06 220)",
                  }}
                >
                  خطتك الحالية
                </div>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribe(plan);
                    }}
                    disabled={pState.status === "loading" || pState.status === "success"}
                    className="w-full py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background:
                        pState.status === "success"
                          ? "oklch(0.20 0.10 150 / 0.8)"
                          : pState.status === "error"
                          ? "oklch(0.18 0.10 20 / 0.8)"
                          : `${plan.accentColor}20`,
                      border: `1px solid ${
                        pState.status === "success"
                          ? "oklch(0.55 0.18 150 / 0.7)"
                          : pState.status === "error"
                          ? "oklch(0.55 0.18 20 / 0.7)"
                          : plan.borderColor
                      }`,
                      color:
                        pState.status === "success"
                          ? "oklch(0.75 0.18 150)"
                          : pState.status === "error"
                          ? "oklch(0.75 0.18 20)"
                          : plan.accentColor,
                    }}
                  >
                    {pState.status === "loading"
                      ? "جاري الدفع..."
                      : pState.status === "success"
                      ? "تم الاشتراك!"
                      : pState.status === "error"
                      ? "فشل الدفع — حاول مجددًا"
                      : `اشترك في ${plan.nameAr} · ${plan.priceLabel}`}
                  </button>
                  {pState.status === "error" && pState.message && (
                    <p
                      className="text-xs mt-1.5 text-center"
                      style={{ color: "oklch(0.70 0.18 20)" }}
                    >
                      {pState.message}
                    </p>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Feature comparison footer */}
      <div className="px-4 mt-6">
        <div
          className="rounded-2xl p-4"
          style={{
            background: "oklch(0.10 0.04 230 / 0.6)",
            border: "1px solid oklch(0.20 0.05 220)",
          }}
        >
          <p
            className="text-xs font-semibold mb-2 text-center"
            style={{ color: "oklch(0.75 0.18 195)" }}
          >
            جميع الخطط تشمل
          </p>
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
            {[
              "تشفير من طرف إلى طرف",
              "Pi Blockchain أصلي",
              "دعم عربي كامل",
              "تحديثات مجانية دائمًا",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-1.5">
                <Shield size={10} style={{ color: "oklch(0.65 0.18 150)", flexShrink: 0 }} />
                <span className="text-xs text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
