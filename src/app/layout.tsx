import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/Header";


const roboto = Roboto({
  subsets: ["latin"], // ラテン文字セットを指定
  weight: ["100", "300", "400", "500", "700", "900"], // 使用するフォントの太さ
  variable: "--font-roboto", // カスタムCSS変数名を指定
});

export const metadata: Metadata = {
  title: "ありがとうの木",
  description: "ありがとうの木",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${roboto.variable} antialiased`}>
      <Header />
        {children}
      </body>
    </html>
  );
}