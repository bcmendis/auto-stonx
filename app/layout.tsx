import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Navbar from "@/components/global/Navbar";
import Sidebar from "@/components/global/Sidebar";
import { Toaster } from "@/components/ui/sonner";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "autoStonx",
  description: "Automate your trades to make max gains!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col overflow-hidden h-screen">
          <Navbar />
          <div className="flex h-full">
            <Sidebar />
          {children}
          <Toaster />
          </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
