
import { sql } from './db';
import type { SacramentMeeting } from './types';

interface MeetingRow {
    id: number;
    date: string;
    formatted_date: string;
    meeting_type: SacramentMeeting['meetingType'];
    presiding: string;
    conducting: string;
    announcements: string[];
    opening_hymn: SacramentMeeting['openingHymn'];
    opening_prayer: string;
    ward_business: SacramentMeeting['wardBusiness'];
    stake_business: boolean;
    sacrament_hymn: SacramentMeeting['sacramentHymn'];
    speakers: SacramentMeeting['speakers'];
    closing_hymn: SacramentMeeting['closingHymn'];
    closing_prayer: string;
}

interface MeetingSearchOptions {
    query: string;
    page: number;
}

interface PaginatedMeetings {
    meetings: SacramentMeeting[];
    totalCount: number;
}

function mapMeeting(row: MeetingRow): SacramentMeeting {
    return {
        id: row.id,
        date: row.formatted_date,
        meetingType: row.meeting_type,
        presiding: row.presiding,
        conducting: row.conducting,
        announcements: row.announcements ?? [],
        openingHymn: row.opening_hymn,
        openingPrayer: row.opening_prayer,
        wardBusiness: row.ward_business ?? [],
        stakeBusiness: row.stake_business,
        sacramentHymn: row.sacrament_hymn,
        speakers: row.speakers ?? [],
        closingHymn: row.closing_hymn,
        closingPrayer: row.closing_prayer,
    };
}

export function getMeetings(date?: string): Promise<SacramentMeeting[]>;
export function getMeetings(options: MeetingSearchOptions): Promise<PaginatedMeetings>;

export async function getMeetings(
    dateOrOptions?: string | MeetingSearchOptions
): Promise<SacramentMeeting[] | PaginatedMeetings> {
    if (typeof dateOrOptions === 'object' && dateOrOptions !== null) {
        return getPaginatedMeetings(
            dateOrOptions.query,
            dateOrOptions.page
        );
    }

    const date = dateOrOptions;

    let rows: MeetingRow[];

    if (date) {
        rows = await sql`
            SELECT *,
                   TO_CHAR(date, 'YYYY-MM-DD') AS formatted_date
            FROM meetings
            WHERE date = ${date}
            ORDER BY date
        ` as MeetingRow[];
    } else {
        rows = await sql`
            SELECT *,
                   TO_CHAR(date, 'YYYY-MM-DD') AS formatted_date
            FROM meetings
            ORDER BY date
        ` as MeetingRow[];
    }

    return rows.map(mapMeeting);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | undefined> {
    const rows = await sql`
        SELECT *,
               TO_CHAR(date, 'YYYY-MM-DD') AS formatted_date
        FROM meetings
        WHERE id = ${id}
    ` as MeetingRow[];

    return rows.length > 0 ? mapMeeting(rows[0]) : undefined;
}

export async function getPaginatedMeetings(
    query: string,
    page: number
): Promise<PaginatedMeetings> {
    const limit = 5;
    const offset = (page - 1) * limit;
    const searchTerm = `%${query}%`;

    const rows = await sql`
        SELECT *,
               TO_CHAR(date, 'YYYY-MM-DD') AS formatted_date
        FROM meetings
        WHERE ${query} = ''
           OR presiding ILIKE ${searchTerm}
           OR conducting ILIKE ${searchTerm}
           OR meeting_type ILIKE ${searchTerm}
           OR EXISTS (
               SELECT 1
               FROM jsonb_array_elements(COALESCE(speakers, '[]'::jsonb)) AS speaker
               WHERE speaker->>'name' ILIKE ${searchTerm}
           )
        ORDER BY date
        LIMIT ${limit}
        OFFSET ${offset}
    ` as MeetingRow[];

    const countRows = await sql`
        SELECT COUNT(*) AS total
        FROM meetings
        WHERE ${query} = ''
           OR presiding ILIKE ${searchTerm}
           OR conducting ILIKE ${searchTerm}
           OR meeting_type ILIKE ${searchTerm}
           OR EXISTS (
               SELECT 1
               FROM jsonb_array_elements(COALESCE(speakers, '[]'::jsonb)) AS speaker
               WHERE speaker->>'name' ILIKE ${searchTerm}
           )
    ` as { total: number }[];

    return {
        meetings: rows.map(mapMeeting),
        totalCount: Number(countRows[0].total),
    };
}
