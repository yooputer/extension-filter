import type { Metadata } from "next";
import "./globals.css";
import { FilteredExtensionProvider } from "@/context/FilteredExtensionContext";

export const metadata: Metadata = {
  title: "파일 확장자 차단",
  description: "파일 업로드시 제한할 파일확장자를 설정하는 페이지입니다. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
            <FilteredExtensionProvider>
                <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-2xl mx-auto px-4">
                    {children}
                    </div>
                </div>
            </FilteredExtensionProvider>
        </body>
    </html>
  );
}
