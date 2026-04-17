"use client";

import { useEffect, useState } from "react";
import { listenToLeaderboard } from "@/services/scores";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import { SAMPLE_LEADERBOARD, TEAM_CATEGORIES } from "@/lib/constants";
import type { ScoreEntry } from "@/lib/types";

type LeaderboardState = {
  items: ScoreEntry[];
  loading: boolean;
  error?: string;
};

export const useLeaderboard = () => {
  const [state, setState] = useState<LeaderboardState>({
    items: [],
    loading: true,
  });

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setState({
        items: SAMPLE_LEADERBOARD,
        loading: false,
        error: "Firebase is not configured yet.",
      });
      return;
    }

    const unsubscribe = listenToLeaderboard(
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

  return { ...state, categories: TEAM_CATEGORIES };
};
