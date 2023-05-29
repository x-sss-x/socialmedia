import "./globals.css";
import Providers from "./providers";
import { Imprima } from "next/font/google";

const impira = Imprima({
  weight:"400",
  subsets:["latin"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-[100vw] h-[100vh]" style={impira.style}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
