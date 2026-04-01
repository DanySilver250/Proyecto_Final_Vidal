export type ReportPriority = "high" | "medium" | "low";

export type Report = {
  id: string;
  title: string;
  description: string;
  priority: ReportPriority;
  user: User;
  createdAt: number;
};

export type User = {
  name: string;
};