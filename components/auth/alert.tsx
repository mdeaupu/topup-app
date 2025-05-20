"use client";

import { useEffect, useState } from "react";

interface PopupProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  onClose?: () => void;
  showIcon?: boolean;
  autoClose?: boolean;
}

export function Popup({
  message,
  type = "success",
  duration = 3000,
  position = "top-right",
  onClose,
  showIcon = true,
  autoClose = true,
}: PopupProps) {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position classes
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  // Color classes
  const colorClasses = {
    success: "bg-green-100 text-green-800 border border-green-200",
    error: "bg-red-100 text-red-800 border border-red-200",
    info: "bg-blue-100 text-blue-800 border border-blue-200",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  };

  // Icons
  const icons = {
    success: (
      <svg
        className="h-5 w-5 text-green-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg
        className="h-5 w-5 text-red-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    info: (
      <svg
        className="h-5 w-5 text-blue-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
          clipRule="evenodd"
        />
      </svg>
    ),
    warning: (
      <svg
        className="h-5 w-5 text-yellow-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  useEffect(() => {
    if (message) {
      setShow(true);
      setIsVisible(true);

      if (autoClose) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            setShow(false);
            onClose?.();
          }, 300); // Match this with transition duration
        }, duration);

        return () => clearTimeout(timer);
      }
    }
  }, [message, duration, onClose, autoClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed ${
        positionClasses[position]
      } z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className={`p-4 rounded-md shadow-lg ${colorClasses[type]}`}>
        <div className="flex items-center">
          {showIcon && <div className="flex-shrink-0">{icons[type]}</div>}
          <div className={showIcon ? "ml-3" : ""}>
            <p className="text-sm font-medium">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
