import type { Announcement, Activity, ScoreEntry, Sponsor } from "./types";

export const EVENT_DETAILS = {
  name: "TrailX 2026",
  tagline: "One Team, One Goal: Make the Journey Epic",
  date: "July 4, 2026",
  duration: "1 day",
  locations: {
    hike: "Madakada Forest Reserve",
    awards: "University of Sri Jayewardenepura",
  },
  participants: "1000+ expected",
  description:
    "An all-island hiking competition with team-based challenges and skill stations for navigation, survival, and first aid.",
};

export const SAMPLE_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "sample-1",
    title: "Checkpoint briefing released",
    body: "Teams can now review the updated checkpoint timing window and safety guidance.",
    authorRole: "organizer",
    createdAt: "2026-04-01T09:00:00Z",
    pinned: true,
  },
  {
    id: "sample-2",
    title: "Medical readiness checklist",
    body: "Ensure team leaders submit first-aid readiness verification before June 20.",
    authorRole: "admin",
    createdAt: "2026-03-28T16:30:00Z",
  },
  {
    id: "sample-3",
    title: "Navigation practice slots",
    body: "Optional practice slots open this weekend for compass and map navigation drills.",
    authorRole: "organizer",
    createdAt: "2026-03-24T10:15:00Z",
  },
];

export const SAMPLE_LEADERBOARD: ScoreEntry[] = [
  {
    id: "sample-1",
    teamId: "TX-101",
    teamName: "Summit Striders",
    category: "Scouts",
    points: 480,
    checkpoints: 6,
    updatedAt: "2026-04-01T11:15:00Z",
  },
  {
    id: "sample-2",
    teamId: "TX-214",
    teamName: "Wild Trail Collective",
    category: "Rover Scouts",
    points: 455,
    checkpoints: 5,
    updatedAt: "2026-04-01T11:10:00Z",
  },
  {
    id: "sample-3",
    teamId: "TX-319",
    teamName: "Ridge Runners",
    category: "Open",
    points: 440,
    checkpoints: 5,
    updatedAt: "2026-04-01T10:58:00Z",
  },
];

export const TEAM_CATEGORIES = ["Scouts", "Rover Scouts", "Open"] as const;

export const ACTIVITY_CATEGORIES = ["Skill", "Physical", "Bonus"] as const;

export const SPONSOR_TIERS = [
  "Platinum",
  "Gold",
  "Silver",
  "Partner",
] as const;

export const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: "activity-1",
    activityId: "ACT-001",
    name: "Map Reading",
    description: "Timed navigation drill using trail maps and compass bearings.",
    category: "Skill",
    maxPoints: 120,
    checkpointLocation: "Checkpoint 2",
    status: "active",
  },
  {
    id: "activity-2",
    activityId: "ACT-002",
    name: "First Aid Challenge",
    description: "Respond to simulated injury scenarios with correct protocols.",
    category: "Skill",
    maxPoints: 140,
    checkpointLocation: "Checkpoint 5",
    status: "active",
  },
  {
    id: "activity-3",
    activityId: "ACT-003",
    name: "Trail Sprint",
    description: "Short sprint section with endurance scoring.",
    category: "Physical",
    maxPoints: 90,
    status: "inactive",
  },
];

export const SAMPLE_SPONSORS: Sponsor[] = [
  {
    id: "sponsor-1",
    sponsorId: "SP-PLAT-01",
    name: "Summit Peak Gear",
    logoUrl: "",
    tier: "Platinum",
    websiteUrl: "https://example.com",
    description: "Official gear partner for TrailX 2026.",
  },
  {
    id: "sponsor-2",
    sponsorId: "SP-GOLD-01",
    name: "TrailTech",
    logoUrl: "",
    tier: "Gold",
    websiteUrl: "https://example.com",
  },
  {
    id: "sponsor-3",
    sponsorId: "SP-SIL-01",
    name: "EcoTrail Foods",
    logoUrl: "",
    tier: "Silver",
    websiteUrl: "https://example.com",
  },
  {
    id: "sponsor-4",
    sponsorId: "SP-PAR-01",
    name: "Campus Partners",
    logoUrl: "",
    tier: "Partner",
    websiteUrl: "https://example.com",
  },
];
