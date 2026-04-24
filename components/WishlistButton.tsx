"use client";
import { useEffect, useState } from "react";
import { isInWishlist, toggleWishlist } from "@/lib/wishlist";

type Props = {
  id: number;
  size?: "sm" | "lg";
  onClick?: (e: React.MouseEvent) => void;
};

export default function WishlistButton({ id, size = "sm", onClick }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isInWishlist(id));
    const sync = () => setSaved(isInWishlist(id));
    window.addEventListener("wishlist-updated", sync);
    return () => window.removeEventListener("wishlist-updated", sync);
  }, [id]);

  const handle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(e);
    const now = toggleWishlist(id);
    setSaved(now);
  };

  const px = size === "lg" ? 28 : 22;
  return (
    <button
      onClick={handle}
      aria-label={saved ? "欲しいリストから削除" : "欲しいリストに追加"}
      style={{
        width: px, height: px, border: "none", background: "rgba(14,27,46,.85)",
        borderRadius: "50%", cursor: "pointer", display: "flex",
        alignItems: "center", justifyContent: "center",
        boxShadow: "0 1px 4px rgba(0,0,0,.4)",
        padding: 0,
      }}
    >
      <svg width={size === "lg" ? 16 : 12} height={size === "lg" ? 16 : 12} viewBox="0 0 24 24"
           fill={saved ? "#E84033" : "none"}
           stroke={saved ? "#E84033" : "#F5F0E8"} strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  );
}
