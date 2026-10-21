import { useParams } from "react-router-dom";

import Button from "../../../components/ui/Button";
import ConceptDetail from "../component/ConceptDetail";
import { CARD, PAGE_WRAPPER } from "../concepts.config";
import { CONCEPTS, getConceptBySlug } from "../concepts.data";
import { getRelatedConcepts } from "../concepts.logic";
import { useNavigate } from "react-router-dom";

export default function ConceptDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const concept = getConceptBySlug(slug);

  if (!concept) return <ConceptNotFound />;

  const related = getRelatedConcepts(concept, CONCEPTS);

  return (
    <div className={PAGE_WRAPPER}>
      <ConceptDetail concept={concept} related={related} />
    </div>
  );
}

function ConceptNotFound() {
  const navigate = useNavigate();

  return (
    <div className={PAGE_WRAPPER}>
      <div role="alert" className={`mx-auto mt-16 max-w-md p-8 text-center ${CARD}`}>
        <h1 className="text-xl font-bold text-[#111827]">Concept not found</h1>
        <p className="mt-2 text-sm text-[#718096]">
          This concept doesn’t exist or may have moved.
        </p>
        <div className="mt-6 flex justify-center">
          <Button onClick={() => navigate("/concepts")}>Browse concepts</Button>
        </div>
      </div>
    </div>
  );
}