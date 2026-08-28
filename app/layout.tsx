import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";


const jakarta = Plus_Jakarta_Sans({
  variable:"--font-plus-jakarta",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Nyangu",
  description: "Find the place that feels like home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable}  h-full antialiased`}
    >
      <body className={`${jakarta.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}







