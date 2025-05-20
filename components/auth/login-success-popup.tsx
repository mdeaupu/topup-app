// components/auth/login-success-popup.tsx
"use client";

import { useEffect } from "react";

export const LoginSuccessPopup = () => {
  useEffect(() => {
    // Ini akan dijalankan sekali setelah komponen di-mount
    const timer = setTimeout(() => {
      const popup = document.getElementById("login-success-popup");
      if (popup) {
        popup.classList.remove("opacity-0");
        popup.classList.add("opacity-100");

        // Set timeout untuk hide popup setelah 3 detik
        setTimeout(() => {
          popup.classList.remove("opacity-100");
          popup.classList.add("opacity-0");
        }, 1000);
      }
    }, 100); // Delay kecil untuk memastikan animasi berjalan

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="login-success-popup"
      className="fixed top-4 right-4 z-50 opacity-0 transition-opacity duration-300"
    >
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span>Login successful! Redirecting...</span>
        </div>
      </div>
    </div>
  );
};
