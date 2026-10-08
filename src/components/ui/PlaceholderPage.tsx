type PlaceholderPageProps = {
  title: string;
};

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-8">
      <p className="text-sm font-medium text-primary">CodeNest</p>

      <h1 className="mt-1 text-2xl font-bold">{title}</h1>

      <p className="mt-2 text-sm text-base-content/60">This page will be implemented next.</p>
    </div>
  );
}