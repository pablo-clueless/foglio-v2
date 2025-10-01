import React from "react";
import { Logo } from "../shared";

interface Props {
  children: React.ReactNode;
  screen?: Screen;
}

type Screen = "forgot_password" | "reset_password" | "signin" | "signup";

const AuthLayout = ({ children, screen }: Props) => {
  const backgroundImage = `url('/assets/images/${screen}.jpg')`;

  return (
    <div className="grid h-screen w-screen grid-cols-2">
      <div
        className="relative h-full flex-1 bg-black/50 bg-cover bg-center bg-no-repeat bg-blend-overlay"
        style={{ backgroundImage }}
      >
        <Logo className="absolute top-4 left-4" />
      </div>
      <div className="relative flex h-full flex-1 flex-col items-center justify-between py-10">
        <div></div>
        <div>{children}</div>
        <p className="text-sm font-medium">Foglio &copy;{new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default AuthLayout;
