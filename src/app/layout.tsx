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
      <body className={`${rubik.className} px-8 sm:px-16 md:px-24 `}>
        {children}
        <div className="absolute min-h-[100vh] top-0 left-0 w-[100vw] -z-20 bg-lightGray xl:bg-light-desktop xl:bg-clip-border">
          <div className="xl:hidden absolute rounded-full top-[40%] sm:top-0 -translate-x-1/2 -translate-y-1/2 w-[112vh] h-[112vh] -z-10 bg-lightBlue"></div>
          <div className="xl:hidden absolute rounded-full top-[40%] sm:top-0 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] -z-10 bg-lightGray"></div>
         </div>
      </body>
    </html>
  );
}
