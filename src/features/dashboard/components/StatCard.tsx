type StatCardProps = {
  label: string;
  value: string;
  hint: string;
};

export default function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="rounded-xl border border-base-300 bg-base-100 p-5">
      <p className="text-sm font-medium">{label}</p>

      <p className="mt-2 text-2xl font-bold">{value}</p>

      <p className="mt-1 text-sm text-base-content/50">{hint}</p>
    </div>
  );
}