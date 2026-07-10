"use client";

import { useState } from "react";
import { Search, ShoppingCart, Star, Filter } from "lucide-react";

const products = [
  {
    id: 1,
    name: "سماعات لاسلكية",
    seller: "TechStore.pi",
    price: "28 π",
    emoji: "🎧",
    rating: 4.8,
    colorFrom: "oklch(0.15 0.08 220)",
    colorTo: "oklch(0.12 0.06 260)",
    sold: 142,
  },
  {
    id: 2,
    name: "لوحة رسم ديجيتال",
    seller: "ArtHub.pi",
    price: "55 π",
    emoji: "🎨",
    rating: 4.9,
    colorFrom: "oklch(0.15 0.08 280)",
    colorTo: "oklch(0.12 0.06 320)",
    sold: 89,
  },
  {
    id: 3,
    name: "دورة تعلم Python",
    seller: "EduPi.pi",
    price: "15 π",
    emoji: "💻",
    rating: 4.7,
    colorFrom: "oklch(0.15 0.06 170)",
    colorTo: "oklch(0.12 0.08 200)",
    sold: 320,
  },
  {
    id: 4,
    name: "حقيبة جلد أصلي",
    seller: "FashionPi",
    price: "72 π",
    emoji: "👜",
    rating: 4.6,
    colorFrom: "oklch(0.15 0.08 50)",
    colorTo: "oklch(0.12 0.06 30)",
    sold: 58,
  },
];

export default function MarketplaceTab() {
  const [search, setSearch] = useState("");
  const [added, setAdded] = useState<number | null>(null);

  const filtered = products.filter(
    (p) =>
      p.name.includes(search) ||
      p.seller.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuy = (id: number) => {
    setAdded(id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div className="min-h-full pb-4">
      {/* Header */}
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold neon-text">السوق</h1>
          <button
            className="p-2 rounded-xl transition-colors"
            style={{ background: "oklch(0.14 0.04 240 / 0.8)", border: "1px solid oklch(0.75 0.18 195 / 0.2)" }}
          >
            <Filter size={16} style={{ color: "oklch(0.75 0.18 195)" }} />
          </button>
        </div>

        {/* Search Bar */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
          style={{ background: "oklch(0.13 0.04 230 / 0.8)", border: "1px solid oklch(0.75 0.18 195 / 0.25)" }}
        >
          <Search size={16} style={{ color: "oklch(0.55 0.06 220)" }} />
          <input
            type="text"
            placeholder="ابحث عن منتجات..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none text-right"
            dir="rtl"
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="px-4 mb-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {["الكل", "تقنية", "تعليم", "أزياء", "فنون"].map((cat, i) => (
            <button
              key={cat}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={
                i === 0
                  ? {
                      background: "oklch(0.75 0.18 195 / 0.2)",
                      border: "1px solid oklch(0.75 0.18 195 / 0.6)",
                      color: "oklch(0.85 0.20 195)",
                    }
                  : {
                      background: "oklch(0.14 0.03 240 / 0.8)",
                      border: "1px solid oklch(0.22 0.05 220)",
                      color: "oklch(0.55 0.06 220)",
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-muted-foreground">{filtered.length} منتج متاح</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl overflow-hidden transition-transform active:scale-95"
              style={{
                background: "oklch(0.12 0.04 230 / 0.9)",
                border: "1px solid oklch(0.75 0.18 195 / 0.2)",
              }}
            >
              {/* Product Image Area */}
              <div
                className="h-24 flex items-center justify-center text-4xl relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${product.colorFrom}, ${product.colorTo})`,
                }}
              >
                <div className="absolute inset-0 grid-bg opacity-30" />
                <span className="relative z-10">{product.emoji}</span>
                {/* Rating badge */}
                <div
                  className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-bold"
                  style={{ background: "oklch(0.08 0.02 240 / 0.85)", color: "oklch(0.85 0.18 70)" }}
                >
                  <Star size={9} fill="currentColor" />
                  {product.rating}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-2.5">
                <p className="font-semibold text-xs text-foreground mb-0.5 truncate text-right" dir="rtl">
                  {product.name}
                </p>
                <p className="text-xs text-muted-foreground mb-2 text-right truncate" dir="rtl">
                  {product.seller}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleBuy(product.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95"
                    style={
                      added === product.id
                        ? {
                            background: "oklch(0.35 0.15 150 / 0.3)",
                            border: "1px solid oklch(0.55 0.18 150 / 0.6)",
                            color: "oklch(0.75 0.18 150)",
                          }
                        : {
                            background: "oklch(0.75 0.18 195 / 0.15)",
                            border: "1px solid oklch(0.75 0.18 195 / 0.5)",
                            color: "oklch(0.85 0.20 195)",
                          }
                    }
                  >
                    {added === product.id ? "تمت!" : "شراء"}
                  </button>
                  <span className="neon-text font-bold text-sm">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
