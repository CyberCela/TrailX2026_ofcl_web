"use client";

import { useEffect, useState } from "react";
import { listenToTeam } from "@/services/teams";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import type { Team } from "@/lib/types";

type TeamState = {
  team: Team | null;
  loading: boolean;
};

export const useTeam = (teamId?: string) => {
  const [state, setState] = useState<TeamState>({ team: null, loading: true });

  useEffect(() => {
    if (!teamId) {
      setState({ team: null, loading: false });
      return;
    }

    if (!isFirebaseConfigured) {
      setState({ team: null, loading: false });
      return;
    }

    const unsubscribe = listenToTeam(teamId, (team) => {
      setState({ team, loading: false });
    });

    return () => unsubscribe?.();
  }, [teamId]);

  return state;
};
