import MeetingForm from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';
import { notFound } from 'next/navigation';

interface EditMeetingPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditMeetingPage({
    params,
}: EditMeetingPageProps) {
    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId) || meetingId <= 0) {
        notFound();
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
        notFound();
    }

    const updateMeetingWithId = updateMeeting.bind(null, meetingId);

    return (
        <section className="space-y-6">
            <h1 className="text-3xl font-bold text-blue-900">
                Edit Meeting
            </h1>

            <MeetingForm
                action={updateMeetingWithId}
                meeting={meeting}
            />
        </section>
    );
}

export const instant = false;
