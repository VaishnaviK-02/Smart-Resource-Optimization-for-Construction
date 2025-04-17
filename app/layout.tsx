import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { Toaster } from "@/components/ui/sonner"
import { Toaster as ReactHotToastToaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'CODE_BRIGADE - Smart Construction Resource Management',
  description: 'AI-powered solutions for optimizing construction resource allocation',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} pt-8`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="mx-auto max-w-screen-2xl px-4">
              {children}
            </div>
          </ThemeProvider>
          <Toaster />
          <ReactHotToastToaster />
        </AuthProvider>
      </body>
    </html>
  )
}
