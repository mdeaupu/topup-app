"use client";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

const MobileLegends: NextPage = () => {
  // State for form inputs
  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [selectedDiamond, setSelectedDiamond] = useState<{
    amount: number;
    price: string;
  } | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({
    userId: "",
    zoneId: "",
    diamond: "",
    payment: "",
  });

  // Diamond options
  const diamondOptions = [
    { amount: 3, price: "Rp 1.171" },
    { amount: 5, price: "Rp 1.423" },
    { amount: 12, price: "Rp 3.232" },
    { amount: 19, price: "Rp 5.223" },
    { amount: 28, price: "Rp 7.600" },
    { amount: 44, price: "Rp 11.400" },
    { amount: 59, price: "Rp 15.200" },
    { amount: 85, price: "Rp 21.150" },
  ];

  // Payment methods
  const paymentMethods = [
    { name: "QRIS", image: "/qris.png" },
    { name: "DANA", image: "/dana.png" },
    { name: "GOPAY", image: "/gopay.png" },
    { name: "OVO", image: "/ovo.png" },
  ];

  // Validate form
  const validateForm = () => {
    const newErrors = {
      userId: "",
      zoneId: "",
      diamond: "",
      payment: "",
    };

    let isValid = true;

    if (!userId.trim()) {
      newErrors.userId = "User ID harus diisi";
      isValid = false;
    } else if (!/^\d+$/.test(userId)) {
      newErrors.userId = "User ID harus berupa angka";
      isValid = false;
    }

    if (!zoneId.trim()) {
      newErrors.zoneId = "Zona ID harus diisi";
      isValid = false;
    } else if (!/^\d+$/.test(zoneId)) {
      newErrors.zoneId = "Zona ID harus berupa angka";
      isValid = false;
    }

    if (!selectedDiamond) {
      newErrors.diamond = "Pilih nominal top up";
      isValid = false;
    }

    if (!selectedPayment) {
      newErrors.payment = "Pilih metode pembayaran";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle buy now button click
  const handleBuyNow = () => {
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  // Handle payment confirmation
  const handleConfirmPayment = () => {
    // Here you would typically send the data to your backend
    console.log({
      userId,
      zoneId,
      diamond: selectedDiamond,
      payment: selectedPayment,
    });
    // Reset form after payment
    setUserId("");
    setZoneId("");
    setSelectedDiamond(null);
    setSelectedPayment(null);
    setShowConfirmation(false);

    // Tampilkan popup sukses
    setShowSuccess(true);
  };

  return (
    <div className="bg-[#333330]">
      {/* Top Section */}
      <div className="py-14 pl-0 pr-0 lg:pr-0">
        <div className="flex flex-col lg:flex-row gap-0 max-w-full ml-0 mr-0">
          {/* Hero Image Left - Flush to left edge */}
          <div className="relative w-full lg:w-[400px] aspect-square bg-[#4578a7] border-4 border-black">
            <Image
              src="/hayabusa.png"
              alt="Hayabusa"
              className="object-cover"
              fill
              priority
            />
          </div>

          {/* Content Right - Expanded width */}
          <div className="flex-1 text-white px-4 lg:px-8">
            {/* User ID Input */}
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
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Zona ID"
                        className={`w-full bg-white text-black rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.zoneId ? "border-2 border-red-500" : ""
                        }`}
                        value={zoneId}
                        onChange={(e) => setZoneId(e.target.value)}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                        ()
                      </div>
                      {errors.zoneId && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.zoneId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    Untuk mengetahui User ID Anda, silakan klik menu profile
                    dibagian kiri atas pada menu utama game. User ID akan
                    terlihat dibagian bawah Nama Karakter Game Anda. Silakan
                    masukkan User ID Anda untuk menyelesaikan transaksi. Contoh
                    : 12345678(1234).
                  </p>
                </div>
              </div>
            </div>

            {/* Diamond Selection */}
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
                      {item.amount} Diamonds
                    </span>
                    <Image
                      src="/diamond.png"
                      alt="Diamond"
                      width={24}
                      height={24}
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

      {/* Bottom Section */}
      <div className="pl-0 pr-0 lg:pr-0">
        <div className="flex flex-col lg:flex-row gap-0 max-w-full ml-0 mr-0">
          {/* Hero Image Left - Flush to left edge */}
          <div className="relative w-full lg:w-[400px] aspect-square bg-[#4578a7] border-4 border-black">
            <Image
              src="/granger.png"
              alt="Granger"
              className="object-cover"
              fill
            />
          </div>

          {/* Content Right - Expanded width */}
          <div className="flex-1 text-white px-4 lg:px-8">
            {/* Payment Methods */}
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

            {/* Buy Button */}
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

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#4578a7] border-4 border-black rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Konfirmasi Pembayaran
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-white">User ID:</span>
                <span className="font-bold text-white">
                  {userId}({zoneId})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Nominal Top Up:</span>
                <span className="font-bold text-white">
                  {selectedDiamond?.amount} Diamonds
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

export default MobileLegends;
