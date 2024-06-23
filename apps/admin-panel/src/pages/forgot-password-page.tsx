import AuthLayout from '@/modules/auth/components/auth-layout';
import ForgotPasswordForm from '@/modules/auth/components/forgot-password-form';

function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
