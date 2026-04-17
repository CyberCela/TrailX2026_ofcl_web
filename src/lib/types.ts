export type Role = "admin" | "organizer" | "volunteer" | "participant";

export type TeamCategory = "Scouts" | "Rover Scouts" | "Open";

export type Gender = "Male" | "Female";

export type ActivityCategory = "Skill" | "Physical" | "Bonus";

export type ActivityStatus = "active" | "inactive";

export type SponsorTier = "Platinum" | "Gold" | "Silver" | "Partner";

export type UserProfile = {
  id?: string;
  displayName: string;
  email: string;
  gender: Gender;
  role: Role;
  status: "pending" | "approved" | "rejected";
  teamId?: string;
  createdAt?: unknown;
};

export type TeamMember = {
  name: string;
  gender: Gender;
  isLeader?: boolean;
};

export type Team = {
  id?: string;
  name: string;
  leaderId: string;
  memberIds: string[];
  category: TeamCategory;
  members: TeamMember[];
  memberCount: number;
  femaleCount: number;
  createdAt?: unknown;
};

export type ScoreEntry = {
  id?: string;
  teamId: string;
  teamName: string;
  category: TeamCategory;
  points: number;
  checkpoints: number;
  updatedAt?: unknown;
};

export type Announcement = {
  id?: string;
  title: string;
  body: string;
  authorRole: Role;
  createdAt?: unknown;
  pinned?: boolean;
};

export type PaymentRecord = {
  id?: string;
  teamId: string;
  userId: string;
  amount: number;
  status: "pending" | "verified" | "rejected";
  receiptUrl?: string;
  createdAt?: unknown;
};

export type ResourceItem = {
  id?: string;
  title: string;
  type: "pdf" | "map" | "instruction";
  url: string;
  uploadedBy: string;
  createdAt?: unknown;
};

export type Activity = {
  id?: string;
  activityId: string;
  name: string;
  description: string;
  category: ActivityCategory;
  maxPoints: number;
  checkpointLocation?: string;
  status: ActivityStatus;
  createdAt?: unknown;
};

export type Sponsor = {
  id?: string;
  sponsorId: string;
  name: string;
  logoUrl: string;
  tier: SponsorTier;
  websiteUrl: string;
  description?: string;
  createdAt?: unknown;
};
