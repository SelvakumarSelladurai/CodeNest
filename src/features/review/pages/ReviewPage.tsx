import { CONCEPTS } from "../../concepts/concepts.data";
import { PAGE_WRAPPER } from "../review.config";
import { getUpcomingReviews } from "../review.logic";
import { useReviewSession } from "../../../hooks/useReviewSession";
import ReviewComplete from "../components/ReviewComplete";
import ReviewHeader from "../components/ReviewHeader";
import ReviewSession from "../components/ReviewSession";

const UPCOMING = getUpcomingReviews(CONCEPTS);

export default function ReviewPage() {
  const session = useReviewSession(CONCEPTS);

  return (
    <div className={PAGE_WRAPPER}>
      <ReviewHeader total={session.total} completed={session.completed} />

      {session.status === "active" && session.current ? (
        <ReviewSession
          concept={session.current}
          position={session.position}
          total={session.total}
          revealed={session.revealed}
          onReveal={session.reveal}
          onRate={session.rate}
        />
      ) : (
        <ReviewComplete
          status={session.status === "empty" ? "empty" : "complete"}
          summary={session.summary}
          results={session.results}
          upcoming={UPCOMING}
          onRestart={session.restart}
        />
      )}
    </div>
  );
}