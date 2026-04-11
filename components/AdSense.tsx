"use client";
import { useEffect } from "react";

interface AdSenseProps {
  slot: string;
  format?: "auto" | "horizontal" | "rectangle" | "vertical";
  className?: string;
}

export default function AdSense({ slot, format = "auto", className = "" }: AdSenseProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const isConfigured = clientId && clientId !== "ca-pub-xxxxxxxxxxxxxxxx";

  useEffect(() => {
    if (!isConfigured) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [isConfigured]);

  if (!isConfigured) {
    return (
      <div
        className={`flex items-center justify-center border border-dashed border-ink-faint/50 rounded-sm ${className}`}
        style={{ minHeight: 90, background: "rgba(180,160,128,0.06)" }}
      >
        <p className="font-mono text-xs text-ink-faint tracking-widest uppercase">
          Ad Space — {slot}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
