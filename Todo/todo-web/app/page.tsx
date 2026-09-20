import { Suspense } from "react";

import Container from "@/app/components/layout/Container";
import PageHeader from "@/app/components/layout/PageHeader";
import TodoBoardSkeleton from "@/app/features/todo/components/TodoBoardSkeleton";
import TodoSection from "@/app/features/todo/components/TodoSection";

/**
 * Guarantees a per-request render. Without it, Next's default fetch mode
 * ("auto no cache") would run the request once during `next build` and prerender
 * a static snapshot of the list — and the build would fail whenever the API is
 * down.
 */
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex-1 py-10 sm:py-14">
      <Container className="max-w-3xl">
        <PageHeader title="Todos" subtitle="Everything you're on the hook for." />

        <Suspense fallback={<TodoBoardSkeleton />}>
          <TodoSection />
        </Suspense>
      </Container>
    </main>
  );
}
