"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav aria-label="Main navigation" className="flex gap-6">
            <Link
                href="/"
                className={pathname === "/" ? "font-bold underline" : "hover:underline"}
            >
                Home
            </Link>

            <Link
                href="/meetings"
                className={
                    pathname.startsWith("/meetings")
                        ? "font-bold underline"
                        : "hover:underline"
                }
            >
                Meetings
            </Link>
        </nav>
    );
}