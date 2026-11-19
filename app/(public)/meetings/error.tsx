'use client';

import Link from 'next/link';

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
    return (
        <section className="mx-auto max-w-2xl space-y-6 py-12 text-center">
            <h2 className="text-3xl font-bold text-blue-900">
                Something went wrong!
            </h2>

            <p className="text-gray-600">
                We could not load the meetings. Please try again.
            </p>

            <div className="flex justify-center gap-4">
                <button
                    type="button"
                    onClick={() => reset()}
                    className="rounded bg-blue-900 px-5 py-2 font-semibold text-white hover:bg-blue-800"
                >
                    Try Again
                </button>

                <Link
                    href="/meetings"
                    className="rounded border border-blue-900 px-5 py-2 font-semibold text-blue-900 hover:bg-gray-100"
                >
                    Back to Meetings
                </Link>
            </div>
        </section>
    );
}
