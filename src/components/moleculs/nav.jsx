import React from "react";
import {
  Calendar,
  PieChart,
  PlusCircle,
  TrendingUp,
  Wallet,
} from "lucide-react";

const Nav = ({ setActiveTab, setShowAddModal, activeTab }) => {
  return (
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
  );
};

export default Nav;
