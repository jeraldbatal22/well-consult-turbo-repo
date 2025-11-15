import type { Metadata } from "next";
import localFont from "next/font/local";
import "@repo/ui/styles.css";
import "./globals.css";
import "react-phone-number-input/style.css";
import { ThemeProvider } from "@repo/ui/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/avenir/Avenir-Light-07.ttf",
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Well Consult Patient Web App",
  description: "Well Consult web app for patient appointments, sign in, and management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable}`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
