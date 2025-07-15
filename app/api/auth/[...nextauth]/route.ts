import NextAuth, { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple';
import bcrypt from 'bcrypt';
import { getUsers } from '@/lib/db/mock-users';

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID as string,
      clientSecret: process.env.APPLE_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Authorize: Credenciales vacías o incompletas.')
          return null
        }
        // buscamos el usuario en la database
        const users = await getUsers()
        const { email, password } = credentials;
        console.log('Authorize: Usuarios en DB simulada:', users.length); // Ver cuántos usuarios hay
        console.log('Authorize: Intentando loguear con email:', email);

        const user = users.find((u) => u.email === email);
        console.log('Authorize: Usuario encontrado (por email):', user ? user.email : 'NO ENCONTRADO');

        if (!user) {
          console.log('Authorize: Usuario no encontrado, devolviendo null.');
          return null
        }

        // Verificamos el password con bcrypt
        const isValid = await bcrypt.compare(password, user.passwordHash);
        console.log('Authorize: Resultado de bcrypt.compare:', isValid);

        if (!isValid) {
          console.log('Authorize: Contraseña no válida, devolviendo null.');
          return null
        }
        console.log('Authorize: Autenticación exitosa. Devolviendo usuario.');
        return { id: user.id, email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
    error: '/signin',
    newUser: "/resumes",
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// Muy buena pregunta: no, el parámetro ?callbackUrl no es obligatorio, pero es una práctica recomendada si quieres que el usuario vuelva automáticamente a la página que intentaba visitar antes de iniciar sesión.

// ✅ ¿Para qué sirve callbackUrl?
// Es una forma flexible y estándar de recordar "de dónde venía el usuario" antes de llegar al login.

// Pero no es la única forma. Te explico las opciones:

// ✅ Opción 1: Usar callbackUrl (recomendado)
// Este enfoque es el más limpio y compatible con next-auth.

// Ventajas:

// Fácil de implementar.

// next-auth ya lo soporta nativamente (por ejemplo, en signIn() puedes pasarle callbackUrl).

// Funciona incluso con proveedores OAuth como Google.

// Cómo se usa:

// ts
// Copy
// Edit
// // Rediriges manualmente con callbackUrl
// router.push('/login?callbackUrl=/resumes');
// En tu login (como ya tienes):

// ts
// Copy
// Edit
// const callbackUrl = (router.query.callbackUrl as string) || '/';
// router.push(callbackUrl);
// ⚙️ Opción 2: Guardar la URL en localStorage o sessionStorage
// Podrías guardar la URL que el usuario quería visitar antes de redirigirlo al login:

// ts
// Copy
// Edit
// // Al intentar acceder a una página protegida
// localStorage.setItem('postLoginRedirect', '/resumes');
// router.push('/login');
// Y luego en el login:

// ts
// Copy
// Edit
// useEffect(() => {
//   if (status === 'authenticated') {
//     const savedUrl = localStorage.getItem('postLoginRedirect') || '/';
//     localStorage.removeItem('postLoginRedirect');
//     router.push(savedUrl);
//   }
// }, [status]);
// Desventaja:
// Esto no funcionará bien con autenticación de terceros (Google, GitHub, etc.) porque localStorage no se conserva durante el redireccionamiento entre dominios.

// 🔁 Opción 3: Manejador en servidor (middleware o SSR)
// Si usas middleware o getServerSideProps, puedes manejar la protección de rutas y redirecciones en el servidor.

// ts
// Copy
// Edit
// // pages/resumes.tsx
// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: `/login?callbackUrl=${encodeURIComponent(context.resolvedUrl)}`,
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }
// 🧠 Conclusión
// Método	¿Funciona bien con OAuth?	¿Persistente en la URL?	Recomendado
// ?callbackUrl	✅ Sí	✅ Sí	✅ Sí
// localStorage	❌ No confiable con OAuth	❌ No	Solo local
// middleware/SSR	✅ Sí	✅ Sí	✅ Sí

// ✅ Usar callbackUrl en la URL es lo más estándar y seguro.
// Solo asegúrate de construir bien la redirección y tener una ruta válida en ese parámetro.

// ¿Te gustaría que revisemos cómo proteger una ruta como /resumes con middleware o getServerSideProps?
