import AuthLayout from '@/modules/auth/components/auth-layout';
import LoginForm from '@/modules/auth/components/login-form';

function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage;
