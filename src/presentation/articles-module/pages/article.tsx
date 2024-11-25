import Comments from "../components/comments";
import RelatedArticles from "../components/related-articles";
import ShowArticle from "../components/show-article";
import Score from "../components/score";
import { useParams } from "react-router-dom";
import { getAllRatedArticles } from "@/infrastructure/api/articleServices";
import { useCustomizedQuery } from "@/presentation/shared/hooks/useCustomizedQuery";

export default function Article() {
  const { articleId } = useParams();
  const { data: ratedArticles } = useCustomizedQuery(
    ["rated-articles"],
    () => getAllRatedArticles(),
    {
      staleTime: 1000 * 60 * 2,
      refetchOnMount: true,
    }
  );

  return (
    <div className="px-2 md:px-8">
      <ShowArticle articleId={articleId} />
      <Score articleId={articleId} />
      <RelatedArticles articles={ratedArticles ? ratedArticles.data : []}  />
      <Comments />
    </div>
  );
}
