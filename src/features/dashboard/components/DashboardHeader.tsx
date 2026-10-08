type DashboardHeaderProps = {
  name: string;
};

export default function DashboardHeader({ name }: DashboardHeaderProps) {
  return (
    <div>
      <p className="text-sm font-medium text-primary">Today</p>

      <h1 className="mt-1 text-2xl font-bold tracking-tight">Good evening, {name}</h1>

      <p className="mt-2 text-sm text-base-content/60">
        Continue building knowledge that stays with you.
      </p>
    </div>
  );
}