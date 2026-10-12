import { useEffect, useMemo, useState } from "react";

import ActivityCard from "../components/ActivityCard";
import ContinueLearningCard from "../components/ContinueLearningCard";
import DashboardError from "../components/DashboardError";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSkeleton from "../components/DashboardSkeleton";
import RecentConceptsCard from "../components/RecentConceptsCard";
import ReviewCard from "../components/ReviewCard";
import StatCard from "../components/StatCard";
import { MOCK_DASHBOARD, PAGE_WRAPPER, type DashboardData } from "../dashboard.config";

async function fetchDashboard(): Promise<DashboardData> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return structuredClone(MOCK_DASHBOARD);
}

function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(null);

    fetchDashboard()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err.message : "Something went wrong.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  return { data, error, loading, reload: () => setAttempt((n) => n + 1) };
}

export default function DashboardPage() {
  const { data, error, loading, reload } = useDashboard();

  const now = useMemo(() => new Date(), []);

  if (loading) return <DashboardSkeleton />;

  if (error || !data) {
    return <DashboardError message={error ?? "Please try again."} onRetry={reload} />;
  }

  const totalMinutes = data.weeklyActivity.reduce((sum, day) => sum + day.minutes, 0);

  return (
    <div className={PAGE_WRAPPER}>
      <DashboardHeader
        firstName={data.user.firstName}
        streakDays={data.streakDays}
        reviewsDue={data.review.total}
        now={now}
      />

      <section
        aria-label="Learning overview"
        className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {data.stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
        <ContinueLearningCard data={data.continueLearning} />
        <ReviewCard data={data.review} />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,1fr)]">
        <ActivityCard activity={data.weeklyActivity} />
        <RecentConceptsCard concepts={data.recentConcepts} />
      </section>

    </div>
  );
}