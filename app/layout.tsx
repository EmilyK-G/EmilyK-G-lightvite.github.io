import '../styles/globals.css';
import { Dancing_Script } from '@next/font/google';
import InviteProvider from './contexts/inviteContext';

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--dancing-script',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dancingScript.variable} font-sans`}>
      <head />
      <body>
        <InviteProvider>
          {children}
        </InviteProvider>
      </body>
    </html>
  )
}
