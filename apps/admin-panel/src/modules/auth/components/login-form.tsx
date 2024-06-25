import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import useLogin from '../hooks/use-login';
import useGoogleLogin from '../hooks/use-google-login';
import { Separator } from '@/components/ui/separator';

const LoginInputSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Email must be a valid email address.'),
  password: z.string().min(1, 'Password should not be empty.'),
});

function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginInputSchema),
  });
  const { mutate: login, isPending } = useLogin();
  const { mutate: googleLogin, isPending: isGoogleLoginPending } =
    useGoogleLogin();

  const onSubmit = (data: z.infer<typeof LoginInputSchema>) => {
    login(data);
  };

  return (
    <div className="mx-4 sm:mx-auto grid gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold mb-4">Open Dine</h1>
        <h1 className="text-xl font-bold text-left">Login</h1>
        <p className="text-left text-balance text-muted-foreground">
          Enter your email & password below to login to your account
        </p>
      </div>
      <div className="grid gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Login
            </Button>
          </form>
        </Form>
        <Separator className="my-4" />
        <p className="text-left text-balance text-muted-foreground">
          For Restaurant Owner
        </p>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            googleLogin();
          }}
          disabled={isGoogleLoginPending}
        >
          <img
            className="w-4 h-4 mr-2"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          ></img>
          Login with Google
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
