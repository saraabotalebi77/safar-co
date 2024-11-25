import { useCustomizedQuery } from "@/presentation/shared/hooks/useCustomizedQuery";
import AddNewArticle from "../components/add-new-article";
import { getCategory, getCity } from "@/infrastructure/api/articleServices";
import { useContext } from "react";
import { MainContext } from "@/presentation/shared/context/context";
import { Link } from "react-router-dom";
function AddArticle() {
  const { token } = useContext(MainContext);
  const { data: cities } = useCustomizedQuery(["city"], () =>
    getCity({ token })
  );
  const { data: categories } = useCustomizedQuery(["category"], () =>
    getCategory({ token })
  );

  return (
    <div className="max-w-full md:max-w-[90%] mx-auto">
      <div className="flex items-start justify-between bg-accent-200 rounded-xl p-4 mb-7">
        <h2 className="text-base md:text-lg font-medium">ایجاد مقاله جدید</h2>
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
      <AddNewArticle
        cities={cities?.data || []}
        categories={categories?.data || []}
      />
    </div>
  );
}

export default AddArticle;
