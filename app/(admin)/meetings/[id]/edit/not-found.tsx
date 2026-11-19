import Link from 'next/link';

export default function NotFound() {
    return (
        <section className="mx-auto max-w-2xl space-y-6 py-12 text-center">
            <h2 className="text-3xl font-bold text-blue-900">
                Meeting Not Found
            </h2>

            <p className="text-gray-600">
                The meeting you are trying to edit does not exist.
                It may have been deleted or the ID may be incorrect.
            </p>

            <Link
                href="/meetings"
                className="inline-block rounded bg-blue-900 px-5 py-2 font-semibold text-white hover:bg-blue-800"
            >
                Back to Meetings
            </Link>
        </section>
    );
}
