"use client";

import { useEffect, useState } from "react";
import { listenToAnnouncements } from "@/services/announcements";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import { SAMPLE_ANNOUNCEMENTS } from "@/lib/constants";
import type { Announcement } from "@/lib/types";

type AnnouncementState = {
  items: Announcement[];
  loading: boolean;
  error?: string;
};

export const useAnnouncements = () => {
  const [state, setState] = useState<AnnouncementState>({
    items: [],
    loading: true,
  });

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setState({
        items: SAMPLE_ANNOUNCEMENTS,
        loading: false,
        error: "Firebase is not configured yet.",
      });
      return;
    }

    const unsubscribe = listenToAnnouncements(
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
