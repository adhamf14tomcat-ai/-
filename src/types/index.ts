export type SessionDuration = 0.5 | 1 | 2; // in hours

export type SessionType = 'online' | 'in_person';

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  skillName: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  progress?: string;
}

export interface TeacherSkill {
  id: string;
  title: string;
  category: string;
  level: string;
  hoursCompleted: number;
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  hoursCompleted: number;
  city: string;
  type: SessionType;
  primarySkill: string;
  category: string;
  locationDetails?: string;
  languages: string[];
  reviews: Review[];
}

export interface Booking {
  id: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  skillTitle: string;
  date: string;
  timeSlot: string;
  duration: SessionDuration;
  type: SessionType;
  locationDetails?: string;
  note?: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  hoursTransferred?: number;
  ratingGiven?: number;
  feedbackGiven?: string;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  title: string;
  bio: string;
  city: string;
  hoursBalance: number;
  totalHoursTaught: number;
  totalHoursLearned: number;
  offeredSkills: TeacherSkill[];
  wantedSkills: string[];
  badges: Badge[];
  reviewsReceived: Review[];
}

export interface LeaderboardMember {
  id: string;
  name: string;
  avatar: string;
  city: string;
  skill: string;
  hoursGivenThisMonth: number;
  allTimeHours: number;
  learnersCount: number;
  rating: number;
  rank: number;
}

export interface SuccessStory {
  id: string;
  name: string;
  avatar: string;
  city: string;
  skillTaught: string;
  skillLearned: string;
  story: string;
  hoursExchanged: number;
}
