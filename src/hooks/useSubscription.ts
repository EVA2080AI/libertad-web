import { useState } from "react";

export function useSubscription() {
  const [state] = useState({
    subscribed: true,
    productId: "prod_KAI_FULL_ACCESS",
    subscriptionEnd: "2099-12-31T23:59:59Z",
    loading: false,
    planName: "KAI Full Access",
  });

  return { ...state, checkout: () => {}, manageSubscription: () => {}, refresh: () => {} };
}
