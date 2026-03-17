import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MailIcon, LockIcon, ArrowRightIcon } from "@/components/ui/icons";

export default function LoginPage() {
  return (
    <div className="grid min-h-[calc(100vh-112px)] lg:grid-cols-2">
      {/* Left — Hero Image */}
      <div className="relative hidden lg:block">
        <Image
          src="/images/mission.jpg"
          alt="Child patient receiving care at Surgery Care Foundation"
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-primary/20" />
      </div>

      {/* Right — Login Form */}
      <div className="flex items-center justify-center bg-surface-page px-4 py-16">
        <div className="w-full max-w-md">
          <Heading level="h2" as="h1" className="mb-3">
            Welcome Back
          </Heading>
          <Text variant="secondary" size="body-lg" className="mb-10">
            Log in to continue your impact.
          </Text>

          <form className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={<MailIcon className="size-5" />}
            />

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-label uppercase text-slate-medium">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-label font-bold text-accent transition-colors hover:text-accent-green"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                icon={<LockIcon className="size-5" />}
              />
            </div>

            <Button variant="secondary" size="lg" type="submit" className="w-full gap-2">
              Sign In
              <ArrowRightIcon className="size-5" />
            </Button>
          </form>

          <p className="mt-6 text-center text-body text-slate-medium">
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              className="font-bold text-accent transition-colors hover:text-accent-green"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
