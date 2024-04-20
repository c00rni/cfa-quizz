import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

/*export const metadata: Metadata = {
  title: "CFA Quizz",
  description: "Training for CFA exam",
};*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="sm:text-[18px]">
      <body className={`${rubik.className} px-8 sm:px-16 xl:px-24 bg-lightGray bg-fixed bg-cover xl:bg-light-desktop md:bg-light-tablet bg-light-mobile`}>
        {children}
      </body>
    </html>
  );
}
