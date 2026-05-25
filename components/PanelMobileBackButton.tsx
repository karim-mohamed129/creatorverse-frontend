import React, { useState } from "react";
import "./PanelMobileBackButton.css";

type Props = {
  fallbackHref?: string;
  alwaysUseFallback?: boolean;
  onBack?: () => void;
};

export default function PanelMobileBackButton({
  fallbackHref = "/dashboard",
  alwaysUseFallback = false,
  onBack,
}: Props) {
  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    if (typeof window === "undefined") return;

    if (!alwaysUseFallback && window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = fallbackHref;
  };

  return (
    <button
      type="button"
      className="panel-mobile-back-button"
      aria-label="Back"
      onClick={handleBack}
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="12.5"
          cy="12.5"
          r="12"
          transform="matrix(-1 0 0 1 25 0)"
          fill="#1D1D1D"
        />
        <circle
          cx="12.5"
          cy="12.5"
          r="12"
          transform="matrix(-1 0 0 1 25 0)"
          stroke="#F5F5F5"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.17793 13.3332L11.7645 20L12.5116 18.3336L10.432 12.5L12.5116 6.6664L11.7645 5L9.17793 11.6668C9.07887 11.8878 9.02322 12.1875 9.02322 12.5C9.02322 12.8125 9.07887 13.1122 9.17793 13.3332Z"
          fill="#CC4699"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.6663 13.3332L15.2529 20L16 18.3336L13.9204 12.5L16 6.6664L15.2529 5L12.6663 11.6668C12.5673 11.8878 12.5116 12.1875 12.5116 12.5C12.5116 12.8125 12.5673 13.1122 12.6663 13.3332Z"
          fill="#CC4699"
        />
      </svg>
    </button>
  );
}
