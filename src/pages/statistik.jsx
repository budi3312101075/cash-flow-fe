import React, { useState, useEffect } from "react";
import { ModalTransactions } from "../components/atoms/modal";
import Nav from "../components/moleculs/nav";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { Wallet, ArrowUpCircle, ArrowDownCircle, Info } from "lucide-react";

const Statistik = () => {
  const fullname = "Budi Prayoga";
  const [activeTab, setActiveTab] = useState("stats");
  const [showAddModal, setShowAddModal] = useState(false);
  const [txType, setTxType] = useState("expense");
  const [selectedBank, setSelectedBank] = useState("all");

  // States untuk data API
  const [bankList, setBankList] = useState([]);
  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });
  const [expensesByCategory, setExpensesByCategory] = useState([]);
  const [categoriesOriginal, setCategoriesOriginal] = useState([]);

  const COLORS = [
    "#8b5cf6",
    "#d946ef",
    "#ec4899",
    "#f43f5e",
    "#f59e0b",
    "#10b981",
  ];

  const getData = async () => {
    try {
      const response = await axios.get(`/transactions/${selectedBank}`);
      const resData = response.data.data;

      setBankList(resData.bank);
      setSummary(resData.summary);
      setExpensesByCategory(resData.expensesByCategory);
      setCategoriesOriginal(resData.category);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedBank]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden pb-24">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[30%] bg-violet-600/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-md mx-auto px-6 pt-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
              Statistik Keuangan
            </p>
            <h1 className="text-xl font-bold italic tracking-tight">
              Overview Dashboard
            </h1>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-black shadow-lg shadow-violet-500/20">
            {fullname.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Bank Selector */}
        <div className="mb-8 relative">
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full appearance-none bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-2xl px-4 py-3.5 pr-10 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all cursor-pointer"
          >
            {bankList.map((bank) => (
              <option key={bank.id} value={bank.id} className="bg-slate-900">
                {bank.name === "all" ? "🏦 Semua Akun Bank" : `💳 ${bank.name}`}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <Info size={16} />
          </div>
        </div>

        {/* Summary Balance Card */}
        <div className="bg-linear-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-[2.5rem] p-6 mb-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wallet size={80} />
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase mb-1">
            Total Saldo Saat Ini
          </p>
          <h2 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-white to-slate-400">
            {formatCurrency(summary.totalBalance)}
          </h2>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3">
              <div className="flex items-center gap-2 mb-1 text-emerald-400">
                <ArrowUpCircle size={14} />
                <span className="text-[10px] font-bold uppercase">Income</span>
              </div>
              <p className="text-sm font-bold">
                {formatCurrency(summary.totalIncome)}
              </p>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-3">
              <div className="flex items-center gap-2 mb-1 text-rose-400">
                <ArrowDownCircle size={14} />
                <span className="text-[10px] font-bold uppercase">Expense</span>
              </div>
              <p className="text-sm font-bold">
                {formatCurrency(summary.totalExpense)}
              </p>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-[2.5rem] p-6 mb-6">
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-violet-500 rounded-full" />
            Pengeluaran per Kategori
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="amount"
                  nameKey="category"
                  stroke="none"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      cornerRadius={8}
                    />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderRadius: "16px",
                    border: "1px solid #1e293b",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend / Category List */}
          <div className="space-y-4 mt-2">
            {expensesByCategory.map((item, index) => (
              <div key={index} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-semibold text-slate-300">
                      {item.category}
                    </span>
                  </div>
                  <span className="font-bold">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${(item.amount / summary.totalExpense) * 100}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals & Nav */}
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
    </div>
  );
};

export default Statistik;
