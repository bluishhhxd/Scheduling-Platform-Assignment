import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/common/StatCard";
import EventTypeList from "@/components/event-types/EventTypeList";

const mockEventTypes = [
  { id: 1, name: "30 Minute Intro", slug: "30-min-intro", duration: 30, active: true },
  { id: 2, name: "45 Minute Demo", slug: "45-min-demo", duration: 45, active: true }
];

export default function EventTypesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Event Types"
        description="Create and manage the sessions people can book with your default user profile."
        actionLabel="New Event Type"
      />

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Active event types" value="2" helper="Ready for booking links" />
        <StatCard label="Drafts" value="0" helper="No unpublished templates yet" />
        <StatCard label="Public booking pages" value="2" helper="Accessible by event slug" />
      </section>

      <EventTypeList eventTypes={mockEventTypes} />
    </div>
  );
}
