import Link from "next/link";
import { connection } from "next/server";
import NavLinks from "./NavLinks";

export default async function Header() {
    await connection();

    const currentDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeZone: "America/La_Paz",
    }).format(new Date());

    return (
        <header className="bg-blue-900 text-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                <div>
                    <p className="text-sm text-blue-200">Rosedal Ward</p>

                    <Link href="/" className="text-xl font-bold">
                        Sacrament Meeting Planner
                    </Link>

                    <p className="mt-1 text-sm text-blue-200">
                        {currentDate}
                    </p>
                </div>

                <NavLinks />
            </div>
        </header>
    );
}