import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Moon, Package, Settings } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StockMaster",
  description: "Simple stock app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex p-4">
          <h1 className="flex items-center justify-center"><Package />
            <span className="ml-2 text-lg font-semibold">StockMaster</span>
          </h1>
        </header>
        {children}
        <footer className="w-full border-t border-border p-12 flex justify-between">
          <p className="text-muted-foreground text-sm">© 2023 StockMaster Inc. Todos los derechos reservados.</p>
          <div className="flex gap-4 text-primary">
            <button className="hover:bg-secondary rounded-sm p-2"><Settings className="size-6" /></button>
            <button className="hover:bg-secondary rounded-sm p-2"><Moon className="size-6" /></button>
          </div>
        </footer>
      </body>
    </html>
  );
}
