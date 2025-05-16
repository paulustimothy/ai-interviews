interface Feedback {
  id: string;
  interviewId: string;
  feynmanId?: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
  language: "en" | "id";
}

interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
  language: "en" | "id";
}

interface CreateFeedbackParams {
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
  language: "en" | "id";
}

interface User {
  name: string;
  email: string;
  id: string;
}

interface InterviewCardProps {
  id?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
  language?: "en" | "id";
}

interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  feynmanId?: string;
  feynmanFeedbackId?: string;
  type: "generate" | "interview";
  questions?: string[];
  language?: "en" | "id";
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}

interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}

interface SignInParams {
  email: string;
  idToken: string;
}

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

type FormType = "sign-in" | "sign-up";

interface InterviewFormProps {
  interviewId: string;
  role: string;
  level: string;
  type: string;
  techstack: string[];
  amount: number;
}

interface TechIconProps {
  techStack: string[];
}

interface Feynman {
  id: string;
  topic: string;
  goal: string;
  questions: string[];
  difficulty: string;
  createdAt: string;
  userId: string;
  finalized: boolean;
  language: "en" | "id";
}

interface GetLatestFeynmanParams {
  userId: string;
  limit?: number;
}

interface CreateFeynmanFeedbackParams {
  feynmanId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feynmanFeedbackId?: string;
  language: "en" | "id";
}

interface GetFeedbackByFeynmanIdParams {
  feynmanId: string;
  userId: string;
}

interface FeynmanCardProps {
  id?: string;
  topic: string;
  goal: string;
  difficulty: string;
  createdAt?: string;
  language?: "en" | "id";
}