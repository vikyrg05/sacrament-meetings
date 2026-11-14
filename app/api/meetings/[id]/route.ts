import { getMeetingById } from "@/lib/meetings-db";
import { NextResponse } from "next/server";

interface MeetingRouteProps {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(
    request: Request,
    { params }: MeetingRouteProps
) {
    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId) || meetingId <= 0) {
        return NextResponse.json(
            { error: "Invalid meeting ID" },
            { status: 400 }
        );
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
        return NextResponse.json(
            { error: "Meeting not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(meeting, { status: 200 });
}