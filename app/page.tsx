import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-8 py-12 text-center">
      <Image
        src="/globe.svg"
        alt="Illustration of a globe"
        width={180}
        height={180}
        priority
      />

      <div className="max-w-2xl space-y-4">
        <h1 className="text-4xl font-bold text-blue-900">
          Sacrament Meeting Planner
        </h1>

        <p className="text-lg text-gray-600">
          Welcome to the Sacrament Meeting Planner. View meeting schedules,
          participants, hymns, and other important information for upcoming
          sacrament meetings.
        </p>

        <Link
          href="/meetings"
          className="inline-block rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
        >
          View Meetings
        </Link>
      </div>
    </section>
  );
}