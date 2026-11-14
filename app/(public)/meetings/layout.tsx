import Link from "next/link";

export default function MeetingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
            <nav aria-label="Meetings navigation" className="mb-6 flex gap-6 border-b border-gray-200 pb-4">
                <Link
                    href="/meetings"
                    className="font-medium text-blue-900 hover:underline"
                >
                    All Meetings
                </Link>

                <Link
                    href="/meetings/current"
                    className="font-medium text-blue-900 hover:underline"
                >
                    This Sunday
                </Link>
            </nav>

            {children}
        </div>
    );
}