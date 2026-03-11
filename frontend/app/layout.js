import "./globals.css";

export const metadata = {
  title: "Scheduling Platform",
  description: "Calendly-style scheduling platform scaffold"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
