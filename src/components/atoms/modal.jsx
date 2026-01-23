import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import * as LucideIcons from "lucide-react";

// Fungsi untuk convert string icon ke component
const getIconComponent = (iconName) => {
  if (!iconName || typeof iconName !== "string") {
    return LucideIcons.ShoppingBag;
  }
  const IconComponent = LucideIcons[iconName];
  return IconComponent || LucideIcons.ShoppingBag;
};

export const ModalTransactions = ({
  setShowAddModal,
  txType,
  setTxType,
  banks,
  getData,
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [idCategory, setIdCategory] = useState("");
  const [idBank, setIdBank] = useState("");

  const category = async () => {
    try {
      const response = await axios.get(`/category`);
      const categoriesWithIcons = (response.data.data || []).map((cat) => ({
        id: cat.id,
        name: cat.name,
        icon: getIconComponent(cat.icon),
      }));
      setCategories(categoriesWithIcons);
    } catch (err) {
      console.error("Error fetching categories:", err);
      alert("Gagal get category");
    }
  };

  useEffect(() => {
    category();
  }, []);

  const handleSubmit = async () => {
    if (!amount || !description || !idCategory || !idBank) {
      alert("Mohon lengkapi semua field!");
      return;
    }

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

      alert("Transaksi berhasil ditambahkan");
      getData();
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
          {/* BANK SELECT */}
          {banks && (
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Bank</label>

              <div className="relative">
                <select
                  value={idBank}
                  onChange={(e) => setIdBank(e.target.value)}
                  className="w-full appearance-none bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                >
                  <option value="" className="bg-slate-900">
                    -- Pilih Bank --
                  </option>

                  {banks
                    .filter((b) => b.name?.toLowerCase() !== "all")
                    .map((b) => (
                      <option key={b.id} value={b.id} className="bg-slate-900">
                        {b.name}
                      </option>
                    ))}
                </select>

                <svg
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}

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

            {categories.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">
                Memuat kategori...
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {categories.map((cat, i) => {
                  const IconComp = cat.icon;

                  return (
                    <button
                      key={cat.id || i}
                      onClick={() => setIdCategory(cat.id)}
                      className={`border rounded-xl p-3 flex flex-col items-center gap-1 transition-all
                        ${
                          idCategory === cat.id
                            ? "border-violet-500 bg-slate-700"
                            : "bg-slate-800 border-slate-700"
                        }
                      `}
                    >
                      <IconComp className="w-5 h-5" />
                      <span className="text-xs">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

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
