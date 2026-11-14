"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
    totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const currentPage = Math.max(
        1,
        Number.parseInt(searchParams.get("page") ?? "1", 10) || 1
    );

    function getPageUrl(page: number) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        return `${pathname}?${params.toString()}`;
    }

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav aria-label="Meetings pagination" className="flex items-center justify-center gap-4">
            {currentPage > 1 && (
                <Link
                    href={getPageUrl(currentPage - 1)}
                    className="font-medium text-blue-700 hover:underline"
                >
                    Previous
                </Link>
            )}

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) =>
                    page === currentPage ? (
                        <span
                            key={page}
                            aria-current="page"
                            className="font-bold text-blue-900"
                        >
                            {page}
                        </span>
                    ) : (
                        <Link
                            key={page}
                            href={getPageUrl(page)}
                            className="text-blue-700 hover:underline"
                        >
                            {page}
                        </Link>
                    )
            )}

            {currentPage < totalPages && (
                <Link
                    href={getPageUrl(currentPage + 1)}
                    className="font-medium text-blue-700 hover:underline"
                >
                    Next
                </Link>
            )}
        </nav>
    );
}
