import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import { DASHBOARD_STATS, DASHBOARD_USER_NAME } from "../components/dashboard.data";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-8">
      <DashboardHeader name={DASHBOARD_USER_NAME} />

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard key={stat.id} label={stat.label} value={stat.value} hint={stat.hint} />
        ))}
      </div>
    </div>
  );
}