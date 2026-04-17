"use client";

import { useEffect, useState } from "react";
import { listenToSponsors, fetchSponsorsCached } from "@/services/sponsors";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import { SAMPLE_SPONSORS } from "@/lib/constants";
import type { Sponsor } from "@/lib/types";

type SponsorState = {
  items: Sponsor[];
  loading: boolean;
  error?: string;
};

type UseSponsorsOptions = {
  realtime?: boolean;
};

export const useSponsors = ({ realtime = false }: UseSponsorsOptions = {}) => {
  const [state, setState] = useState<SponsorState>({
    items: [],
    loading: true,
  });

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setState({
        items: SAMPLE_SPONSORS,
        loading: false,
        error: "Firebase is not configured yet.",
      });
      return;
    }

    if (realtime) {
      const unsubscribe = listenToSponsors(
        (items) => setState({ items, loading: false }),
        (error) =>
          setState({
            items: [],
            loading: false,
            error: error.message,
          })
      );
      return () => unsubscribe?.();
    }

    let isMounted = true;
    fetchSponsorsCached()
      .then((items) => {
        if (isMounted) setState({ items, loading: false });
      })
      .catch((error) => {
        if (!isMounted) return;
        setState({ items: [], loading: false, error: error.message });
      });

    return () => {
      isMounted = false;
    };
  }, [realtime]);

  return state;
};
