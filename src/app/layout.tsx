
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { theme } from "@/theme";
import { ThemeProvider } from "@mui/material";
import ClientLocalizationProvider from "./ClientLocalizationProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GSE",
  description: "Prueba tecnica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>

          <ThemeProvider theme={theme}> <ClientLocalizationProvider>{children}</ClientLocalizationProvider></ThemeProvider>

        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
