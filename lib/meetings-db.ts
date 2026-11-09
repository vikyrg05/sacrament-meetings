import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
    {
        id: 6,
        date: '2026-11-01',
        meetingType: 'regular',
        presiding: 'Bishop John Smith',
        conducting: 'Brother Michael Clark',
        announcements: ['Ward service activity this month'],
        openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
        openingPrayer: 'Sister Emma Wilson',
        wardBusiness: [{ description: 'Welcome new ward members' }],
        stakeBusiness: false,
        sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
        speakers: [
            { name: 'Sister Laura Davis', topic: 'Following Jesus Christ', type: 'speaker' },
            { name: 'Brother David Brown', topic: 'Faith and Prayer', type: 'speaker' },
        ],
        closingHymn: { number: 134, title: 'I Believe in Christ' },
        closingPrayer: 'Brother Peter Green',
    },

    {
        id: 1,
        date: '2026-11-08',
        meetingType: 'regular',
        presiding: 'Bishop John Smith',
        conducting: 'Sister Mary Johnson',
        announcements: ['Ward activity next Saturday'],
        openingHymn: { number: 2, title: 'The Spirit of God' },
        openingPrayer: 'Brother David Brown',
        wardBusiness: [{ description: 'Welcome new ward members' }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
        speakers: [
            { name: 'Sister Anna White', topic: 'Faith in Jesus Christ', type: 'speaker' },
            { name: 'Youth Choir', topic: 'I Am a Child of God', type: 'musical-number' },
            { name: 'Brother Peter Green', topic: 'Following the Savior', type: 'speaker' },
        ],
        closingHymn: { number: 301, title: 'I Am a Child of God' },
        closingPrayer: 'Sister Laura Davis',
    },
    {
        id: 2,
        date: '2026-11-15',
        meetingType: 'testimony',
        presiding: 'Bishop John Smith',
        conducting: 'Brother Michael Clark',
        openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
        openingPrayer: 'Sister Emma Wilson',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
        speakers: [],
        closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
        closingPrayer: 'Brother Daniel Lee',
    },
    {
        id: 3,
        date: '2026-11-22',
        meetingType: 'regular',
        presiding: 'Bishop John Smith',
        conducting: 'Sister Mary Johnson',
        announcements: ['Youth activity on Wednesday'],
        openingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
        openingPrayer: 'Brother Robert Hall',
        wardBusiness: [{ description: 'Sustain newly called ward members' }],
        stakeBusiness: false,
        sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
        speakers: [
            { name: 'Sister Olivia Martin', topic: 'Gratitude', type: 'speaker' },
            { name: 'Brother James Taylor', topic: 'Service', type: 'speaker' },
        ],
        closingHymn: { number: 219, title: 'Because I Have Been Given Much' },
        closingPrayer: 'Sister Grace Young',
    },
    {
        id: 4,
        date: '2026-11-29',
        meetingType: 'stake',
        presiding: 'Stake President Thomas Brown',
        conducting: 'Brother Michael Clark',
        openingHymn: { number: 1, title: 'The Morning Breaks' },
        openingPrayer: 'Brother David Brown',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
        speakers: [
            { name: 'Sister Rachel Adams', topic: 'Preparing for the Savior', type: 'speaker' },
            { name: 'Stake Choir', topic: 'Silent Night', type: 'musical-number' },
        ],
        closingHymn: { number: 202, title: 'Oh, Come, All Ye Faithful' },
        closingPrayer: 'Sister Laura Davis',
    },
    {
        id: 5,
        date: '2026-12-06',
        meetingType: 'general',
        presiding: 'Bishop John Smith',
        conducting: 'Sister Mary Johnson',
        openingHymn: { number: 4, title: 'Truth Eternal' },
        openingPrayer: 'Brother Peter Green',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
        speakers: [
            { name: 'Sister Anna White', topic: 'The Light of Christ', type: 'speaker' },
            { name: 'Brother Daniel Lee', topic: 'Sharing the Gospel', type: 'speaker' },
        ],
        closingHymn: { number: 134, title: 'I Believe in Christ' },
        closingPrayer: 'Sister Emma Wilson',
    },
];

export function getMeetings(date?: string): SacramentMeeting[] {
    if (date) {
        return meetings.filter((meeting) => meeting.date === date);
    }

    return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
    return meetings.find((meeting) => meeting.id === id);
}