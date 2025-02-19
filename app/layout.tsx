import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/Session/SessionProvider";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: "Orbit-Space",
    template: "%s: Stay productive always",
  },
  description:
    "Orbit Space: A Lofi music application designed to enhance focus, relaxation. Stay productive always depends on your mood.",
  openGraph: {
    title: "Orbit-Space",
    description:
      "A Lofi music application designed to enhance focus, relaxation. Stay productive always depends on your mood.",
    url: "https://orbit-space.vercel.app/",
    siteName: "orbit-space.vercel.app",
    images: [
      {
        url: "/opengraph-image.jpeg",
        width: 800,
        height: 600,
        alt: "Stay productive always",
      },
      {
        url: "/opengraph-image.jpeg",
        width: 1800,
        height: 1600,
        alt: "Stay productive always",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbit-Space",
    description:
      "A Lofi music app designed to help you stay productive, relaxed, and focused—perfect for any mood.",
    site: "@impaul_p78814",
    creator: "@impaul_p78814",
    images: [
      {
        url: "/twitter-image.jpeg",
        alt: "Orbit-Space: A lofi music player with customizable focus and relaxation features",
      },
    ],
  },
  keywords: [
    "Lofi music player",
    "Lofi playlists",
    "Spotify player",
    "Productivity booster",
    "Mood enhancer",
    "Relaxation music",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Toaster position="bottom-right" />
        <SessionProvider>{children}</SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
