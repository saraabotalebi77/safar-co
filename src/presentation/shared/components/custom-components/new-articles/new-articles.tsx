import { FC } from "react";
import ArticleCard from "../article-card/article-card";


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
  articles : IArticle[];
}


const NewArticles:FC<IPropsComponent> = ({ articles }) => {

  return (
    <div className="pt-8">
      <h2 className="font-bold text-[22px] my-10 mx-8">بهترین مقالات این ماه</h2>
      {articles.length ? articles.map((article) => (
        
          <ArticleCard key={article.id} article={article} />
      )):
      <p className="text-center">مقاله ای یافت نشد</p>
      }
    </div>
  );
}

export default NewArticles;