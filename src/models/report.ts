export type ReportPriority = "Baja" | "Media" | "Alta";

export type Report = {
    id: string;
    title: string;
    description: string;
    priority: ReportPriority;
    user: User;
}

export type User = {
    name: string;
}