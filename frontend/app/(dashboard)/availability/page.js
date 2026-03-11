import PageHeader from "@/components/common/PageHeader";
import AvailabilityOverview from "@/components/availability/AvailabilityOverview";

const mockAvailability = [
  { day: "Monday", hours: "09:00 AM - 05:00 PM" },
  { day: "Tuesday", hours: "09:00 AM - 05:00 PM" },
  { day: "Wednesday", hours: "10:00 AM - 04:00 PM" }
];

export default function AvailabilityPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Availability"
        description="Define when the default user can accept meetings."
        actionLabel="Edit Availability"
      />
      <AvailabilityOverview availability={mockAvailability} />
    </div>
  );
}
