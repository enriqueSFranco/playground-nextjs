'use server';

import { FormState } from '@/features/auth/types';
import { SignupFormSchema } from '@/features/auth/schemas';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import { getUsers, addUser } from '../db/mock-users';

export async function signupAction(
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  const cookieStore = await cookies()
  const email = formData.get('email') as string;
  const password = formData.get('password') as string

  if (!email.trim() || !password.trim()) {
    return {
      success: false,
      errors: {
        general: ["Por favor, ingresa tu correo y contraseña."]
      }
    }
  }

  // Validar que el usuario no exista (esta lógica es crucial para un registro real)
  const existingUser = await getUsers().then(users => {
    return users.find(u => u.email === email)
  })

  if (existingUser) {
    return {
      success: false,
      errors: {
        general: ['Ya existe un usuario con este correo electrónico.'],
      },
    };
  }

  console.log('FormData received in Server Action:', {
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // validar los inputs del formulario
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear al usuario en la base de datos
  // Por ahora, lo simulamos agregándolo a usersDB para que el siguiente signIn funcione
  const newUser = { id: nanoid(), email, passwordHash: hashedPassword };
  await addUser(newUser)

  console.log(`usuario creado con credenciales: `, { email, hashedPassword });
  cookieStore.set('registered_successfully', 'true', {
    httpOnly: true,
    maxAge: 60 * 2,
    path: '/signin',
    sameSite: 'lax',
  })
  redirect("/signin");
}

export async function signinAction(state: FormState | undefined, formData: FormData): Promise<FormState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log('FormData received in signinAction:', {
    email: formData.get('email'),
    password: formData.get('password'),
  });

  const users = await getUsers()
  const existingUser = users.find(u => u.email === email)

  if (!existingUser || !(await bcrypt.compare(password, existingUser.passwordHash))) {
    return {
      success: false,
      errors: { general: ["Credenciales inválidas. Verifica tu correo y contraseña."] },
    }
  }

  return {
    success: true,
    message: "Credenciales válidas. Procediendo al inicio de sesión...",
    data: {
      email,
      password
    }
  }
}
