
import MeetingDetail from "@/components/MeetingDetail";
import PrintButton from "@/components/PrintButton";
import type { SacramentMeeting } from "@/lib/types";
import { connection } from "next/server";
import { notFound } from "next/navigation";

export const instant = false;

interface MeetingPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
    await connection();

    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId) || meetingId <= 0) {
        notFound();
    }

    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/meetings/${meetingId}`, {
        cache: "no-store",
    });

    if (response.status === 404) {
        notFound();
    }

    if (!response.ok) {
        throw new Error("Failed to fetch meeting");
    }

    const meeting: SacramentMeeting = await response.json();

    return (
        <section className="space-y-6">
            <h1 className="text-3xl font-bold text-blue-900">
                Meeting Details
            </h1>

            <PrintButton />

            <MeetingDetail meeting={meeting} />
        </section>
    );
}
