import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { sql } from "@vercel/postgres"
import bcrypt from 'bcrypt'
import { z } from 'zod'
// import GitHub from "next-auth/providers/github"
import { authConfig } from "./auth.config"
import { User } from "./app/lib/definitions"

// TODO: crear una funcion getUserByEmail para verificar si un determinado usuario existe en la base de datos
async function getUserByEmail ({ email }: { email: string }): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`
    return user.rows[0]
  } catch (error) {
    throw new Error('Failed to fetch user.')
  }
}

export const {
  handlers: { GET, POST },
  auth, signIn, signOut
} = NextAuth({
  ...authConfig,
  providers: [Credentials({
    async authorize (creadentials) {
      const parsedCredentials = z
        .object({ email: z.string(), password: z.string().min(6) })
        .safeParse(creadentials)

      if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data
        const user = await getUserByEmail({ email })

        if (!user) return null

        const passwordsMatch = await bcrypt.compare(password, user.email)

        if (passwordsMatch) return user
      }
      console.log('Invalid credentials')
      return null
    }

  })]
})
