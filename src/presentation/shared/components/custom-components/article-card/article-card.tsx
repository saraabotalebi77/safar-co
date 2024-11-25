import { Link, useLocation } from "react-router-dom";
import { FC } from "react";
import {
  formatToPersianDate,
  formatTime,
} from "@/presentation/shared/utils/date";

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
interface IPropsComponent {
  article: IArticle;
}

const ArticleCard: FC<IPropsComponent> = ({ article }) => {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-7">
        <div className="aspect-[2/1] relative rounded-[8px] overflow-hidden md:col-span-3 xl:col-span-2">
          <img
            className="w-full h-full object-cover"
            src={article.image}
            alt={article.title}
          />
          <span className="absolute top-[10px] left-[10px] bg-secondary-300 text-xs p-1 rounded-sm">
            {article.category.name}
          </span>
        </div>
        <div className="md:col-span-4 xl:col-span-5 md:flex md:flex-col pr-3">
          <div className="flex justify-between items-center">
            <Link to={`/articles/${article.id}`}>
              <h4 className="font-medium mt-4 mb-1">{article.title}</h4>
            </Link>
            {pathname.includes("/profile/articles") && (
              <Link
                to={`/profile/articles/edit-article/${article.id}`}
                className="text-white text-sm bg-secondary-400 rounded-sm p-1"
              >
                ویرایش
              </Link>
            )}
          </div>

          <p className="text-sm two-line-clamp mb-2"  dangerouslySetInnerHTML={{ __html: article.description }}/>
          
          <div className="flex items-center gap-1 text-sm text-gray-300 mb-1">
            <img src="/assets/images/calendar.svg" />
            <p>{formatToPersianDate(article.created_at)}</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-300 mb-1">
            <img src="/assets/images/clock.svg" />
            <span>{formatTime(article.created_at)}</span>
          </div>
        </div>
      </div>
      <hr className="w-[80%] mx-auto my-4" />
    </div>
  );
};

export default ArticleCard;
