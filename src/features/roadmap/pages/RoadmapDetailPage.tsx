import { useMemo } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/ui/Button";
import RoadmapIcon from "../components/RoadmapIcon";
import { RoadmapEmptyState, RoadmapStageCard, RoadmapToolbar } from "../components/RoadmapPath";
import { ConsistencyBanner, RoadmapHeader, RoadmapOverview } from "../components/RoadmapSummary";
import { CARD, PAGE_WRAPPER } from "../roadmap.config"
import { getRoadmapBySlug, type RoadmapCatalogItem } from "../roadmap.data";
import { getRoadmapStats } from "../roadmap.logic";
import { useRoadmapFilters } from "../../../hooks/useRoadmap";

export default function RoadmapDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const roadmap = getRoadmapBySlug(slug);

  if (!roadmap) return <RoadmapNotFound />;

  return <RoadmapDetail key={roadmap.slug} roadmap={roadmap} />;
}

function RoadmapDetail({ roadmap }: { roadmap: RoadmapCatalogItem }) {
  const navigate = useNavigate();
  const stats = useMemo(() => getRoadmapStats(roadmap.stages), [roadmap]);
  const { search, setSearch, status, setStatus, results, reset } = useRoadmapFilters(
    roadmap.stages
  );

  const visibleTopics = results.reduce((count, item) => count + item.topics.length, 0);

  return (
    <div className={PAGE_WRAPPER}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 self-start"
        onClick={() => navigate("/roadmaps")}
      >
        <FiArrowLeft size={14} aria-hidden="true" />
        All roadmaps
      </Button>

      <RoadmapHeader description={roadmap.description} />

      <RoadmapOverview
        title={roadmap.title}
        estimatedDuration={roadmap.estimatedDuration}
        weeklyGoal={roadmap.weeklyGoal}
        stats={stats}
        icon={<RoadmapIcon tech={roadmap.tech} title={roadmap.title} size="lg" />}
      />

      <RoadmapToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <section aria-labelledby="learning-path-heading">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 id="learning-path-heading" className="text-lg font-bold text-[#111827]">
              Your learning path
            </h2>
            <p className="mt-1 text-xs text-[#718096]">
              Progress through the foundations before advancing.
            </p>
          </div>

          <span className="shrink-0 text-xs text-[#8b95a7]" aria-live="polite">
            {visibleTopics} of {stats.totalTopics} topics
          </span>
        </div>

        {results.length === 0 ? (
          <RoadmapEmptyState onReset={reset} />
        ) : (
          <div className="space-y-4">
            {results.map((item) => (
              <RoadmapStageCard key={item.stage.id} stage={item.stage} topics={item.topics} />
            ))}
          </div>
        )}
      </section>

      <ConsistencyBanner />
    </div>
  );
}

function RoadmapNotFound() {
  const navigate = useNavigate();

  return (
    <div className={PAGE_WRAPPER}>
      <div role="alert" className={`mx-auto mt-16 max-w-md p-8 text-center ${CARD}`}>
        <h1 className="text-xl font-bold text-[#111827]">Roadmap not found</h1>
        <p className="mt-2 text-sm text-[#718096]">
          This roadmap doesn’t exist or may have moved.
        </p>
        <div className="mt-6 flex justify-center">
          <Button onClick={() => navigate("/roadmaps")}>Browse roadmaps</Button>
        </div>
      </div>
    </div>
  );
}