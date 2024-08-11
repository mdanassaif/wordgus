import './globals.css'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"

const roboto = Roboto({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Enhanced Wordle',
  description: 'A modern Wordle clone built with Next.js and shadcn/ui',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}