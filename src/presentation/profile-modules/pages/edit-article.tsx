import { useCustomizedQuery } from "@/presentation/shared/hooks/useCustomizedQuery";
import EditExistedArticle from "../components/edit-existed-article";
import {
  getArticle,
  getCategory,
  getCity,
} from "@/infrastructure/api/articleServices";
import { useContext } from "react";
import { MainContext } from "@/presentation/shared/context/context";
import { Link, useParams } from "react-router-dom";


function EditArticle() {
  const { token } = useContext(MainContext);
  const { articleId } = useParams();

  const { data: cities } = useCustomizedQuery(["city"], () =>
    getCity({ token })
  );

  const { data: categories } = useCustomizedQuery(["category"], () =>
    getCategory({ token })
  );

  const { data : article } = useCustomizedQuery(
    ["article", token],
    () => getArticle({ id: articleId }),
    {
      enabled: !!articleId,
      refetchOnMount: true,
    }
  );


  return (
    <div className="max-w-full md:max-w-[90%] mx-auto">
      <div className="flex items-start justify-between bg-accent-200 rounded-xl p-4 mb-7">
        <h2 className="text-base md:text-lg font-medium">ویرایش مقاله</h2>
        <Link
          to="/profile/articles"
          className="flex items-center gap-1 rounded-md self-end"
        >
          <img
            src="/assets/images/profile/left-arrow.svg"
            className="w-7 h-7"
          />
        </Link>
      </div>
      
      {
        article?.data.id == articleId && article && <EditExistedArticle
        cities={cities?.data || []}
        categories={categories?.data || []}
        article ={article.data}
        articleId = {articleId}
      />
      }
    </div>
  );
}

export default EditArticle;
