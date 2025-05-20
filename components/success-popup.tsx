"use client";

import { useEffect, useState } from "react";

export const SuccessPopup = ({ message }: { message: string }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Popup will disappear after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 shadow-lg">
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};
