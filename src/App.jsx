import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Camera,
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  Zap,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Sliders,
  BarChart3,
  Layers,
  Truck,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sun,
  Moon,
  Tag,
  Search,
  Eye,
  Percent
} from 'lucide-react';
import FounderConnectModal from './FounderConnectModal';

// Sample visual dupe categories for the interactive teaser
const DUPE_SHOWCASES = [
  {
    id: 'jacket',
    title: 'Distressed Oversized Biker Jacket',
    category: 'Outerwear',
    luxuryBrand: 'Designer Runway Fall/Winter',
    luxuryPrice: 24000,
    luxuryImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
    partnerBrand: 'UrbanStitch Studio (Verified Seller)',
    partnerPrice: 1899,
    partnerImage: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&auto=format&fit=crop&q=80',
    similarity: 94,
    priceDeltaPercent: 92,
    explanation: 'Identical drop-shoulder cropped silhouette, matte heavyweight vegan leather, and distressed gunmetal hardware finish.',
    tags: ['#Streetwear', '#BikerChic', '#Y2KDistressed', '#VeganLeather']
  },
  {
    id: 'dress',
    title: 'Bias-Cut Silk Drape Midi Dress',
    category: 'Occasion Wear',
    luxuryBrand: 'Parisian Haute Couture',
    luxuryPrice: 18500,
    luxuryImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
    partnerBrand: 'Aura Atelier (Boutique Maker)',
    partnerPrice: 1450,
    partnerImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
    similarity: 96,
    priceDeltaPercent: 92,
    explanation: 'Flawless 45° bias-cut drape, cowl neck neckline contour, and subtle liquid sheen satin weave.',
    tags: ['#CleanGirl', '#CowlNeck', '#SatinMidi', '#Minimalist']
  },
  {
    id: 'loafers',
    title: 'Chunky Lug-Sole Brushed Loafers',
    category: 'Footwear',
    luxuryBrand: 'Milan Fashion Week Collection',
    luxuryPrice: 32000,
    luxuryImage: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80',
    partnerBrand: 'Veritas Footwear (D2C Label)',
    partnerPrice: 2299,
    partnerImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
    similarity: 91,
    priceDeltaPercent: 93,
    explanation: 'Distinctive 45mm extruded EVA lug platform, brushed micro-grain upper, and matching tonal penny keeper.',
    tags: ['#DarkAcademia', '#PlatformLoafers', '#LugSole', '#CasualLuxury']
  }
];

// Trending Dupe Radar mock data
const RADAR_ITEMS = [
  {
    trend: 'Oversized Vintage Bomber Jacket',
    volumeGrowth: '+340%',
    demandLevel: 'Critically High',
    searches: '42,800/wk',
    benchmarkPrice: '₹22,000',
    targetPrice: '₹1,699 - ₹2,199',
    status: 'High Unmet Demand'
  },
  {
    trend: 'Asymmetrical Draped Cowl Top',
    volumeGrowth: '+215%',
    demandLevel: 'High',
    searches: '28,400/wk',
    benchmarkPrice: '₹14,500',
    targetPrice: '₹899 - ₹1,299',
    status: 'Rapidly Rising'
  },
  {
    trend: 'Pleated Wide-Leg Palazzo Trousers',
    volumeGrowth: '+180%',
    demandLevel: 'Moderate',
    searches: '36,100/wk',
    benchmarkPrice: '₹9,800',
    targetPrice: '₹1,199 - ₹1,599',
    status: 'Stable High-Volume'
  },
  {
    trend: 'Distressed Metallic Micro Shoulder Bag',
    volumeGrowth: '+410%',
    demandLevel: 'Critically High',
    searches: '19,700/wk',
    benchmarkPrice: '₹28,500',
    targetPrice: '₹1,499 - ₹1,899',
    status: 'Viral Spike'
  }
];

const fmtINR = (val) => `₹${Math.round(val).toLocaleString('en-IN')}`;

export default function App() {
  const [theme, setTheme] = useState('light');
  const [selectedDupe, setSelectedDupe] = useState(DUPE_SHOWCASES[0]);
  const [monthlyOrders, setMonthlyOrders] = useState(850);
  const [averageOrderValue, setAverageOrderValue] = useState(1650);
  const [showFounderModal, setShowFounderModal] = useState(false);
  const [modalIntent, setModalIntent] = useState('apply');

  // Environment-aware dual boundary detection
  const isShowcase = typeof window !== 'undefined' && (
    window.location.hostname.includes('github.io') ||
    window.location.search.includes('mode=showcase')
  );

  const handleSellerAction = (e, intent = 'apply') => {
    if (e && isShowcase) e.preventDefault();
    if (isShowcase) {
      setModalIntent(intent);
      setShowFounderModal(true);
    } else {
      // Local development or production full-stack SaaS redirection
      if (intent === 'signin') {
        window.location.href = '/seller';
      } else {
        window.location.href = '/seller?tab=register';
      }
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Revenue & savings calculations
  const monthlyGMV = monthlyOrders * averageOrderValue;
  const legacyCommissionRate = 0.28; // 28% typical marketplace take rate (commission + listing + payment fee)
  const legacyMarketplaceFees = monthlyGMV * legacyCommissionRate;
  const dupeScoutLaunchFees = 0; // 0% commission for first 90 days
  const merchantSavings = legacyMarketplaceFees - dupeScoutLaunchFees;
  const dailyPayout = Math.round(monthlyGMV / 30);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-stone-900 dark:text-white">
                  DupeScout
                </span>
                <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  Seller Studio
                </span>
              </div>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium hidden sm:block">
                Shop the Look. Not the Markup.
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-stone-600 dark:text-stone-300">
            <a href="#benefits" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Why Sell</a>
            <a href="#visual-engine" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Visual AI Engine</a>
            <a href="#radar" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Trending Radar</a>
            <a href="#calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Revenue Calculator</a>
            <a href="#stories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Sellers</a>
          </nav>

          {/* Action Header CTAs */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Seller Sign In */}
            <button
              onClick={(e) => handleSellerAction(e, 'signin')}
              className="hidden sm:inline-flex text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 transition-colors"
            >
              Seller Sign In
            </button>

            {/* Primary Action Button */}
            <button
              onClick={(e) => handleSellerAction(e, 'apply')}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold px-4 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Apply as Seller</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Background glow accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Promo Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-bold mb-8 animate-fade-in shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>0% Commission for First 90 Days • Daily Automated UPI Payouts</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-stone-900 dark:text-white tracking-tight leading-[1.1] mb-6">
            Turn Gen Z’s Screenshot Obsession Into Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500">
              High-Volume Sales Engine
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Put your apparel and fashion catalog in front of <strong>500k+ shoppers</strong> searching for affordable dupes. When a shopper uploads an Instagram or Pinterest screenshot of a ₹24,000 designer look, our multimodal AI matches them directly to your ₹1,899 inventory.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={(e) => handleSellerAction(e, 'apply')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl shadow-emerald-600/35 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Apply as Verified Seller</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#visual-engine"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 font-bold text-base px-7 py-4 rounded-2xl text-stone-800 dark:text-stone-200 transition-colors shadow-sm"
            >
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>See Live Visual Match</span>
            </a>
          </div>

          {/* Trust Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-900 dark:text-white block">500k+ Shoppers</span>
                <span className="text-[11px] text-stone-500">Active Gen Z buyers</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                <Percent className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-900 dark:text-white block">0% Commission</span>
                <span className="text-[11px] text-stone-500">First 90 days free</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-900 dark:text-white block">Daily UPI Payouts</span>
                <span className="text-[11px] text-stone-500">Automated settlement</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-900 dark:text-white block">Shiprocket Built-in</span>
                <span className="text-[11px] text-stone-500">Delhivery 1-click labels</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Visual Dupe Demand Showcase */}
      <section id="visual-engine" className="py-20 bg-stone-100 dark:bg-stone-900/50 border-y border-stone-200 dark:border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-extrabold mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>THE MULTIMODAL DEMAND FUNNEL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight mb-4">
              How Visual AI Matches Luxury Demand to Your Catalog
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
              Unlike keyword searches where users can't describe cuts or silhouettes, DupeScout vectors images. Switch between categories below to test our CLIP similarity model live:
            </p>
          </div>

          {/* Category Selector Tabs */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {DUPE_SHOWCASES.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedDupe(item)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedDupe.id === item.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Interactive Comparison Card */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden">
            
            {/* Top Match Bar */}
            <div className="px-6 py-4 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-white">
                  Live Visual Similarity Match: <span className="text-emerald-600 dark:text-emerald-400 font-black">{selectedDupe.similarity}% Visual Match</span>
                </span>
              </div>
              <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-sm">
                <Tag className="w-3.5 h-3.5" />
                <span>{selectedDupe.priceDeltaPercent}% Shopper Savings • 100% Merchant Margin</span>
              </div>
            </div>

            {/* Split Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200 dark:divide-stone-800">
              
              {/* Left: Luxury Benchmark (User's Screenshot) */}
              <div className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-md">
                      Shopper's Uploaded Screenshot
                    </span>
                    <span className="text-xs text-stone-400 font-medium">Unmet High Markup</span>
                  </div>

                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-stone-100 dark:bg-stone-800 relative group">
                    <img 
                      src={selectedDupe.luxuryImage} 
                      alt={selectedDupe.luxuryBrand} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-xs font-semibold opacity-80 block">{selectedDupe.luxuryBrand}</span>
                      <span className="text-2xl font-black text-rose-400">{fmtINR(selectedDupe.luxuryPrice)}</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-800 dark:text-stone-200 mb-2">
                    {selectedDupe.title} (Designer Benchmark)
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
                    500k+ shoppers screenshot this look on TikTok &amp; Instagram, but balk at paying {fmtINR(selectedDupe.luxuryPrice)}.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 text-xs text-stone-500">
                  ⚠️ <strong>Keyword Bottleneck:</strong> Shoppers cannot describe the stitching or lapel cut in text search.
                </div>
              </div>

              {/* Right: DupeScout Merchant Alternate */}
              <div className="p-6 sm:p-8 flex flex-col justify-between bg-emerald-500/[0.02]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                      Matched Merchant SKU (Your Inventory)
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">High-Conversion Match</span>
                  </div>

                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-stone-100 dark:bg-stone-800 relative group">
                    <img 
                      src={selectedDupe.partnerImage} 
                      alt={selectedDupe.partnerBrand} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-xs font-semibold opacity-80 block">{selectedDupe.partnerBrand}</span>
                      <span className="text-2xl font-black text-emerald-400">{fmtINR(selectedDupe.partnerPrice)}</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white mb-2">
                    {selectedDupe.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                    <strong>AI Visual Explanation:</strong> {selectedDupe.explanation}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {selectedDupe.tags.map((tag, i) => (
                      <span key={i} className="text-[11px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => handleSellerAction(e, 'apply')}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
                  >
                    <span>Match My Brand's Catalog Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Seller Value Props Grid (The 4 Core Pillars) */}
      <section id="benefits" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-extrabold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>BUILT EXCLUSIVELY FOR FASHION MERCHANTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight mb-4">
            Why Top Fashion Brands Sell on DupeScout
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
            Stop burning ad budget on Instagram PPC with low conversion. Capture high-intent visual demand at the exact moment of screenshot intent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Pillar 1 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-stone-900 dark:text-white mb-3">
              1. Multimodal Demand Funnel
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
              Shoppers upload screenshots of ₹15,000+ luxury designer wear straight from Instagram reels or celebrity paparazzi photos. Our visual AI matches their intent directly to your ₹1,200 catalog, bypassing traditional search keywords completely.
            </p>
            <ul className="space-y-2 text-xs font-medium text-stone-700 dark:text-stone-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero reliance on shoppers guessing SEO keywords</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>3.8x higher purchase conversion vs. text keyword search</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-stone-900 dark:text-white mb-3">
              2. Automated AI Catalog Vectorization
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
              Forget manual data entry and complex tagging. Simply drag and drop lookbook photos or your Shopify CSV. Our fine-tuned CLIP AI automatically generates dense vector embeddings, cuts, fabrics, colors, and aesthetic tags in under 3 seconds.
            </p>
            <ul className="space-y-2 text-xs font-medium text-stone-700 dark:text-stone-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Instant Shopify, WooCommerce, and CSV catalog sync</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Automatic aesthetic indexing (#OldMoney, #CleanGirl, #Y2K)</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-stone-900 dark:text-white mb-3">
              3. Live Trending Dupe Radar
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
              Never guess what to manufacture or stock next. Gain instant access to our real-time merchant radar showing which luxury items are spiking in screenshot searches before they hit mainstream fast-fashion stores.
            </p>
            <ul className="space-y-2 text-xs font-medium text-stone-700 dark:text-stone-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Live unmet demand index and target pricing suggestions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Eliminate unsold deadstock by producing verified demand</span>
              </li>
            </ul>
          </div>

          {/* Pillar 4 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-stone-900 dark:text-white mb-3">
              4. Zero-Risk Onboarding &amp; Daily Payouts
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
              Traditional marketplaces trap your working capital with 25-30% commissions and 21-day settlement cycles. DupeScout offers 0% commission for your first 90 days, daily automated UPI payouts, and built-in Shiprocket courier labels.
            </p>
            <ul className="space-y-2 text-xs font-medium text-stone-700 dark:text-stone-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>0% commission on all orders for 90 days</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Direct daily UPI settlement to your current account</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Interactive Seller Revenue & Savings Calculator */}
      <section id="calculator" className="py-20 bg-stone-100 dark:bg-stone-900/60 border-y border-stone-200 dark:border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-extrabold mb-3">
              <DollarSign className="w-3.5 h-3.5" />
              <span>TRANSPARENT MERCHANT ECONOMICS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight mb-4">
              Calculate Your 90-Day Zero-Commission Advantage
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
              Slide your expected monthly order volume and average price to see how much margin you keep compared to legacy marketplaces (Myntra, Ajio, Amazon).
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl p-6 sm:p-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* Sliders Side */}
              <div className="flex flex-col justify-center space-y-8">
                
                {/* Orders Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-stone-800 dark:text-stone-200">
                      Estimated Monthly Orders:
                    </label>
                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      {monthlyOrders.toLocaleString()} units
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={monthlyOrders}
                    onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                    className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 font-semibold mt-1">
                    <span>100 units</span>
                    <span>2,500 units</span>
                    <span>5,000 units</span>
                  </div>
                </div>

                {/* AOV Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-stone-800 dark:text-stone-200">
                      Average Order Value (AOV):
                    </label>
                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      {fmtINR(averageOrderValue)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="800"
                    max="4000"
                    step="50"
                    value={averageOrderValue}
                    onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                    className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 font-semibold mt-1">
                    <span>₹800</span>
                    <span>₹2,400</span>
                    <span>₹4,000</span>
                  </div>
                </div>

                {/* Small callout */}
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
                  💡 <strong>Comparison Standard:</strong> Legacy marketplaces charge 28% total take rate (22% category commission + 3% payment gateway + 3% fixed closing &amp; tech fees). DupeScout waives all fees for your first 90 days.
                </div>

              </div>

              {/* Outputs Side */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/25 flex flex-col justify-between">
                
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                    Your Monthly Commercial Projection
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white font-mono mb-6">
                    {fmtINR(monthlyGMV)} <span className="text-sm font-medium text-stone-500">GMV</span>
                  </div>

                  <div className="space-y-4 mb-8">
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-stone-600 dark:text-stone-400">Fees on Legacy Marketplaces (28%):</span>
                      <span className="font-bold text-rose-500 font-mono">-{fmtINR(legacyMarketplaceFees)}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-stone-600 dark:text-stone-400">DupeScout Launch Fee (0%):</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">₹0</span>
                    </div>

                    <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-between items-center">
                      <span className="font-black text-stone-900 dark:text-white text-base">Monthly Cash Retained:</span>
                      <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                        +{fmtINR(merchantSavings)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs text-stone-500">
                      <span>Daily Automated UPI Liquidity:</span>
                      <span className="font-bold font-mono text-stone-700 dark:text-stone-300">~{fmtINR(dailyPayout)}/day</span>
                    </div>

                  </div>
                </div>

                <button
                  onClick={(e) => handleSellerAction(e, 'apply')}
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01]"
                >
                  <span>Claim Your 90-Day 0% Commission Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Live Trending Dupe Radar Preview */}
      <section id="radar" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-extrabold mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>REAL-TIME MARKET DEMAND INTELLIGENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight mb-4">
            Live Trending Dupe Radar
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
            See exactly what 500k+ Gen Z shoppers are screenshotting right now across India. Verified sellers get actionable manufacturing &amp; stocking radar alerts.
          </p>
        </div>

        {/* Radar Table Container */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-md overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 text-xs font-bold text-stone-500 uppercase tracking-wider">
                <th className="py-4 px-6">Trending Fashion Aesthetic</th>
                <th className="py-4 px-6">Search Spike (WoW)</th>
                <th className="py-4 px-6">Weekly Uploads</th>
                <th className="py-4 px-6">Luxury Benchmark</th>
                <th className="py-4 px-6">Recommended Target Price</th>
                <th className="py-4 px-6">Market Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
              {RADAR_ITEMS.map((item, idx) => (
                <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-stone-900 dark:text-white">
                    {item.trend}
                  </td>
                  <td className="py-4 px-6 font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {item.volumeGrowth}
                  </td>
                  <td className="py-4 px-6 text-stone-600 dark:text-stone-300 font-mono">
                    {item.searches}
                  </td>
                  <td className="py-4 px-6 text-stone-500 line-through">
                    {item.benchmarkPrice}
                  </td>
                  <td className="py-4 px-6 font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {item.targetPrice}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={(e) => handleSellerAction(e, 'radar')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <span>Request Full Category Radar Feed with 1,200+ Trending SKUs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </section>

      {/* Seller Stories / Social Proof */}
      <section id="stories" className="py-20 bg-stone-100 dark:bg-stone-900/50 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight mb-4">
              Trusted by 120+ Verified Independent Fashion Creators
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
              See how apparel makers, boutique brands, and thrifting curators scale with visual demand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic mb-6">
                "On Instagram ads we were paying ₹450 per acquisition. On DupeScout, shoppers who upload a ₹28,000 Zara coat screenshot are matched directly to our ₹2,100 alternate. Our conversion jumped from 1.2% to 6.4%."
              </p>
              <div>
                <span className="text-sm font-bold text-stone-900 dark:text-white block">UrbanStitch Studio</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block">₹8.4L GMV in 60 days • Bengaluru</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic mb-6">
                "The automated CLIP vectorization is unbelievable. I uploaded our 150-SKU lookbook on Monday morning. By afternoon, the AI had tagged every silhouette and matched 40+ trending screenshot searches."
              </p>
              <div>
                <span className="text-sm font-bold text-stone-900 dark:text-white block">Aura Contemporary</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block">320 orders in month 1 • Mumbai</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic mb-6">
                "Daily UPI settlement changed our cash flow completely. No more waiting 30 days for Amazon payouts to buy fabric for our next batch. And 0% commission for 90 days meant we could price aggressively."
              </p>
              <div>
                <span className="text-sm font-bold text-stone-900 dark:text-white block">Veritas Footwear</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block">1,100+ pairs shipped • Agra / Delhi</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Final High-Converting CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-2xl relative overflow-hidden">
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
                Ready to Put Your Catalog in Front of 500k+ Shoppers?
              </h2>
              <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed mb-8">
                Join our verified merchant network. Enjoy 0% commission for 90 days, daily automated UPI payouts, and immediate multimodal AI visual matching.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={(e) => handleSellerAction(e, 'apply')}
                  className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-stone-100 font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-lg transition-transform hover:scale-[1.02]"
                >
                  Apply as Verified Seller Now
                </button>
                <button
                  onClick={(e) => handleSellerAction(e, 'demo')}
                  className="w-full sm:w-auto bg-emerald-800/60 hover:bg-emerald-800 text-white border border-white/20 font-bold text-sm sm:text-base px-7 py-4 rounded-2xl transition-colors"
                >
                  Book 1-on-1 Founder Walkthrough
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 dark:border-stone-800 py-12 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-500">
          
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
              D
            </div>
            <span>
              © 2026 DupeScout — <strong>Shop the Look. Not the Markup.</strong> Part of Trend-Tribe.
            </span>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <button 
              onClick={(e) => handleSellerAction(e, 'signin')}
              className="hover:text-emerald-600 transition-colors"
            >
              Seller Portal
            </button>
            <a 
              href="https://github.com/Trend-Tribe/DupeScout" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-emerald-600 transition-colors"
            >
              Monorepo Architecture
            </a>
            <button 
              onClick={(e) => handleSellerAction(e, 'demo')}
              className="hover:text-emerald-600 transition-colors"
            >
              Founder Connect
            </button>
          </div>

        </div>
      </footer>

      {/* Dual-Boundary Interception Modal */}
      <FounderConnectModal
        isOpen={showFounderModal}
        onClose={() => setShowFounderModal(false)}
        intent={modalIntent}
      />

    </div>
  );
}
