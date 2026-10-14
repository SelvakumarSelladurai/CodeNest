import { CARD, PAGE_WRAPPER } from "../dashboard.config";

const BLOCK = "animate-pulse rounded-lg bg-[#edf1f6]";

export default function DashboardSkeleton() {
  return (
    <div className={PAGE_WRAPPER} aria-busy="true" aria-label="Loading dashboard">
      <div className={`${BLOCK} h-16 w-72`} />

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={`${BLOCK} h-32`} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
        <div className={`${CARD} ${BLOCK} h-80`} />
        <div className={`${CARD} ${BLOCK} h-80`} />
      </div>
    </div>
  );
}