import { IKImage } from 'imagekitio-react';

type AuthLayoutProps = {
  children?: JSX.Element | JSX.Element[];
};

function AuthLayout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="h-lvh flex items-center justify-center py-12">
        {children}
      </div>
      <div className="hidden bg-muted lg:block">
        <IKImage
          path={'/pexels-reneterp-1581384_YsXqfqK84.jpg'}
          className="h-lvh w-full object-cover dark:brightness-[0.2] dark:grayscale"
          loading={'lazy'}
        />
      </div>
    </div>
  );
}

export default AuthLayout;
