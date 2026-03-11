import BookingPageContent from "@/components/booking/BookingPageContent";

export default async function BookingPage({ params }) {
  const { eventSlug } = await params;

  return <BookingPageContent eventSlug={eventSlug} />;
}
