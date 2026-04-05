import Providers from "@/components/Providers";
import "./globals.css";

export const metadata = {
  title: "오점무 & 상식퀴즈 & OOTD & 쇼핑 (Full-Stack)",
  description: "Next.js 풀스택 이커머스 앱",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700;900&family=Noto+Sans+KR:wght@300;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
