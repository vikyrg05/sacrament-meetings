import { getMeetings } from "@/lib/meetings-db";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export default async function CurrentMeetingPage() {
    await connection();

    const today = new Date();
    const currentSunday = new Date(today);

    currentSunday.setDate(today.getDate() + (7 - today.getDay()) % 7);

    const sundayDate = [
        currentSunday.getFullYear(),
        String(currentSunday.getMonth() + 1).padStart(2, "0"),
        String(currentSunday.getDate()).padStart(2, "0"),
    ].join("-");

    const meeting = getMeetings(sundayDate)[0];

    if (!meeting) {
        redirect("/meetings");
    }

    redirect(`/meetings/${meeting.id}`);
}
