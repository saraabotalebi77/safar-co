import http from "../utils/httpService";
import handleError from "../utils/handle-error";

interface IItem {
  id: number;
  name: string;
}
interface ICity {
  data: IItem[];
}
interface ICategory {
  data: IItem[];
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
interface ISingleArticle {
  data: {
    content: string;
    created_at: string;
    id: number;
    image: string;
    title: string;
    updated_at: string;
    category_id: number;
    city_id: number;
    user: {
      name: string;
      avatar: string;
    };
  };
}
interface IUserArticles {
  data: IArticle[];
}

const getCity = ({ token }: { token: string | undefined }): Promise<ICity> => {
  return handleError(() =>
    http.get("api/auth/cities", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    })
  );
};

const getCategory = ({
  token,
}: {
  token: undefined | string;
}): Promise<ICategory> => {
  return handleError(() =>
    http.get("api/auth/place-types", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    })
  );
};

const getAllArticles = ({
  query,
}: {
  query: {
    city_id: null | string;
    category_id: string[];
  };
}): Promise<TArticles> => {
  const params = new URLSearchParams();

  if (query.city_id) {
    params.append("city_id", query.city_id);
  }
  if (query.category_id.length > 0) {
    params.append("category_id", query.category_id.join(","));
  }
  const url = `api/auth/articles/filter?${params.toString()}`;

  return handleError(() => http.get(url));
};
const getAllRatedArticles = (): Promise<TArticles> => {
  return handleError(() => http.get("api/auth/articles/top-rated"));
};

const getArticle = ({
  id,
}: {
  id: string | undefined;
}): Promise<ISingleArticle> => {
  return handleError(() => http.get(`api/auth/article/${id}`));
};

const getAllArticlesUser = ({
  token,
}: {
  token: string | undefined;
}): Promise<IUserArticles> => {
  return handleError(() =>
    http.get("api/auth/user/user-articles", {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  );
};

const postArticle = ({
  token,
  data,
}: {
  token: string | undefined;
  data: FormData;
}) => {
  return handleError(() =>
    http.post("api/auth/user/articles/store", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};
const editArticle = ({
  token,
  data,
  id,
}: {
  token: undefined | string;
  data: FormData;
  id: string;
}) => {
  return handleError(() =>
    http.post(`api/auth/articles/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};

const RateArticle = ({
  token,
  article_id,
  rating,
}: {
  token: string | undefined;
  article_id: number;
  rating: number;
}) => {
  return handleError(() =>
    http.post(
      "api/auth/user/ratings",
      {
        rating,
        article_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    )
  );
};

export {
  getCity,
  getCategory,
  getAllArticles,
  getArticle,
  getAllArticlesUser,
  postArticle,
  editArticle,
  RateArticle,
  getAllRatedArticles,
};
