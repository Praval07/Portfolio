import { CaseStudySkeleton } from "@/components/ui/Skeleton";

export default function LoadingProjectDetail() {
  return (
    <div className="max-w-[860px] mx-auto px-6 pt-40 pb-20">
      <CaseStudySkeleton />
    </div>
  );
}
