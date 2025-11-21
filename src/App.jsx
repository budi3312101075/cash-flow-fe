import React from "react";
import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PlusCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Coffee,
  ShoppingBag,
  Home,
  Car,
  Utensils,
  Briefcase,
  Gift,
  Wifi,
  X,
  ChevronRight,
  PieChart,
  Calendar,
} from "lucide-react";

const dummyTransactions = [
  {
    id: 1,
    type: "income",
    category: "Gaji",
    amount: 12000000,
    date: "2025-01-01",
    icon: Briefcase,
    desc: "Gaji Bulanan",
  },
  {
    id: 2,
    type: "expense",
    category: "Makanan",
    amount: 150000,
    date: "2025-01-02",
    icon: Utensils,
    desc: "Makan Siang",
  },
  {
    id: 3,
    type: "expense",
    category: "Transportasi",
    amount: 50000,
    date: "2025-01-02",
    icon: Car,
    desc: "Grab ke Kantor",
  },
  {
    id: 4,
    type: "expense",
    category: "Belanja",
    amount: 890000,
    date: "2025-01-03",
    icon: ShoppingBag,
    desc: "Groceries Bulanan",
  },
  {
    id: 5,
    type: "income",
    category: "Freelance",
    amount: 2500000,
    date: "2025-01-04",
    icon: Briefcase,
    desc: "Project Website",
  },
  {
    id: 6,
    type: "expense",
    category: "Kopi",
    amount: 75000,
    date: "2025-01-05",
    icon: Coffee,
    desc: "Starbucks",
  },
  {
    id: 7,
    type: "expense",
    category: "Tagihan",
    amount: 350000,
    date: "2025-01-05",
    icon: Wifi,
    desc: "Internet Bulanan",
  },
  {
    id: 8,
    type: "expense",
    category: "Rumah",
    amount: 3500000,
    date: "2025-01-06",
    icon: Home,
    desc: "Sewa Kos",
  },
  {
    id: 9,
    type: "income",
    category: "Hadiah",
    amount: 500000,
    date: "2025-01-07",
    icon: Gift,
    desc: "THR dari Keluarga",
  },
  {
    id: 10,
    type: "expense",
    category: "Makanan",
    amount: 250000,
    date: "2025-01-08",
    icon: Utensils,
    desc: "Dinner Date",
  },
];

const fullname = "Budi Prayoga";

const categories = [
  { name: "Makanan", icon: Utensils, color: "bg-orange-500", amount: 400000 },
  { name: "Transportasi", icon: Car, color: "bg-blue-500", amount: 50000 },
  { name: "Belanja", icon: ShoppingBag, color: "bg-pink-500", amount: 890000 },
  { name: "Tagihan", icon: Wifi, color: "bg-purple-500", amount: 350000 },
  { name: "Rumah", icon: Home, color: "bg-green-500", amount: 3500000 },
  { name: "Kopi", icon: Coffee, color: "bg-amber-600", amount: 75000 },
];

export default function CashFlowApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [showAddModal, setShowAddModal] = useState(false);
  const [txType, setTxType] = useState("expense");

  const totalIncome = 150000000;
  const totalExpense = 5265000;
  const balance = totalIncome - totalExpense;

  const formatCurrency = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* linear Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-linear-to-br from-violet-600/30 via-fuchsia-500/20 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-md mx-auto pb-24">
        {/* Header */}
        <div className="px-6 pt-8 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-slate-400 text-sm">Hellow Mas bro 👋</p>
              <h1 className="text-xl font-bold"> {fullname}</h1>
            </div>
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-lg font-bold">
              {fullname?.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Balance Card */}
          <div className="bg-linear-to-br from-violet-600 via-fuchsia-600 to-pink-500 rounded-3xl p-6 shadow-2xl shadow-violet-500/20">
            <p className="text-white/70 text-sm mb-1">Total Saldo</p>
            <h2 className="text-3xl font-bold mb-6">
              {formatCurrency(balance)}
            </h2>

            <div className="flex gap-4">
              <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-400/30 flex items-center justify-center">
                    <ArrowDownLeft className="w-4 h-4 text-green-300" />
                  </div>
                  <span className="text-white/70 text-xs">Pemasukan</span>
                </div>
                <p className="font-bold">{formatCurrency(totalIncome)}</p>
              </div>
              <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-red-400/30 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-red-300" />
                  </div>
                  <span className="text-white/70 text-xs">Pengeluaran</span>
                </div>
                <p className="font-bold">{formatCurrency(totalExpense)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Kategori Pengeluaran</h3>
            <button className="text-violet-400 text-sm flex items-center gap-1">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {categories.slice(0, 6).map((cat, i) => (
              <div
                key={i}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-3 text-center hover:border-violet-500/50 transition-all cursor-pointer"
              >
                <div
                  className={`w-10 h-10 ${cat.color} rounded-xl flex items-center justify-center mx-auto mb-2`}
                >
                  <cat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs text-slate-400 mb-1">{cat.name}</p>
                <p className="text-xs font-semibold">
                  {formatCurrency(cat.amount).replace("Rp", "")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Transaksi Terbaru</h3>
            <button className="text-violet-400 text-sm flex items-center gap-1">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {dummyTransactions.slice(0, 5).map((tx) => (
              <div
                key={tx.id}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:border-violet-500/50 transition-all cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    tx.type === "income" ? "bg-green-500/20" : "bg-slate-700"
                  }`}
                >
                  <tx.icon
                    className={`w-5 h-5 ${
                      tx.type === "income" ? "text-green-400" : "text-slate-300"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{tx.desc}</p>
                  <p className="text-xs text-slate-400">
                    {tx.category} •{" "}
                    {new Date(tx.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
                <p
                  className={`font-semibold ${
                    tx.type === "income" ? "text-green-400" : "text-slate-200"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}
                  {formatCurrency(tx.amount).replace("Rp", "")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end">
          <div className="bg-slate-900 w-full max-w-md mx-auto rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Tambah Transaksi</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setTxType("expense")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  txType === "expense" ? "bg-red-500" : "bg-slate-800"
                }`}
              >
                Pengeluaran
              </button>
              <button
                onClick={() => setTxType("income")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  txType === "income" ? "bg-green-500" : "bg-slate-800"
                }`}
              >
                Pemasukan
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  Jumlah
                </label>
                <input
                  type="text"
                  placeholder="Rp 0"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  Deskripsi
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Makan siang"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  Kategori
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {categories.slice(0, 4).map((cat, i) => (
                    <button
                      key={i}
                      className="bg-slate-800 border border-slate-700 rounded-xl p-3 flex flex-col items-center gap-1 hover:border-violet-500 transition-all"
                    >
                      <cat.icon className="w-5 h-5" />
                      <span className="text-xs">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button className="w-full bg-linear-to-r from-violet-600 to-fuchsia-600 py-4 rounded-xl font-bold mt-4 hover:opacity-90 transition-all">
                Simpan Transaksi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 z-50">
        <div className="max-w-md mx-auto px-6 py-2 flex items-center justify-around">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 p-2 ${
              activeTab === "home" ? "text-violet-400" : "text-slate-500"
            }`}
          >
            <Wallet className="w-6 h-6" />
            <span className="text-xs">Beranda</span>
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex flex-col items-center gap-1 p-2 ${
              activeTab === "stats" ? "text-violet-400" : "text-slate-500"
            }`}
          >
            <PieChart className="w-6 h-6" />
            <span className="text-xs">Statistik</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-14 h-14 -mt-6 bg-linear-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/30"
          >
            <PlusCircle className="w-7 h-7" />
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`flex flex-col items-center gap-1 p-2 ${
              activeTab === "calendar" ? "text-violet-400" : "text-slate-500"
            }`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Kalender</span>
          </button>
          <button
            onClick={() => setActiveTab("more")}
            className={`flex flex-col items-center gap-1 p-2 ${
              activeTab === "more" ? "text-violet-400" : "text-slate-500"
            }`}
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs">Laporan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
