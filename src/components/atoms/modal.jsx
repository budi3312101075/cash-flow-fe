import React from "react";
import { X } from "lucide-react";

export const ModalTransactions = ({
  setShowAddModal,
  txType,
  setTxType,
  categories,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end">
      <div className="bg-slate-900 w-full max-w-md mx-auto rounded-t-3xl p-6 animate-slide-up mb-16">
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
            <label className="text-sm text-slate-400 mb-2 block">Jumlah</label>
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
  );
};
