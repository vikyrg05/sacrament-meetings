import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
    meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
    const isSacramentMeeting =
        meeting.meetingType === 'regular' ||
        meeting.meetingType === 'testimony';

    return (
        <article className="space-y-8 rounded-lg bg-white p-6 shadow-sm">
            <section>
                <h2 className="text-xl font-semibold text-blue-900">
                    Meeting Information
                </h2>
                <p>Meeting type: {meeting.meetingType}</p>
                <p>Presiding: {meeting.presiding}</p>
                <p>Conducting: {meeting.conducting}</p>
            </section>

            {meeting.announcements && meeting.announcements.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold text-blue-900">
                        Announcements
                    </h2>
                    <ul className="list-disc pl-6">
                        {meeting.announcements.map((announcement, index) => (
                            <li key={index}>{announcement}</li>
                        ))}
                    </ul>
                </section>
            )}

            <section>
                <h2 className="text-xl font-semibold text-blue-900">
                    Opening
                </h2>
                <p>
                    Opening hymn: {meeting.openingHymn.number} - {meeting.openingHymn.title}
                </p>
                <p>Opening prayer: {meeting.openingPrayer}</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-blue-900">
                    Ward Business
                </h2>
                {meeting.wardBusiness.length > 0 ? (
                    <ul className="list-disc pl-6">
                        {meeting.wardBusiness.map((item, index) => (
                            <li key={index}>{item.description}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No ward business scheduled.</p>
                )}
                <p>
                    Stake Business: {meeting.stakeBusiness ? 'Yes' : 'No'}
                </p>
            </section>

            {isSacramentMeeting && (
                <section>
                    <h2 className="text-xl font-semibold text-blue-900">
                        Sacrament
                    </h2>
                    <p>
                        Sacrament hymn: {meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}
                    </p>
                    <p>Sacrament administration</p>
                </section>
            )}

            <section>
                <h2 className="text-xl font-semibold text-blue-900">
                    Speakers and Musical Numbers
                </h2>
                {meeting.speakers.length > 0 ? (
                    <ul className="space-y-3">
                        {meeting.speakers.map((item, index) => (
                            <li key={index}>
                                <strong>{item.name}</strong> - {item.topic}{' '}
                                <span className="ml-2 text-sm text-gray-500">
                                    ({item.type === 'speaker' ? 'Speaker' : 'Musical number'})
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Testimony meeting.</p>
                )}
            </section>

            <section>
                <h2 className="text-xl font-semibold text-blue-900">
                    Closing
                </h2>
                <p>
                    Closing hymn: {meeting.closingHymn.number} - {meeting.closingHymn.title}
                </p>
                <p>Closing prayer: {meeting.closingPrayer}</p>
            </section>
        </article>
    );
}