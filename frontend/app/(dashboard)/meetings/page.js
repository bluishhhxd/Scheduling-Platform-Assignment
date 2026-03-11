import PageHeader from "@/components/common/PageHeader";
import MeetingList from "@/components/meetings/MeetingList";

const mockMeetings = [
  {
    id: 1,
    title: "Product Intro Call",
    attendee: "Alex Johnson",
    startTime: "2026-03-14 10:00 AM",
    status: "Scheduled"
  },
  {
    id: 2,
    title: "Team Sync",
    attendee: "Priya Sharma",
    startTime: "2026-03-15 02:30 PM",
    status: "Scheduled"
  }
];

export default function MeetingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Meetings"
        description="Review upcoming bookings and placeholders for future meeting actions."
        actionLabel="Export"
      />
      <MeetingList meetings={mockMeetings} />
    </div>
  );
}
