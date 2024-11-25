import { getAllArticles} from "@/infrastructure/api/homeServices";
import { getAllRatedArticles } from "@/infrastructure/api/articleServices";
import FilterArticle from "../components/filter-article";
import BestArticles from "@/presentation/shared/components/custom-components/best-articles/best-articles";
import NewArticles from "@/presentation/shared/components/custom-components/new-articles/new-articles";
import CustomizedPagination from "@/presentation/shared/components/custom-components/ui/pagination";
import { useCustomizedQuery } from "@/presentation/shared/hooks/useCustomizedQuery";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface IItem {
  id: number;
  name: string;
}
interface IArticle {
  id: number;
  category: IItem;
  image: string;
  title: string;
  description: string;
  created_at: string;
}


const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeArticles, setActiveArticles] = useState<IArticle[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || undefined;


  const { data: articles } = useCustomizedQuery(["home-articles",query], () =>
    getAllArticles({query}),
  {
    staleTime : 1000 * 60 * 2,
    refetchOnMount: true,
  }
  );
  const {data : ratedArticles} = useCustomizedQuery(["rated-articles"],
    ()=>getAllRatedArticles(),
    {
      staleTime: 1000 * 60 * 2,
      refetchOnMount: true,
    }
  )
  let totalPages: number = 1;

 

  if (articles) {
    totalPages =
      Math.trunc(articles.data.length / 6) +
      (articles.data.length % 6 !== 0 ? 1 : 0);
  }


  useEffect(() => {
    if (articles) {
      setActiveArticles(
        articles.data.slice((currentPage - 1) * 6, currentPage * 6 )
      );
    }
  }, [articles, currentPage]);

  return (
    <div>
      <FilterArticle />
      <BestArticles articles={ratedArticles ? ratedArticles.data : []} />
      <NewArticles articles={activeArticles} />
      {totalPages > 1 && (
        <CustomizedPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default Home;
