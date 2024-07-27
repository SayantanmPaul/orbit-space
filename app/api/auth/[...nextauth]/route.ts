import NextAuth from 'next-auth/next'
import SpotifyProvider from "next-auth/providers/spotify";

const authOptions= NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID || '',
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET ||''
        }),
    ]
})

export {authOptions as GET, authOptions as POST}