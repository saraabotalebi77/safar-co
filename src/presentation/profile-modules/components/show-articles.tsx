import ArticleCard from "@/presentation/shared/components/custom-components/article-card/article-card";
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
    articles : IArticle[],
}

const ShowArticles:FC<IPropsComponent> = ({ articles }) => {
  return <>
    {articles.map(article=>(
        <ArticleCard key={article.id} article={article} />
    ))}
  </>;
};

export default ShowArticles;
