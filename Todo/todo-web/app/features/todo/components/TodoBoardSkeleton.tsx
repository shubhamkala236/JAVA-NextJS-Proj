import Skeleton from "@/app/components/ui/Skeleton";

/** Mirrors the real layout so the swap-in doesn't shift anything. */
const TodoBoardSkeleton = () => {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading todos">
      <Skeleton className="h-36 rounded-2xl" />

      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-28 rounded-full" />
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default TodoBoardSkeleton;
