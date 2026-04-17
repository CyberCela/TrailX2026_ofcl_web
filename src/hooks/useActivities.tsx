"use client";

import { useEffect, useState } from "react";
import { listenToActivities } from "@/services/activities";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import { SAMPLE_ACTIVITIES } from "@/lib/constants";
import type { Activity } from "@/lib/types";

type ActivityState = {
  items: Activity[];
  loading: boolean;
  error?: string;
};

export const useActivities = () => {
  const [state, setState] = useState<ActivityState>({
    items: [],
    loading: true,
  });

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setState({
        items: SAMPLE_ACTIVITIES,
        loading: false,
        error: "Firebase is not configured yet.",
      });
      return;
    }

    const unsubscribe = listenToActivities(
      (items) => setState({ items, loading: false }),
      (error) =>
        setState({
          items: [],
          loading: false,
          error: error.message,
        })
    );

    return () => unsubscribe?.();
  }, []);

  return state;
};
