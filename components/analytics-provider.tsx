"use client";

import { useEffect } from "react";
import { initScrollDepthTracking, initOutboundLinkTracking } from "@/lib/analytics";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize scroll depth tracking
    const cleanupScroll = initScrollDepthTracking();

    // Initialize outbound link tracking
    const cleanupLinks = initOutboundLinkTracking();

    // Cleanup on unmount
    return () => {
      cleanupScroll?.();
      cleanupLinks?.();
    };
  }, []);

  return <>{children}</>;
}