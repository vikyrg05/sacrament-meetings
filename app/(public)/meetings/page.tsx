
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import { getMeetings } from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";
import { connection } from "next/server";
import { Suspense } from "react";

interface MeetingsPageProps {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}

export default async function MeetingsPage({
    searchParams,
}: MeetingsPageProps) {
    await connection();

    const { query = "", page = "1" } = await searchParams;
    const currentPage = Math.max(1, Number.parseInt(page, 10) || 1);

    const result = await getMeetings({
        query,
        page: currentPage,
    }) as { meetings: SacramentMeeting[]; totalCount: number };

    const { meetings, totalCount } = result;
    const totalPages = Math.ceil(totalCount / 5);

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-blue-900">
                    Sacrament Meetings
                </h1>
                <p className="mt-2 text-gray-600">
                    View the schedule and details of upcoming sacrament meetings.
                </p>
            </div>

            <Suspense fallback={<p>Loading search...</p>}>
                <MeetingSearch />
                <Pagination totalPages={totalPages} />
            </Suspense>

            <p className="text-gray-600">
                {totalCount} meeting{totalCount !== 1 ? "s" : ""} found
            </p>

            <div className="grid gap-6 md:grid-cols-2">
                {meetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
            </div>
        </section>
    );
}
