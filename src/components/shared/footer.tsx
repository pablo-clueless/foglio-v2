"use client";

import Link from "next/link";
import React from "react";

import { FOOTER_ROUTES } from "@/config/routes";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="w-screen bg-black text-white">
      <div className="container mx-auto max-w-6xl space-y-3">
        <div className="grid w-full grid-cols-1 gap-10 py-10 md:grid-cols-3">
          <div className="col-span-1">
            <Link href="/">
              <Logo className="w-80" />
            </Link>
          </div>
          <div className="col-span-1 flex flex-wrap items-start justify-between gap-10 md:col-span-2">
            {FOOTER_ROUTES.map((route, index) => (
              <div className="flex-1 space-y-5" key={index}>
                <h4 className="text-lg font-medium">{route.label}</h4>
                <div className="flex flex-col gap-y-2">
                  {route.links.map(({ href, name }, index) => (
                    <Link className="link link-dark hover:text-primary-400 w-fit text-sm" href={href} key={index}>
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
          <p className="text-sm font-medium text-white">Foglio</p>
        </div>
      </div>
    </footer>
  );
};
