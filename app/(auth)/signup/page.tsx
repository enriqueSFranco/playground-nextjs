import { AuthForm } from "@/features/auth/ui/auth-form";
// import { SignupForm } from "@/features/auth/ui/signup-form";
import { signupAction } from "@/lib/actions/auth";

export default function Page() {


  return (
    <div className="w-full bg-white p-4" aria-labelledby="login-form-title">
      <AuthForm type='signup' actionFn={signupAction} />
    </div>
  );
}
