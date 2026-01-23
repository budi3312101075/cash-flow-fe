import React, { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import { formatCurrency } from "../../utils/index";
import Nav from "../components/moleculs/nav";
import { ModalTransactions } from "../components/atoms/modal";
import axios from "axios";

const getIconComponent = (iconName) => {
  if (!iconName || typeof iconName !== "string") {
    return LucideIcons.ShoppingBag;
  }
  const IconComponent = LucideIcons[iconName];

  return IconComponent || LucideIcons.ShoppingBag;
};

const tailwindColors = [
  "bg-violet-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-yellow-500",
];

const getRandomUniqueColors = (count) => {
  const shuffled = tailwindColors.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Homes = () => {
  const fullname = "Budi Prayoga";

  const [activeTab, setActiveTab] = useState("home");
  const [showAddModal, setShowAddModal] = useState(false);
  const [txType, setTxType] = useState("expense");
  const [bank, setBank] = useState("all");

  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });

  const getData = async () => {
    try {
      const response = await axios.get(`/transactions/${bank}`);
      const data = response.data.data;

      setSummary(data.summary);

      const rawCategories = data.expensesByCategory;
      const randomColors = getRandomUniqueColors(rawCategories.length);

      const mappedCategories = rawCategories.map((c, i) => {
        return {
          name: c.category,
          amount: c.amount,
          icon: getIconComponent(c.icon || c.iconName),
          color: randomColors[i],
        };
      });

      setCategories(mappedCategories);
      setTransactions(data.transactions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [bank]);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className="relative z-10 max-w-md mx-auto pb-24">
        {/* Header */}
        <div className="px-6 pt-8 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-slate-400 text-sm">Hellow Mas bro 👋</p>
              <h1 className="text-xl font-bold">{fullname}</h1>
            </div>
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-lg font-bold">
              {fullname.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Balance Card */}
          <div className="bg-linear-to-br from-violet-600 via-fuchsia-600 to-pink-500 rounded-3xl p-6 shadow-2xl">
            <p className="text-white/70 text-sm mb-1">Total Saldo</p>
            <h2 className="text-3xl font-bold mb-6">
              {formatCurrency(summary.totalBalance)}
            </h2>

            <div className="flex gap-4">
              <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-400/30 flex items-center justify-center">
                    <LucideIcons.ArrowDownLeft className="w-4 h-4 text-green-300" />
                  </div>
                  <span className="text-white/70 text-xs">Pemasukan</span>
                </div>
                <p className="font-bold">
                  {formatCurrency(summary.totalIncome)}
                </p>
              </div>

              <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-red-400/30 flex items-center justify-center">
                    <LucideIcons.ArrowUpRight className="w-4 h-4 text-red-300" />
                  </div>
                  <span className="text-white/70 text-xs">Pengeluaran</span>
                </div>
                <p className="font-bold">
                  {formatCurrency(summary.totalExpense)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Kategori Pengeluaran</h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {categories.slice(0, 6).map((cat, i) => {
              const IconComp = cat.icon;

              return (
                <div
                  key={i}
                  className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-3 text-center"
                >
                  <div
                    className={`w-10 h-10 ${cat.color} rounded-xl flex items-center justify-center mx-auto mb-2`}
                  >
                    <IconComp className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs text-slate-400 mb-1">{cat.name}</p>
                  <p className="text-xs font-semibold">
                    {formatCurrency(cat.amount).replace("Rp", "")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transactions */}
        <div className="px-6 py-4">
          <h3 className="font-semibold mb-4">Transaksi Terbaru</h3>

          <div className="space-y-3">
            {transactions.slice(0, 5).map((t) => {
              const IconComp = getIconComponent(t.icon || t.iconName);

              return (
                <div
                  key={t.id}
                  className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 flex items-center gap-4"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      t.type === "income" ? "bg-green-500/20" : "bg-slate-700"
                    }`}
                  >
                    <IconComp
                      className={`w-5 h-5 ${
                        t.type === "income"
                          ? "text-green-400"
                          : "text-slate-300"
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {t.description || "Transaksi"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {t.category} •{" "}
                      {new Date(t.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>

                  <p
                    className={`font-semibold ${
                      t.type === "income" ? "text-green-400" : "text-slate-200"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {formatCurrency(t.amount).replace("Rp", "")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showAddModal && (
        <ModalTransactions
          setShowAddModal={setShowAddModal}
          txType={txType}
          setTxType={setTxType}
          categories={categories}
          banks={bank}
        />
      )}

      <Nav
        setActiveTab={setActiveTab}
        setShowAddModal={setShowAddModal}
        activeTab={activeTab}
      />
    </div>
  );
};

export default Homes;
