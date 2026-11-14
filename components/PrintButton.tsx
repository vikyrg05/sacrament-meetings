"use client";

export default function PrintButton() {
    return (
        <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-blue-900 px-4 py-2 font-medium text-white hover:bg-blue-800 print:hidden"
        >
            Print Meeting
        </button>
    );
}