"use client";

import Button from "@/app/components/ui/Button";
import Container from "@/app/components/layout/Container";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * The ApiError class does not survive the server-to-client boundary (in
 * production the message is replaced with a generic one), so the copy here stays
 * general. Precise, actionable messages come from the Server Actions instead,
 * which return them as data.
 */
const ErrorPage = ({ reset }: ErrorPageProps) => {
  return (
    <main className="flex-1 py-10 sm:py-14">
      <Container className="max-w-3xl">
        <div className="border-border bg-surface rounded-2xl border p-8 text-center">
          <h1 className="text-xl font-semibold">Couldn&apos;t load your todos</h1>
          <p className="text-muted mx-auto mt-2 max-w-md text-sm">
            The Todo API didn&apos;t respond. Check that the Spring Boot app is running on port
            5000 and that Postgres is up on 5432, then try again.
          </p>
          <div className="mt-6 flex justify-center">
            <Button onClick={reset}>Try again</Button>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ErrorPage;
