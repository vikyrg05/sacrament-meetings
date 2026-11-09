import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

export const instant = false;

export default async function MeetingsPage() {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/meetings`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch meetings");
    }

    const meetings: SacramentMeeting[] = await response.json();

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

            <div className="grid gap-6 md:grid-cols-2">
                {meetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
            </div>
        </section>
    );
}