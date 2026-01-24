import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aura - Người Bạn Đồng Hành Của Bạn",
  description:
    "Aura là người bạn AI thân thiện, luôn sẵn sàng trò chuyện và hỗ trợ bạn mọi lúc.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
