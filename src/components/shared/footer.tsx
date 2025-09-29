import Link from "next/link";
import React from "react";

import { FOOTER_ROUTES } from "@/config/routes";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background w-screen">
      <div className="container mx-auto space-y-3">
        <div className="grid w-full grid-cols-1 py-10 lg:grid-cols-3">
          <div className="col-span-1">
            <div className="flex items-center gap-x-2">
              <Logo className="size-20" />
              <h1 className="text-primary-400 text-6xl font-semibold">Foglio</h1>
            </div>
          </div>
          <div className="col-span-1 flex flex-wrap items-start justify-between lg:col-span-2">
            {FOOTER_ROUTES.map((route, index) => (
              <div className="min-w-[300px] flex-1 space-y-5" key={index}>
                <h4 className="text-lg font-medium">{route.label}</h4>
                <div className="flex flex-col gap-y-2">
                  {route.links.map(({ href, name }, index) => (
                    <Link
                      className="link link-dark hover:text-primary-400 w-fit text-sm"
                      href={href}
                      key={index}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="flex w-full items-center justify-between py-2">
          <p className="text-sm">&copy; {new Date().getFullYear()}. All rights reserved.</p>
          <p className="text-primary-400 text-sm font-medium">Foglio</p>
        </div>
      </div>
    </footer>
  );
};
