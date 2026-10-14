import { PAGE_WRAPPER } from "../dashboard.config";

type DashboardErrorProps = {
  message: string;
  onRetry: () => void;
};

export default function DashboardError({ message, onRetry }: DashboardErrorProps) {
  return (
    <div className={PAGE_WRAPPER}>
      <div
        role="alert"
        className="mx-auto mt-16 max-w-md rounded-xl border border-[#fecaca] bg-white p-6 text-center"
      >
        <h2 className="text-lg font-bold text-[#111827]">We couldn't load your dashboard</h2>
        <p className="mt-2 text-sm text-[#718096]">{message}</p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex h-9 items-center justify-center rounded-lg bg-[#0064F9] px-4 text-sm font-semibold text-white hover:bg-[#0058dc]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}