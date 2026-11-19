
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
    createMeeting as createMeetingInDB,
    updateMeeting as updateMeetingInDB,
    deleteMeeting as deleteMeetingInDB,
} from './meetings-db';

const speakerSchema = z.object({
    name: z.string().min(1, 'Speaker name is required'),
    topic: z.string().min(1, 'Topic is required'),
    type: z.enum(['speaker', 'musical-number']),
});

const MeetingFormSchema = z.object({
    date: z.string().min(1, 'Date is required'),

    meetingType: z.enum([
        'testimony',
        'regular',
        'stake',
        'general',
        'special',
    ]),

    presiding: z.string().min(1, 'Presiding name is required'),
    conducting: z.string().min(1, 'Conducting name is required'),

    announcements: z.string().optional().default(''),

    openingHymnNumber: z.coerce.number().int().positive(
        'Enter a valid opening hymn number'
    ),
    openingHymnTitle: z.string().min(1, 'Opening hymn title is required'),
    openingPrayer: z.string().min(1, 'Opening prayer is required'),

    wardBusiness: z.string().optional().default(''),
    stakeBusiness: z.enum(['true', 'false']),

    sacramentHymnNumber: z.coerce.number().int().positive(
        'Enter a valid sacrament hymn number'
    ),
    sacramentHymnTitle: z.string().min(1, 'Sacrament hymn title is required'),

    speakers: z.string().transform((value, context) => {
        try {
            const parsed = JSON.parse(value);
            const result = z.array(speakerSchema).safeParse(parsed);

            if (!result.success) {
                context.addIssue({
                    code: 'custom',
                    message: 'Enter valid speakers and musical numbers',
                });

                return z.NEVER;
            }

            return result.data;
        } catch {
            context.addIssue({
                code: 'custom',
                message: 'Speakers must contain valid JSON',
            });

            return z.NEVER;
        }
    }),

    closingHymnNumber: z.coerce.number().int().positive(
        'Enter a valid closing hymn number'
    ),
    closingHymnTitle: z.string().min(1, 'Closing hymn title is required'),
    closingPrayer: z.string().min(1, 'Closing prayer is required'),
});

export type State = {
    message?: string;
    errors?: {
        [key: string]: string[] | undefined;
    };
};

function getMeetingData(data: z.infer<typeof MeetingFormSchema>) {
    return {
        date: data.date,
        meetingType: data.meetingType,
        presiding: data.presiding,
        conducting: data.conducting,

        announcements: (data.announcements ?? '')
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean),

        openingHymn: {
            number: data.openingHymnNumber,
            title: data.openingHymnTitle,
        },

        openingPrayer: data.openingPrayer,

        wardBusiness: (data.wardBusiness ?? '')
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean)
            .map((description) => ({ description })),

        stakeBusiness: data.stakeBusiness === 'true',

        sacramentHymn: {
            number: data.sacramentHymnNumber,
            title: data.sacramentHymnTitle,
        },

        speakers: data.speakers,

        closingHymn: {
            number: data.closingHymnNumber,
            title: data.closingHymnTitle,
        },

        closingPrayer: data.closingPrayer,
    };
}

export async function createMeeting(
    prevState: State,
    formData: FormData
): Promise<State> {
    const validatedFields = MeetingFormSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            message: 'Please correct the errors below.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const meetingData = getMeetingData(validatedFields.data);
        await createMeetingInDB(meetingData);
    } catch (error) {
        console.error('Database error creating meeting:', error);
        throw new Error('Failed to create meeting. Please try again.');
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function updateMeeting(
    id: number,
    prevState: State,
    formData: FormData
): Promise<State> {
    const validatedFields = MeetingFormSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            message: 'Please correct the errors below.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const meetingData = getMeetingData(validatedFields.data);
        await updateMeetingInDB(id, meetingData);
    } catch (error) {
        console.error('Database error updating meeting:', error);
        throw new Error('Failed to update meeting. Please try again.');
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function deleteMeeting(formData: FormData): Promise<void> {
    const id = Number(formData.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
        throw new Error('Invalid meeting ID.');
    }

    try {
        await deleteMeetingInDB(id);
    } catch (error) {
        console.error('Database error deleting meeting:', error);
        throw new Error('Failed to delete meeting. Please try again.');
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}
