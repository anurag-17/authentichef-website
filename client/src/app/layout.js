import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./redux/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OnlineFood",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}></body>
      <Providers >{children}</Providers>
    </html>
  );
}
