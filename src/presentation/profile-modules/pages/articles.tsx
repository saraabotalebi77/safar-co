import { useContext } from "react";
import { Link } from "react-router-dom";
import { getAllArticlesUser } from "@/infrastructure/api/articleServices";
import { useCustomizedQuery } from "@/presentation/shared/hooks/useCustomizedQuery";
import { MainContext } from "@/presentation/shared/context/context";
import ShowArticles from "@/presentation/profile-modules/components/show-articles";


const Articles = () => {
  const { token } = useContext(MainContext);
  
  const { data } = useCustomizedQuery(["user-articles"], () =>
    getAllArticlesUser({ token })
  );


  return (
    <>
      <div className="max-w-full md:max-w-[90%] mx-auto">
        <div className="flex flex-col items-start justify-between bg-accent-200 rounded-xl py-3 px-2 mb-7">
          <h2 className="text-base md:text-xl font-medium">مقالات من </h2>
          <Link
            to="/profile/articles/add-article"
            className="flex items-center gap-1 bg-secondary-400 text-white text-xs lg:text-sm p-2 rounded-md self-end"
          >
            افزودن مقاله جدید
            <img
              src="/assets/images/profile/add-circle-white.svg"
              className="w-4 h-4"
            />
          </Link>
        </div>
        {data?.data && <ShowArticles articles={data.data} />}
      </div>
    </>
  );
};

export default Articles;
