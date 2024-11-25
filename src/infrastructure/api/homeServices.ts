import http from "../utils/httpService";
import handleError from "../utils/handle-error";

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
type TArticles = {
  data: IArticle[];
};

const getAllArticles = ({
  query,
}: {
  query: string | undefined;
}): Promise<TArticles> => {
  return handleError(() =>
    http.get(`api/auth/articles/title-filter?title=${query ? query : ""}`)
  );
};

export { getAllArticles };
