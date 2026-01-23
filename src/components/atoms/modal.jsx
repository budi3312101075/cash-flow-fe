import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

export const ModalTransactions = ({
  setShowAddModal,
  txType,
  setTxType,
  categories,
  banks, // optional kalau ada list bank
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [idBank, setIdBank] = useState("");

  const handleSubmit = async () => {
    try {
      const payload = {
        type: txType,
        amount: Number(amount),
        description,
        idCategory,
        idBank,
      };

      const res = await axios.post("/transactions", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Success:", res.data);
      alert("Transaksi berhasil ditambahkan");

      setShowAddModal(false);
    } catch (err) {
      console.error(err);
      alert("Gagal tambah transaksi");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end">
      <div className="bg-slate-900 w-full max-w-md mx-auto rounded-t-3xl p-6 animate-slide-up mb-16">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Tambah Transaksi</h3>
          <button
            onClick={() => setShowAddModal(false)}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* TYPE */}
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
          {/* AMOUNT */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Jumlah</label>
            <input
              type="number"
              placeholder="500000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xl font-bold focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* DESC */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Deskripsi
            </label>
            <input
              type="text"
              placeholder="Contoh: BBM"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Kategori
            </label>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setIdCategory(cat.id)}
                  className={`border rounded-xl p-3 flex flex-col items-center gap-1 transition-all
                    ${
                      idCategory === cat.id
                        ? "border-violet-500 bg-slate-700"
                        : "bg-slate-800 border-slate-700"
                    }
                  `}
                >
                  <cat.icon className="w-5 h-5" />
                  <span className="text-xs">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* BANK SELECT (optional) */}
          {banks && (
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Bank</label>
              <select
                value={idBank}
                onChange={(e) => setIdBank(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
              >
                <option value="">-- Pilih Bank --</option>
                {banks.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* SAVE BUTTON */}
          <button
            onClick={handleSubmit}
            className="w-full bg-linear-to-r from-violet-600 to-fuchsia-600 py-4 rounded-xl font-bold mt-4 hover:opacity-90 transition-all"
          >
            Simpan Transaksi
          </button>
        </div>
      </div>
    </div>
  );
};
