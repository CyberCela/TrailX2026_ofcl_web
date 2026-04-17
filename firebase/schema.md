# Firestore Schema

## users
- displayName: string
- email: string
- role: admin | organizer | volunteer | participant
- status: pending | approved | rejected
- teamId: string (optional)
- createdAt: timestamp

## teams
- name: string
- leaderId: string
- memberIds: string[]
- category: Scouts | Rover Scouts | Open
- createdAt: timestamp

## scores
- teamId: string
- teamName: string
- category: string
- points: number
- checkpoints: number
- updatedAt: timestamp

## events
- name: string
- date: string
- duration: string
- locations: map
- description: string
- updatedAt: timestamp

## announcements
- title: string
- body: string
- authorRole: admin | organizer
- pinned: boolean
- createdAt: timestamp

## payments
- teamId: string
- userId: string
- amount: number
- status: pending | verified | rejected
- receiptUrl: string
- createdAt: timestamp

## resources
- title: string
- type: pdf | map | instruction
- url: string
- uploadedBy: string
- createdAt: timestamp

## activities
- activityId: string
- name: string
- description: string
- category: Skill | Physical | Bonus
- maxPoints: number
- checkpointLocation: string (optional)
- status: active | inactive
- createdAt: timestamp

## sponsors
- sponsorId: string
- name: string
- logoUrl: string
- tier: Platinum | Gold | Silver | Partner
- websiteUrl: string
- description: string (optional)
- createdAt: timestamp
