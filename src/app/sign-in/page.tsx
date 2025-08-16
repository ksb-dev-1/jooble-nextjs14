import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// actions
import {
  githubSigninServerAction,
  googleSigninServerAction,
} from "@/actions/sigin-in-server-actions";

// components
import GoogleSignInButton from "@/components/sign-in/GoogleSignInButton";
import GitHubSignInButton from "@/components/sign-in/GitHubSignInButton";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Securely sign in to Jooble with Google or GitHub",
};

export default async function SignInPage() {
  const session = await auth();
  if (session?.user?.id) redirect("/jobs?page=1");

  return (
    <main className="h-screen flex flex-col items-center justify-center px-4">
      <section className="max-w-xl w-full mx-auto border rounded p-4 sm:p-8">
        <h1 className="font-extrabold text-xl md:text-2xl mb-8 text-center">
          Sign in to <span className="text-primary">Jooble</span>
        </h1>

        <fieldset className="flex flex-col gap-4">
          <form action={googleSigninServerAction}>
            <GoogleSignInButton />
          </form>

          <form action={githubSigninServerAction}>
            <GitHubSignInButton />
          </form>
        </fieldset>

        <footer className="text-sm text-textSecondary mt-4 text-center mx-auto max-w-md">
          <p>
            By signing in, you agree to our{" "}
            <Link
              href="#"
              className="text-primary hover:underline transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="text-primary hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </footer>
      </section>
    </main>
  );
}
