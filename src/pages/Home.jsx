import React, { useEffect, useState, useMemo, useCallback } from "react";
import * as LucideIcons from "lucide-react";
import { formatCurrency } from "../../utils/index";
import Nav from "../components/moleculs/nav";
import { ModalTransactions } from "../components/atoms/modal";
import axios from "axios";
// ─── Helpers ────────────────────────────────────────────────────────────────
const getIconComponent = (iconName) => {
  if (!iconName || typeof iconName !== "string") return LucideIcons.ShoppingBag;
  return LucideIcons[iconName] || LucideIcons.ShoppingBag;
};
const gradientPairs = [
  ["from-violet-500", "to-purple-600"],
  ["from-fuchsia-500", "to-pink-600"],
  ["from-blue-500", "to-cyan-600"],
  ["from-emerald-500", "to-teal-600"],
  ["from-orange-500", "to-amber-600"],
  ["from-rose-500", "to-red-600"],
  ["from-indigo-500", "to-blue-600"],
  ["from-cyan-500", "to-sky-600"],
  ["from-pink-500", "to-fuchsia-600"],
  ["from-green-500", "to-emerald-600"],
  ["from-yellow-500", "to-orange-600"],
  ["from-purple-500", "to-violet-600"],
];
const getStableGradient = (index) => {
  const pair = gradientPairs[index % gradientPairs.length];
  return `bg-linear-to-br ${pair[0]} ${pair[1]}`;
};
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 5) return { text: "Selamat Malam", emoji: "🌙" };
  if (hour < 11) return { text: "Selamat Pagi", emoji: "🌅" };
  if (hour < 15) return { text: "Selamat Siang", emoji: "☀️" };
  if (hour < 18) return { text: "Selamat Sore", emoji: "🌇" };
  return { text: "Selamat Malam", emoji: "🌙" };
};
const groupTransactionsByDate = (transactions) => {
  const groups = {};
  transactions.forEach((t) => {
    const dateStr = new Date(t.date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    if (!groups[dateStr]) groups[dateStr] = [];
    groups[dateStr].push(t);
  });
  return Object.entries(groups);
};
// ─── Skeleton Components ────────────────────────────────────────────────────
const SkeletonPulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-800/60 rounded-2xl ${className}`} />
);
const BalanceCardSkeleton = () => (
  <div className="bg-linear-to-br from-violet-600/40 via-fuchsia-600/40 to-pink-500/40 rounded-3xl p-6 animate-pulse">
    <SkeletonPulse className="h-4 w-24 mb-3 rounded-lg" />
    <SkeletonPulse className="h-9 w-48 mb-6 rounded-lg" />
    <div className="flex gap-4">
      <SkeletonPulse className="flex-1 h-24" />
      <SkeletonPulse className="flex-1 h-24" />
    </div>
  </div>
);
const CategorySkeleton = () => (
  <div className="flex gap-3 overflow-hidden px-6">
    {[...Array(4)].map((_, i) => (
      <SkeletonPulse key={i} className="min-w-27.5 h-30 shrink-0" />
    ))}
  </div>
);
const TransactionSkeleton = () => (
  <div className="space-y-3 px-6">
    {[...Array(4)].map((_, i) => (
      <SkeletonPulse key={i} className="h-19" />
    ))}
  </div>
);
// ─── Animated Wrapper ───────────────────────────────────────────────────────
const FadeInUp = ({ children, delay = 0, className = "" }) => (
  <div
    className={`transition-all duration-700 ease-out ${className}`}
    style={{
      animationName: "fadeInUp",
      animationDuration: "0.6s",
      animationDelay: `${delay}ms`,
      animationFillMode: "both",
      animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    }}
  >
    {children}
  </div>
);
// ─── Sub Components ─────────────────────────────────────────────────────────
const BalanceCard = ({ summary }) => (
  <FadeInUp delay={100}>
    <div className="relative bg-linear-to-br from-violet-600 via-fuchsia-600 to-pink-500 rounded-3xl p-6 shadow-2xl shadow-violet-500/20 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="relative z-10">
        <p className="text-white/70 text-sm mb-1 flex items-center gap-1.5">
          <LucideIcons.Wallet className="w-4 h-4" />
          Total Saldo
        </p>
        <h2 className="text-3xl font-bold mb-6 tracking-tight">
          {formatCurrency(summary.totalBalance)}
        </h2>
        <div className="flex gap-3">
          <div className="flex-1 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/20 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-400/30 flex items-center justify-center">
                <LucideIcons.TrendingUp className="w-4 h-4 text-green-300" />
              </div>
              <span className="text-white/70 text-xs">Pemasukan</span>
            </div>
            <p className="font-bold text-sm">
              {formatCurrency(summary.totalIncome)}
            </p>
          </div>
          <div className="flex-1 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/20 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-red-400/30 flex items-center justify-center">
                <LucideIcons.TrendingDown className="w-4 h-4 text-red-300" />
              </div>
              <span className="text-white/70 text-xs">Pengeluaran</span>
            </div>
            <p className="font-bold text-sm">
              {formatCurrency(summary.totalExpense)}
            </p>
          </div>
        </div>
      </div>
    </div>
  </FadeInUp>
);
const CategoryCard = ({ cat, index, maxAmount }) => {
  const IconComp = cat.icon;
  const percentage = maxAmount > 0 ? (cat.amount / maxAmount) * 100 : 0;
  return (
    <div className="min-w-30 snap-start bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4 text-center hover:border-slate-700 hover:bg-slate-800/60 transition-all duration-300 active:scale-95 cursor-pointer group">
      <div
        className={`w-11 h-11 ${getStableGradient(index)} rounded-xl flex items-center justify-center mx-auto mb-2.5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <IconComp className="w-5 h-5 text-white" />
      </div>
      <p className="text-xs text-slate-400 mb-1 truncate">{cat.name}</p>
      <p className="text-xs font-bold mb-2">
        {formatCurrency(cat.amount).replace("Rp", "").trim()}
      </p>
      {/* Mini progress bar */}
      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${getStableGradient(index)} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
const TransactionItem = ({ t, index }) => {
  const IconComp = getIconComponent(t.icon || t.iconName);
  const isIncome = t.type === "income";
  return (
    <FadeInUp delay={index * 60}>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-800/50 hover:border-slate-700 transition-all duration-300 active:scale-[0.98] cursor-pointer group">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
            isIncome
              ? "bg-green-500/20 ring-1 ring-green-500/30"
              : "bg-slate-800 ring-1 ring-slate-700"
          }`}
        >
          <IconComp
            className={`w-5 h-5 ${isIncome ? "text-green-400" : "text-slate-300"}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate text-sm">
            {t.description || "Transaksi"}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[11px] text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded-full">
              {t.category}
            </span>
            {t.bank_name && (
              <span className="text-[11px] text-slate-500">
                • {t.bank_name}
              </span>
            )}
          </div>
        </div>
        <div className="text-right shrink-0">
          <p
            className={`font-bold text-sm ${
              isIncome ? "text-green-400" : "text-white"
            }`}
          >
            {isIncome ? "+" : "-"}
            {formatCurrency(t.amount).replace("Rp", "").trim()}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {new Date(t.date).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </FadeInUp>
  );
};
const EmptyState = ({ icon: Icon, title, subtitle }) => (
  <div className="flex flex-col items-center justify-center py-12 px-6">
    <div className="w-16 h-16 rounded-2xl bg-slate-800/60 flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-slate-600" />
    </div>
    <p className="text-slate-400 font-medium mb-1">{title}</p>
    <p className="text-slate-600 text-sm text-center">{subtitle}</p>
  </div>
);
// ─── Main Component ─────────────────────────────────────────────────────────
const Homes = () => {
  const fullname = "Budi Prayoga";
  const greeting = useMemo(() => getGreeting(), []);
  const [activeTab, setActiveTab] = useState("home");
  const [showAddModal, setShowAddModal] = useState(false);
  const [txType, setTxType] = useState("expense");
  const [selectedBank, setSelectedBank] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showAllTx, setShowAllTx] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesOriginal, setCategoriesOriginal] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });
  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/transactions/${selectedBank}`);
      const data = response.data.data;
      setSummary(data.summary);
      setBankList(data.bank);
      setCategoriesOriginal(data.expensesByCategory || []);
      const categoriesWithIcons = (data.expensesByCategory || []).map(
        (cat, index) => ({
          name: cat.category,
          amount: cat.amount,
          icon: getIconComponent(cat.icon),
          colorIndex: index,
        }),
      );
      setCategories(categoriesWithIcons);
      setTransactions(data.transactions || []);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedBank]);
  useEffect(() => {
    getData();
  }, [getData]);
  const maxCategoryAmount = useMemo(
    () => Math.max(...categories.map((c) => c.amount), 1),
    [categories],
  );
  const displayedTransactions = showAllTx
    ? transactions
    : transactions.slice(0, 8);
  const groupedTransactions = useMemo(
    () => groupTransactionsByDate(displayedTransactions),
    [displayedTransactions],
  );
  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
    setShowAllTx(false);
  };
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-violet-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-75 h-75 bg-fuchsia-500/5 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-md mx-auto pb-28">
        {/* Header */}
        <div className="px-6 pt-8 pb-2">
          <FadeInUp delay={0}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-slate-400 text-sm">
                  {greeting.text} {greeting.emoji}
                </p>
                <h1 className="text-xl font-bold tracking-tight">{fullname}</h1>
              </div>
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-violet-500/25 ring-2 ring-violet-400/20">
                {fullname.charAt(0).toUpperCase()}
              </div>
            </div>
          </FadeInUp>
          {/* Bank selector */}
          {bankList.length > 0 && (
            <FadeInUp delay={50}>
              <div className="mb-5 relative">
                <select
                  value={selectedBank}
                  onChange={handleBankChange}
                  className="w-full appearance-none bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-2xl px-4 py-3.5 pr-10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 hover:border-slate-700"
                >
                  {bankList.map((bank) => (
                    <option
                      key={bank.id}
                      value={bank.id}
                      className="bg-slate-900"
                    >
                      {bank.name === "all"
                        ? "🏦 Semua Akun Bank"
                        : `💳 ${bank.name}`}
                    </option>
                  ))}
                </select>
                <LucideIcons.ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </FadeInUp>
          )}
          {/* Balance card */}
          {loading ? (
            <BalanceCardSkeleton />
          ) : (
            <BalanceCard summary={summary} />
          )}
        </div>
        {/* Expense categories - horizontal scroll */}
        <div className="py-5">
          <FadeInUp delay={200}>
            <div className="flex items-center justify-between mb-3 px-6">
              <h3 className="font-semibold text-sm">Kategori Pengeluaran</h3>
              {categories.length > 0 && (
                <span className="text-xs text-slate-500">
                  {categories.length} kategori
                </span>
              )}
            </div>
          </FadeInUp>
          {loading ? (
            <CategorySkeleton />
          ) : categories.length === 0 ? (
            <EmptyState
              icon={LucideIcons.PieChart}
              title="Belum ada pengeluaran"
              subtitle="Kategori pengeluaran akan muncul di sini"
            />
          ) : (
            <FadeInUp delay={250}>
              <div className="flex gap-3 overflow-x-auto px-6 pb-2 snap-x snap-mandatory scrollbar-hide">
                {categories.map((cat, i) => (
                  <CategoryCard
                    key={i}
                    cat={cat}
                    index={i}
                    maxAmount={maxCategoryAmount}
                  />
                ))}
              </div>
            </FadeInUp>
          )}
        </div>
        {/* Transactions */}
        <div className="px-6 py-2">
          <FadeInUp delay={300}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Transaksi Terbaru</h3>
              {transactions.length > 8 && (
                <button
                  onClick={() => setShowAllTx(!showAllTx)}
                  className="text-xs text-violet-400 hover:text-violet-300 transition-colors duration-200 flex items-center gap-1"
                >
                  {showAllTx ? "Sembunyikan" : "Lihat Semua"}
                  <LucideIcons.ChevronRight
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${showAllTx ? "rotate-90" : ""}`}
                  />
                </button>
              )}
            </div>
          </FadeInUp>
          {loading ? (
            <TransactionSkeleton />
          ) : transactions.length === 0 ? (
            <EmptyState
              icon={LucideIcons.Receipt}
              title="Belum ada transaksi"
              subtitle="Tambahkan transaksi pertamamu dengan tombol + di bawah"
            />
          ) : (
            <div className="space-y-5">
              {groupedTransactions.map(([dateLabel, txs], groupIdx) => (
                <div key={dateLabel}>
                  <FadeInUp delay={350 + groupIdx * 40}>
                    <p className="text-xs text-slate-500 font-medium mb-2.5 px-1">
                      {dateLabel}
                    </p>
                  </FadeInUp>
                  <div className="space-y-2.5">
                    {txs.map((t, i) => (
                      <TransactionItem
                        key={t.id}
                        t={t}
                        index={groupIdx * 3 + i}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Modal */}
      {showAddModal && (
        <ModalTransactions
          setShowAddModal={setShowAddModal}
          txType={txType}
          setTxType={setTxType}
          categories={categoriesOriginal}
          banks={bankList}
          getData={getData}
        />
      )}
      <Nav
        setActiveTab={setActiveTab}
        setShowAddModal={setShowAddModal}
        activeTab={activeTab}
      />
      {/* Keyframe animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
export default Homes;
