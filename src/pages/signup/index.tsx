import { GithubLogoIcon, GoogleLogoIcon } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import React from "react";

import { useGithubQuery, useGoogleQuery, useSignupMutation } from "@/api/auth";
import AuthLayout from "@/components/layouts/auth";
import { Button } from "@/components/ui/button";
import { Logo, Seo } from "@/components/shared";
import { Input } from "@/components/ui/input";
import type { CreateUserDto } from "@/types";

const initialValues: CreateUserDto = {
  email: "",
  name: "",
  password: "",
};

const Page = () => {
  const [githubOauth, setGithubOauth] = React.useState("");
  const [googleOauth, setGoogleOauth] = React.useState("");
  const router = useRouter();

  const { data: github, isFetching: isUsingGithub } = useGithubQuery(undefined);

  const { data: google, isFetching: isUsingGoogle } = useGoogleQuery(undefined);

  const [signupMutation, { isLoading }] = useSignupMutation();

  const { errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    onSubmit: (values) => {
      signupMutation(values)
        .unwrap()
        .then((res) => {
          console.log({ res });
          router.push("/verification");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    validationSchema: Yup.object({}),
  });

  React.useEffect(() => {
    if (google?.data) {
      setGoogleOauth(google.data);
    }
  }, [google]);

  React.useEffect(() => {
    if (github?.data) {
      setGithubOauth(github.data);
    }
  }, [github]);

  return (
    <>
      <Seo title="Create Account" />
      <AuthLayout screen="signup">
        <div className="flex flex-col items-center gap-y-10">
          <Link href="/">
            <Logo />
          </Link>
          <div className="text-center">
            <h3 className="text-2xl font-medium">Create Account</h3>
            <p className="mt-2 text-gray-600">Welcome to Foglio! Sign up to being to use Foglio.</p>
          </div>
          <form autoComplete="off" className="min-w-[400px] space-y-4" onSubmit={handleSubmit}>
            <Input
              error={{ message: errors.name, touched: touched.name }}
              label="Name"
              name="name"
              onChange={handleChange}
            />
            <Input
              error={{ message: errors.email, touched: touched.email }}
              label="Email"
              name="email"
              onChange={handleChange}
              type="email"
            />
            <Input
              error={{ message: errors.password, touched: touched.password }}
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
            />
            <Button className="w-full" size="sm" type="submit">
              Sign Up
            </Button>
          </form>
          <p className="text-sm">
            Already have an account?{" "}
            <Link className="link" href="/signin">
              Sign In
            </Link>
          </p>
          <div className="w-full space-y-2">
            <Button
              className="w-full"
              disabled={isUsingGithub || isUsingGoogle || isLoading}
              onClick={() => window.open(googleOauth, "_blank")}
              size="sm"
              variant="default-outline"
            >
              <GoogleLogoIcon /> Continue with Google
            </Button>
            <Button
              className="w-full"
              disabled={isUsingGithub || isUsingGoogle || isLoading}
              onClick={() => window.open(githubOauth, "_blank")}
              size="sm"
              variant="default-outline"
            >
              <GithubLogoIcon /> Continue with Github
            </Button>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default Page;
