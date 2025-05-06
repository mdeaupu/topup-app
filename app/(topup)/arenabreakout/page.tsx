import type { NextPage } from "next";
import Image from "next/image";

const ArenaBreakout: NextPage = () => {
  return (
    <div className="bg-[#333330]">
      {/* Top Section */}
      <div className="py-14 pl-0 pr-0 lg:pr-0">
        <div className="flex flex-col lg:flex-row gap-0 max-w-full ml-0 mr-0">
          {/* Hero Image Left - Flush to left edge */}
          <div className="relative w-full lg:w-[400px] aspect-square bg-[#4578a7] border-4 border-black">
            <Image
              src="/ab-3.jpg"
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
                    <input
                      type="text"
                      placeholder="Masukkan User ID"
                      className="flex-1 bg-white text-black rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Zona ID"
                        className="w-full bg-white text-black rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                        ()
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    • Untuk mengetahui User ID Anda, silakan klik menu profile
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[
                  { amount: 3, price: "Rp 1.171" },
                  { amount: 5, price: "Rp 1.423" },
                  { amount: 12, price: "Rp 3.232" },
                  { amount: 19, price: "Rp 5.223" },
                  { amount: 28, price: "Rp 7.600" },
                  { amount: 44, price: "Rp 11.400" },
                  { amount: 59, price: "Rp 15.200" },
                  { amount: 85, price: "Rp 21.150" },
                ].map((item) => (
                  <button
                    key={item.amount}
                    className="bg-white text-black rounded-md py-3 px-2 flex flex-col items-center justify-center hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className="text-sm font-bold mb-1">
                      {item.amount} Diamonds
                    </span>
                    <Image
                      src="/diamond-ab.png"
                      alt="Diamond"
                      width={36}
                      height={36}
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
      <div className=" pl-0 pr-0 lg:pr-0">
        <div className="flex flex-col lg:flex-row gap-0 max-w-full ml-0 mr-0">
          {/* Hero Image Left - Flush to left edge */}
          <div className="relative w-full lg:w-[400px] aspect-square bg-[#4578a7] border-4 border-black">
            <Image
              src="/ab-2.jpg"
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: "QRIS", image: "/qris.png" },
                  { name: "DANA", image: "/dana.png" },
                  { name: "GOPAY", image: "/gopay.png" },
                  { name: "OVO", image: "/ovo.png" },
                ].map((method) => (
                  <button
                    key={method.name}
                    className="bg-white rounded-md p-4 aspect-video flex items-center justify-center hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <button className="w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded-md hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArenaBreakout;
