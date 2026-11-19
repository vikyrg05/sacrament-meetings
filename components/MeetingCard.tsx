import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import { deleteMeeting } from '@/lib/actions';

interface MeetingCardProps {
    meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
    return (
        <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900">
                {new Date(`${meeting.date}T12:00:00`).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </h2>

            <p className="mt-2 text-gray-600">
                Meeting type: {meeting.meetingType}
            </p>

            <p className="mt-1 text-gray-600">
                Presiding: {meeting.presiding}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
                <Link
                    href={`/meetings/${meeting.id}`}
                    className="font-medium text-blue-700 hover:underline"
                >
                    View meeting details
                </Link>

                <Link
                    href={`/meetings/${meeting.id}/edit`}
                    className="font-medium text-blue-700 hover:underline"
                >
                    Edit meeting
                </Link>

                <form action={deleteMeeting}>
                    <input
                        type="hidden"
                        name="id"
                        value={meeting.id}
                    />
                    <button
                        type="submit"
                        className="font-medium text-red-600 hover:underline"
                    >
                        Delete meeting
                    </button>
                </form>
            </div>
        </article>
    );
}
