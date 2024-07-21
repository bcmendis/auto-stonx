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
          <div className="flex h-screen flex-col overflow-hidden">
            <Navbar />
            <div className="flex h-full">
              <Sidebar />
              {children}
              <Toaster
                position="bottom-center"
                toastOptions={{
                  descriptionClassName: "flex",
                  unstyled: true,
                  classNames: {
                    toast: "flex p-4 w-[300px] items-center justify-center gap-2 bg-white dark:bg-black border rounded-lg text-sm",
                    error: "bg-red-400 text-red-500 border-red-500",
                    success: "bg-orange-100 text-orange-500 border-orange-500",
                    warning: "bg-yellow-100 text-yellow-500 border-yellow-500",
                    info: "bg-blue-100 text-blue-500 border-blue-500",
                  },
                }}
              />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
