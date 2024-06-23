import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function ForgotPasswordForm() {
  return (
    <div className="mx-4 sm:mx-auto grid gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email to receive instructions to reset your password
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email here"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Send
        </Button>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
