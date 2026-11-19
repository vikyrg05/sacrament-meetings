
'use client';

import { useActionState } from 'react';
import type { SacramentMeeting } from '@/lib/types';
import type { State } from '@/lib/actions';

type MeetingAction = (
    prevState: State,
    formData: FormData
) => Promise<State>;

interface MeetingFormProps {
    action: MeetingAction;
    meeting?: SacramentMeeting;
}

const initialState: State = {};

export default function MeetingForm({
    action,
    meeting,
}: MeetingFormProps) {
    const [state, formAction, isPending] = useActionState(
        action,
        initialState
    );

    const announcements = meeting?.announcements?.join('\n') ?? '';

    const wardBusiness = meeting?.wardBusiness
        .map((item) => item.description)
        .join('\n') ?? '';

    const speakers = JSON.stringify(meeting?.speakers ?? []);

    function getError(field: string) {
        return state.errors?.[field]?.[0];
    }

    return (
        <form action={formAction} className="space-y-6">
            {state.message && (
                <p className="text-red-600" role="alert">
                    {state.message}
                </p>
            )}

            <div>
                <label htmlFor="date" className="block font-medium">
                    Meeting Date
                </label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={meeting?.date ?? ''}
                    aria-describedby="date-error"
                    className="mt-1 w-full rounded border p-2"
                    required
                />
                <p id="date-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('date')}
                </p>
            </div>

            <div>
                <label htmlFor="meetingType" className="block font-medium">
                    Meeting Type
                </label>
                <select
                    id="meetingType"
                    name="meetingType"
                    defaultValue={meeting?.meetingType ?? 'regular'}
                    aria-describedby="meetingType-error"
                    className="mt-1 w-full rounded border p-2"
                >
                    <option value="regular">Regular</option>
                    <option value="testimony">Testimony</option>
                    <option value="stake">Stake</option>
                    <option value="general">General</option>
                    <option value="special">Special</option>
                </select>
                <p id="meetingType-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('meetingType')}
                </p>
            </div>

            <div>
                <label htmlFor="presiding" className="block font-medium">
                    Presiding
                </label>
                <input
                    id="presiding"
                    name="presiding"
                    type="text"
                    defaultValue={meeting?.presiding ?? ''}
                    aria-describedby="presiding-error"
                    className="mt-1 w-full rounded border p-2"
                    required
                />
                <p id="presiding-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('presiding')}
                </p>
            </div>

            <div>
                <label htmlFor="conducting" className="block font-medium">
                    Conducting
                </label>
                <input
                    id="conducting"
                    name="conducting"
                    type="text"
                    defaultValue={meeting?.conducting ?? ''}
                    aria-describedby="conducting-error"
                    className="mt-1 w-full rounded border p-2"
                    required
                />
                <p id="conducting-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('conducting')}
                </p>
            </div>

            <div>
                <label htmlFor="announcements" className="block font-medium">
                    Announcements (one per line)
                </label>
                <textarea
                    id="announcements"
                    name="announcements"
                    defaultValue={announcements}
                    aria-describedby="announcements-error"
                    className="mt-1 w-full rounded border p-2"
                    rows={3}
                />
                <p id="announcements-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('announcements')}
                </p>
            </div>

            <h2 className="text-xl font-semibold text-blue-900">
                Opening
            </h2>

            <div>
                <label htmlFor="openingHymnNumber" className="block font-medium">
                    Opening Hymn Number
                </label>
                <input
                    id="openingHymnNumber"
                    name="openingHymnNumber"
                    type="number"
                    min="1"
                    defaultValue={meeting?.openingHymn.number ?? ''}
                    aria-describedby="openingHymnNumber-error"
                    className="mt-1 w-full rounded border p-2"
                    required
                />
                <p id="openingHymnNumber-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('openingHymnNumber')}
                </p>
            </div>

            <div>
                <label htmlFor="openingHymnTitle" className="block font-medium">
                    Opening Hymn Title
                </label>
                <input
                    id="openingHymnTitle"
                    name="openingHymnTitle"
                    type="text"
                    defaultValue={meeting?.openingHymn.title ?? ''}
                    aria-describedby="openingHymnTitle-error"
                    className="mt-1 w-full rounded border p-2"
                    required
                />
                <p id="openingHymnTitle-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('openingHymnTitle')}
                </p>
            </div>

            <div>
                <label htmlFor="openingPrayer" className="block font-medium">
                    Opening Prayer
                </label>
                <input
                    id="openingPrayer"
                    name="openingPrayer"
                    type="text"
                    defaultValue={meeting?.openingPrayer ?? ''}
                    aria-describedby="openingPrayer-error"
                    className="mt-1 w-full rounded border p-2"
                    required
                />
                <p id="openingPrayer-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('openingPrayer')}
                </p>
            </div>

            <h2 className="text-xl font-semibold text-blue-900">
                Ward Business
            </h2>

            <div>
                <label htmlFor="wardBusiness" className="block font-medium">
                    Ward Business (one item per line)
                </label>
                <textarea
                    id="wardBusiness"
                    name="wardBusiness"
                    defaultValue={wardBusiness}
                    aria-describedby="wardBusiness-error"
                    className="mt-1 w-full rounded border p-2"
                    rows={3}
                />
                <p id="wardBusiness-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('wardBusiness')}
                </p>
            </div>

            <div>
                <label htmlFor="stakeBusiness" className="block font-medium">
                    Stake Business
                </label>
                <select
                    id="stakeBusiness"
                    name="stakeBusiness"
                    defaultValue={meeting?.stakeBusiness ? 'true' : 'false'}
                    aria-describedby="stakeBusiness-error"
                    className="mt-1 w-full rounded border p-2"
                >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>
                <p id="stakeBusiness-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('stakeBusiness')}
                </p>
            </div>

            <h2 className="text-xl font-semibold text-blue-900">
                Sacrament
            </h2>

            <div>
                <label htmlFor="sacramentHymnNumber" className="block font-medium">
                    Sacrament Hymn Number
                </label>
                <input
                    id="sacramentHymnNumber"
                    name="sacramentHymnNumber"
                    type="number"
                    min="1"
                    defaultValue={meeting?.sacramentHymn.number ?? ''}
                    aria-describedby="sacramentHymnNumber-error"
                    className="mt-1 w-full rounded border p-2"
                    required
                />
                <p id="sacramentHymnNumber-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('sacramentHymnNumber')}
                </p>
            </div>

            <div>
                <label htmlFor="sacramentHymnTitle" className="block font-medium">
                    Sacrament Hymn Title
                </label>
                <input
                    id="sacramentHymnTitle"
                    name="sacramentHymnTitle"
                    type="text"
                    defaultValue={meeting?.sacramentHymn.title ?? ''}
                    aria-describedby="sacramentHymnTitle-error"
                    className="mt-1 w-full rounded border p-2"
                    required
                />
                <p id="sacramentHymnTitle-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('sacramentHymnTitle')}
                </p>
            </div>

            <div>
                <label htmlFor="speakers" className="block font-medium">
                    Speakers and Musical Numbers (JSON format)
                </label>
                <textarea
                    id="speakers"
                    name="speakers"
                    defaultValue={speakers}
                    aria-describedby="speakers-error speakers-help"
                    className="mt-1 w-full rounded border p-2 font-mono text-sm"
                    rows={5}
                    required
                />
                <p id="speakers-help" className="text-sm text-gray-600">
                    Example: {'[{"name":"John Smith","topic":"Faith","type":"speaker"}]'}
                </p>
                <p id="speakers-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('speakers')}
                </p>
            </div>

            <h2 className="text-xl font-semibold text-blue-900">
                Closing
            </h2>

            <div>
                <label htmlFor="closingHymnNumber" className="block font-medium">
                    Closing Hymn Number
                </label>
                <input
                    id="closingHymnNumber"
                    name="closingHymnNumber"
                    type="number"
                    min="1"
                    defaultValue={meeting?.closingHymn.number ?? ''}
                    aria-describedby="closingHymnNumber-error"
                    className="mt-1 w-full rounded border p-2"
                    required
                />
                <p id="closingHymnNumber-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('closingHymnNumber')}
                </p>
            </div>

            <div>
                <label htmlFor="closingHymnTitle" className="block font-medium">
                    Closing Hymn Title
                </label>
                <input
                    id="closingHymnTitle"
                    name="closingHymnTitle"
                    type="text"
                    defaultValue={meeting?.closingHymn.title ?? ''}
                    aria-describedby="closingHymnTitle-error"
                    className="mt-1 w-full rounded border p-2"
                    required
                />
                <p id="closingHymnTitle-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('closingHymnTitle')}
                </p>
            </div>

            <div>
                <label htmlFor="closingPrayer" className="block font-medium">
                    Closing Prayer
                </label>
                <input
                    id="closingPrayer"
                    name="closingPrayer"
                    type="text"
                    defaultValue={meeting?.closingPrayer ?? ''}
                    aria-describedby="closingPrayer-error"
                    className="mt-1 w-full rounded border p-2"
                    required
                />
                <p id="closingPrayer-error" aria-live="polite" className="text-sm text-red-600">
                    {getError('closingPrayer')}
                </p>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="rounded bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
            >
                {isPending
                    ? 'Saving...'
                    : meeting
                        ? 'Update Meeting'
                        : 'Create Meeting'}
            </button>
        </form>
    );
}
