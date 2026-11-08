import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import { redirect } from "next/navigation";
import KanbanBoard from "@/components/kanban-board";
import StatsBar from "@/components/stats-bar";
import { Suspense } from "react";

async function getBoard(userId: string) {
    "use cache";

    await connectDB();

    const boardDoc = await Board.findOne({
        userId: userId,
        name: "Job Hunt",
    }).populate({
        path: "columns",
        populate: {
            path: "jobApplications",
        },
    });

    if (!boardDoc) return null;

    const board = JSON.parse(JSON.stringify(boardDoc));

    return board;
}

async function DashboardPage() {
    const session = await getSession();
    const board = await getBoard(session?.user.id ?? "");

    if (!session?.user) {
        redirect("/sign-in");
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto p-4 sm:p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-foreground">Job Hunt</h1>
                    <p className="text-muted-foreground">Track your job applications</p>
                </div>
                <StatsBar board={board} />
                <KanbanBoard board={board} userId={session.user.id} />
            </div>
        </div>
    );
}

export default async function Dashboard() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <DashboardPage />
        </Suspense>
    );
}