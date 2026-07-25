import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Greedy Snake｜經典貪食蛇",
  description: "一款俐落、支援鍵盤與觸控操作的經典貪食蛇遊戲。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
