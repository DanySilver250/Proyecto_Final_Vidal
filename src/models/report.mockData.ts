import type { Report } from "./report";

export const MOCK_REPORTS: Report[] = [
  {
    id: "1",
    title: "Water leak in bathroom",
    description: "Constant water leak on second floor bathroom.",
    priority: "high",
    user: { name: "Juan Perez" },
    createdAt: Date.now() - 1000 * 60 * 5,
  },
  {
    id: "2",
    title: "Flickering office light",
    description: "Main office light keeps flickering.",
    priority: "medium",
    user: { name: "Valeria Ortiz" },
    createdAt: Date.now() - 1000 * 60 * 10,
  },
  {
    id: "3",
    title: "Warehouse door damaged",
    description: "Warehouse door does not close properly.",
    priority: "low",
    user: { name: "Carlos Gomez" },
    createdAt: Date.now() - 1000 * 60 * 20,
  },
];