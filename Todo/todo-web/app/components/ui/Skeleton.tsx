import { cn } from "@/app/lib/cn";

type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className }: SkeletonProps) => {
  return <div aria-hidden="true" className={cn("bg-secondary/15 animate-pulse rounded-lg", className)} />;
};

export default Skeleton;
