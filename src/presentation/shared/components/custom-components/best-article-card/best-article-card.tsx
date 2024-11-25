import { Link } from "react-router-dom";
import { FC } from "react";

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

const BestArticleCard: FC<IPropsComponent> = ({ article }) => {

  return (
    <div className="aspect-[2/1] rounded-[12px] overflow-hidden relative ">
      <img
        className="absolute w-full h-full object-cover"
        src={article.image}
        alt="article-title"
      />
      <div className="absolute w-full h-full p-3 flex flex-col justify-between">
        <span className="mr-auto bg-secondary-300 text-xs p-1 rounded-sm">
          {article.category.name}
        </span>
        <div className="flex items-center justify-between gap-3 text-white">
          <span className="two-line-clamp font-normal text-sm"   dangerouslySetInnerHTML={{ __html: article.description }}/>
          <Link
            to={`/articles/${article.id}`}
            className="whitespace-nowrap border-b pb-[1px]"
          >
            ادامه مطلب
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BestArticleCard;
