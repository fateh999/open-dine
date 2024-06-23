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
        <img
          src="https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Image"
          className="h-lvh w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
