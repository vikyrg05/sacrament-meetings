"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MeetingSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const currentQuery = searchParams.get("query") ?? "";

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }

        params.delete("page");

        const queryString = params.toString();

        router.push(queryString ? `${pathname}?${queryString}` : pathname);
    }, 300);

    return (
        <div>
            <label htmlFor="meeting-search" className="sr-only">
                Search meetings
            </label>
            <input
                key={currentQuery}
                id="meeting-search"
                type="search"
                placeholder="Search by speaker, presiding, conducting, or meeting type..."
                defaultValue={currentQuery}
                onChange={(event) => handleSearch(event.target.value)}
                aria-label="Search meetings"
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />
        </div>
    );
}