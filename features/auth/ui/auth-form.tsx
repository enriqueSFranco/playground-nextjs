'use client';
import { BasicInput } from '@/ui/atoms/BasicInput/BasicInput';
import { Button } from '@/ui/atoms/Button/Button';
import { IconApple } from '@/ui/atoms/Icons/IconApple';
import { IconGoogle } from '@/ui/atoms/Icons/IconGoogle';
import { LoaderCircleIcon, LockKeyholeIcon, MailIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { FormState } from '../types';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type AuthFormProps = {
  type: 'signup' | 'signin';
  actionFn: (
    prevState: FormState | undefined,
    formData: FormData,
  ) => Promise<FormState>;
};
export function AuthForm({ type, actionFn }: AuthFormProps) {
  const router = useRouter()
  const [state, action, pending] = useActionState(actionFn, {
    success: false,
    errors: {},
  });

  useEffect(() => {
    if (!pending) {
      // Flujo de LOGIN
      if (type === 'signin') {
        if (state?.success && state?.data?.email && state?.data?.password) {
          const { email, password } = state.data;
          toast.loading('Iniciando sesión...', { id: 'login-toast' });
          console.log({email, password})

          signIn('credentials', {
            email,
            password,
            redirect: false,
          }).then((result) => {
            toast.dismiss('login-toast');
            if (result?.error) {
              toast.error(
                'Credenciales inválidas. Verifica tu correo y contraseña.',
              );
            } else if (result?.ok) {
              toast.success('¡Bienvenido de nuevo!', {
                duration: 1500,
                onAutoClose: () => {
                  console.log("redireccionando a /resumes")
                  router.push('/resumes');
                },
              });
            }
          });
        } else if (state?.errors?.general) {
          // Mostrar error si la Server Action de login falló
          toast.error(state.errors.general[0]);
        }
      } else if (type === 'signup') {
        if (state?.errors?.general) {
          toast.error(state.errors.general[0]);
        }
      }
    }
  }, [state, pending, router, type]);

  // const formTitle = type === 'signup' ? 'Crear Cuenta' : 'Iniciar Sesión';
  const submitButtonLabel =
    type === 'signup' ? 'Registrarse' : 'Iniciar Sesión';
  const linkText = type === 'signup' ? 'Iniciar sesión' : 'Crear cuenta';
  const linkHref = type === 'signup' ? '/signin' : '/signup';
  const description =
    type === 'signup'
      ? 'Crea una nueva cuenta para acceder a nuestros servicios.'
      : 'Por favor ingresa tu correo electrónico y contraseña para acceder a tu cuenta.';

  return (
    <div className="w-full space-y-4 p-4">
      {/* <h2 className="text-center text-xl font-semibold">{formTitle}</h2> */}
      <form
        id="auth-form"
        action={action}
        className="flex w-full flex-col items-center justify-between gap-10"
        aria-describedby="login-form-description"
        aria-busy={pending}
      >
        <p id="form-description" className="sr-only">
          {description}
        </p>
        <BasicInput
          prefixNode={<MailIcon className="stroke-gray-500" size={18} />}
          label="Correo electronico"
          type="email"
          name="email"
          required
          aria-required="true"
          error={state?.errors?.email?.[0]}
          disabled={pending}
        />
        <BasicInput
          type="password"
          label="Contraseña"
          prefixNode={<LockKeyholeIcon className="stroke-gray-500" size={18} />}
          description="Debe contener al menos 8 caracters"
          name="password"
          minLength={8}
          required
          aria-required="true"
          autoComplete={type === 'signup' ? 'new-password' : 'current-password'}
          error={state?.errors?.password?.[0]}
          disabled={pending}
        />
        {state?.errors?.general && (
          <p className="text-sm text-red-500" role="alert">
            {state.errors.general[0]}
          </p>
        )}
        <Button
          className="w-full"
          disabled={pending}
          rightIcon={
            pending ? (
              <LoaderCircleIcon size={22} className="animate-spin" />
            ) : undefined
          }
          aria-label={submitButtonLabel}
        >
          <span className="font-light text-gray-300">
            {pending
              ? type === 'signup'
                ? 'Registrando...'
                : 'Iniciando...'
              : submitButtonLabel}
          </span>
        </Button>
      </form>
      <div className="flex items-center justify-between gap-2">
        <div className="h-[1px] w-full border-[0.5px] border-gray-200"></div>
        <span className="text-sm">o</span>
        <div className="h-[1px] w-full border-[0.5px] border-gray-200"></div>
      </div>
      <footer className="flex w-full flex-col items-center justify-center space-y-4">
        <Button
          leftIcon={<IconGoogle />}
          className="w-full border-[1px] border-gray-300 font-light text-gray-500"
          variant="ghost"
          onClick={() => signIn('google', { callbackUrl: '/resumes' })}
          disabled={pending}
        >
          <span>Continuar con Google</span>
        </Button>
        <Button
          leftIcon={<IconApple />}
          className="w-full border-[1px] border-gray-300 font-light text-gray-600"
          variant="ghost"
          onClick={() => signIn('apple', { callbackUrl: '/resumes' })}
          disabled={pending}
        >
          <span>Continuar con Apple</span>
        </Button>
        <p className="mt-4 text-center text-sm text-gray-600">
          {type === 'signup'
            ? '¿Ya tienes una cuenta?'
            : '¿Aún no tienes una cuenta?'}{' '}
          <Link
            href={linkHref}
            className="rounded font-semibold text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {linkText}
          </Link>
        </p>
      </footer>
    </div>
  );
}
