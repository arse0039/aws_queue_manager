import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../(contexts)/ThemeProvider";
import NavBar from "../(components)/NavBar";
import AuthProvider from "@/(components)/AuthProvider";
import "./globals.css";
import { isAuthenticated } from "@/utils/amplifyServerUtils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Queue Manager App",
  description: "An application for managing office hour queues for Oregon State University TAs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
    <AuthProvider>
      <ThemeProvider >
        <body className={inter.className}>
          <div className="flex flex-col h-screen max-h-screen">
            <NavBar userLoggedIn={false}/>
            <div className="flex-grow overflow-y-auto bg-page-light dark:bg-page-dark text-default-text-black dark:text-default-text-white">
              {children}
            </div>
          </div>
        </body>
      </ThemeProvider>
    </AuthProvider>
  </html>
  );
}


