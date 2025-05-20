"use client";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

const ArenaBreakout: NextPage = () => {
  // State untuk form
  const [userId, setUserId] = useState("");
  const [selectedDiamond, setSelectedDiamond] = useState<{
    amount: number;
    price: string;
  } | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({
    userId: "",
    diamond: "",
    payment: "",
  });

  // Daftar diamond
  const diamondOptions = [
    { amount: 60, price: "Rp 12.000" },
    { amount: 310, price: "Rp 64.000" },
    { amount: 630, price: "Rp 128.000" },
    { amount: 1500, price: "Rp 311.000" },
    { amount: 3200, price: "Rp 623.000" },
    { amount: 6500, price: "Rp 1.247.000" },
  ];

  // Metode pembayaran
  const paymentMethods = [
    { name: "QRIS", image: "/qris.png" },
    { name: "DANA", image: "/dana.png" },
    { name: "GOPAY", image: "/gopay.png" },
    { name: "OVO", image: "/ovo.png" },
  ];

  // Validasi form
  const validateForm = () => {
    const newErrors = {
      userId: "",
      diamond: "",
      payment: "",
    };

    let isValid = true;

    // Validasi User ID
    if (!userId.trim()) {
      newErrors.userId = "User ID harus diisi";
      isValid = false;
    } else if (!/^\d+$/.test(userId)) {
      newErrors.userId = "User ID harus berupa angka";
      isValid = false;
    } else if (userId.length < 8 || userId.length > 12) {
      newErrors.userId = "User ID harus 8-12 digit";
      isValid = false;
    }

    // Validasi Diamond
    if (!selectedDiamond) {
      newErrors.diamond = "Pilih nominal top up";
      isValid = false;
    }

    // Validasi Pembayaran
    if (!selectedPayment) {
      newErrors.payment = "Pilih metode pembayaran";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle tombol Beli Sekarang
  const handleBuyNow = () => {
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  // Handle konfirmasi pembayaran
  const handleConfirmPayment = () => {
    // Proses pembayaran disini
    console.log({
      userId,
      diamond: selectedDiamond,
      payment: selectedPayment,
    });

    // Reset form
    setUserId("");
    setSelectedDiamond(null);
    setSelectedPayment(null);
    setShowConfirmation(false);

    // Tampilkan popup sukses
    setShowSuccess(true);
  };

  return (
    <div className="bg-[#333330]">
      {/* Bagian Atas */}
      <div className="py-14 pl-0 pr-0 lg:pr-0">
        <div className="flex flex-col lg:flex-row gap-0 max-w-full ml-0 mr-0">
          {/* Gambar Hero Kiri */}
          <div className="relative w-full lg:w-[400px] aspect-square bg-[#4578a7] border-4 border-black">
            <Image
              src="/ab-3.jpg"
              alt="Arena Breakout Character"
              className="object-cover"
              fill
              priority
            />
          </div>

          {/* Konten Kanan */}
          <div className="flex-1 text-white px-4 lg:px-8">
            {/* Input User ID */}
            <div className="mb-8 p-6 bg-[#4578a7] border-4 border-black rounded-lg">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-4">
                    Masukkan User ID
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Masukkan User ID"
                        className={`w-full bg-white text-black rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.userId ? "border-2 border-red-500" : ""
                        }`}
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      />
                      {errors.userId && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.userId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    Untuk menemukan ID Anda, klik pada ikon karakter. User ID
                    tercantum di bawah nama karakter Anda. Contoh: 5363266446
                  </p>
                </div>
              </div>
            </div>

            {/* Pilihan Diamond */}
            <div className="p-6 bg-[#4578a7] border-4 border-black rounded-lg">
              <h2 className="text-xl font-semibold mb-6">
                Pilih Nominal Top Up
              </h2>
              {errors.diamond && (
                <p className="text-red-500 text-sm mb-2">{errors.diamond}</p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {diamondOptions.map((item) => (
                  <button
                    key={item.amount}
                    className={`bg-white text-black rounded-md py-3 px-2 flex flex-col items-center justify-center hover:bg-gray-200 transition-colors focus:outline-none focus:ring-5 focus:ring-blue-500 ${
                      selectedDiamond?.amount === item.amount
                        ? "ring-5 ring-yellow-500"
                        : ""
                    }`}
                    onClick={() => setSelectedDiamond(item)}
                  >
                    <span className="text-sm font-bold mb-1">
                      {item.amount} Bonds
                    </span>
                    <Image
                      src="/diamond-ab.png"
                      alt="Diamond"
                      width={53}
                      height={53}
                      className="my-1"
                    />
                    <span className="text-xs text-black bg-yellow-500 font-semibold mt-1 rounded-full px-2 py-1">
                      {item.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Bawah */}
      <div className="pl-0 pr-0 lg:pr-0">
        <div className="flex flex-col lg:flex-row gap-0 max-w-full ml-0 mr-0">
          {/* Gambar Hero Kiri */}
          <div className="relative w-full lg:w-[400px] aspect-square bg-[#4578a7] border-4 border-black">
            <Image
              src="/ab-2.jpg"
              alt="Arena Breakout Character"
              className="object-cover"
              fill
            />
          </div>

          {/* Konten Kanan */}
          <div className="flex-1 text-white px-4 lg:px-8">
            {/* Metode Pembayaran */}
            <div className="mb-8 p-6 bg-[#4578a7] border-4 border-black rounded-lg">
              <h2 className="text-xl font-semibold mb-6">
                Pilih Metode Pembayaran
              </h2>
              {errors.payment && (
                <p className="text-red-500 text-sm mb-2">{errors.payment}</p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.name}
                    className={`bg-white rounded-md p-4 aspect-video flex items-center justify-center hover:bg-gray-200 transition-colors focus:outline-none focus:ring-5 focus:ring-blue-500 ${
                      selectedPayment === method.name
                        ? "ring-5 ring-yellow-500"
                        : ""
                    }`}
                    onClick={() => setSelectedPayment(method.name)}
                  >
                    <Image
                      src={method.image}
                      alt={method.name}
                      width={120}
                      height={60}
                      className="object-contain max-h-12"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tombol Beli */}
            <div className="p-6 bg-[#4578a7] border-4 border-black rounded-lg">
              <button
                className="w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded-md hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
                onClick={handleBuyNow}
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Konfirmasi */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#4578a7] border-4 border-black rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Konfirmasi Pembelian
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-white">User ID:</span>
                <span className="font-bold text-white">{userId}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white">Jumlah Bonds:</span>
                <span className="font-bold text-white">
                  {selectedDiamond?.amount} Bonds
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white">Harga:</span>
                <span className="font-bold text-white">
                  {selectedDiamond?.price}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white">Metode Pembayaran:</span>
                <span className="font-bold text-white">{selectedPayment}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className="flex-1 bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                onClick={() => setShowConfirmation(false)}
              >
                Kembali
              </button>
              <button
                className="flex-1 bg-yellow-500 text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
                onClick={handleConfirmPayment}
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-black mb-2">Pembayaran</h2>
              <p className="text-2xl font-bold text-black mb-2">anda telah</p>
              <p className="text-2xl font-bold text-black mb-2">berhasil :)</p>
            </div>
            <button
              className="w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded-md hover:bg-yellow-600 transition-colors"
              onClick={() => setShowSuccess(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArenaBreakout;
