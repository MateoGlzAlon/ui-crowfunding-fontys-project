import localFont from "next/font/local";
import "./globals.css";
import { DATA } from "@/app/data";



export const metadata = {
  title: DATA.projectName,
  description: "Crowdfunding page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
