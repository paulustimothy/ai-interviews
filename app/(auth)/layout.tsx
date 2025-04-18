import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

// Any page components placed within the (auth) directory will automatically be wrapped by this layout
const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) redirect("/");

  return (
    <div className="auth-layout">{children}</div> //auth-layout is a class name from globals.css
  );
};

export default AuthLayout;
