import { getMeetings } from "@/lib/meetings-db";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export default async function CurrentMeetingPage() {
    await connection();

    const today = new Date();
    const currentSunday = new Date(today);

    currentSunday.setDate(today.getDate() - today.getDay());

    const sundayDate = [
        currentSunday.getFullYear(),
        String(currentSunday.getMonth() + 1).padStart(2, "0"),
        String(currentSunday.getDate()).padStart(2, "0"),
    ].join("-");

    const meeting = getMeetings(sundayDate)[0];

    if (!meeting) {
        return <p>No meeting is scheduled for this Sunday.</p>;
    }

    redirect(`/meetings/${meeting.id}`);
}
