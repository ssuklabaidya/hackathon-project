"use client";

import { createContext, useContext, useState } from "react";

const RouteContext = createContext(null);

export function RouteProvider({ children }) {
  const [routeData, setRouteData] = useState(null);

  const markPickupComplete = (pickupRequestId) => {
    setRouteData((prev) => {
      if (!prev) return prev;

      const updatedRoute = prev.route.filter(
        (stop) => stop.pickupRequestId !== pickupRequestId
      );

      return {
        ...prev,
        route: updatedRoute,
        totalStops: updatedRoute.length,
      };
    });
  };

  const clearRoute = () => {
    setRouteData(null);
  };

  return (
    <RouteContext.Provider
      value={{ routeData, setRouteData, markPickupComplete, clearRoute }}
    >
      {children}
    </RouteContext.Provider>
  );
}

export function useRoute() {
  const ctx = useContext(RouteContext);
  if (!ctx) throw new Error("useRoute must be used inside RouteProvider");
  return ctx;
}
