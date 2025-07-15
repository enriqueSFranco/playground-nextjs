import { AuthForm } from "@/features/auth/ui/auth-form";
import { signinAction } from "@/lib/actions/auth";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { IconApp } from "@/ui/atoms/Icons/IconApp";
import { LoaderCircleIcon } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  const user = await getCurrentUser();
  const cookieStore = await cookies()
  const hasRegisteredSuccessfully = cookieStore.get('registered_successfully')?.value === 'true'

  if (user) {
    redirect("/resumes")
  }

  return (
    <div className="p-4 bg-white w-full" aria-labelledby="login-form-title">
      <Suspense fallback={
        <div className="flex justify-center items-center h-48">
        <LoaderCircleIcon className="animate-spin text-blue-500" size={32} />
      </div>
      }>
        <div className="w-full flex flex-col items-center justify-center">
          <header className="w-full flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center gap-1">
              <IconApp />
              <h2 className="text-lg capitalize text-black">vitae.<span className="ml-1 text-lg">AI</span></h2>
            </div>
            <h2 className="text-3xl font-light">Bienvenido de nuevo</h2>
            <p className="text-sm text-gray-500">Continúa creando tu CV con IA.</p>
          </header>
          <AuthForm type='signin' actionFn={signinAction} />
        </div>
      </Suspense>
    </div>
  )
}
