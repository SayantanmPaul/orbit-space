"use client"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <NextAuthSessionProvider>
            {children}
        </NextAuthSessionProvider>
    )
}

export default SessionProvider
