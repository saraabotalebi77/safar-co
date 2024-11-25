import BestArticleCard from "../best-article-card/best-article-card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
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
  articles: IArticle[];
}

const BestArticles: FC<IPropsComponent> = ({ articles }) => {

  return (
    <div className="mb-8">
      <h2 className="font-bold text-[22px] mb-3 mx-8">مقالات منتخب</h2>
      <Swiper
        spaceBetween={10}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper md:hidden"
      >
        {articles.map((article) => (
          <SwiperSlide key={article.id}>
            <BestArticleCard article={article}/>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hidden md:grid grid-cols-12 gap-5">
        {articles[0] && (
          <div className="col-start-2 col-span-5">
            <BestArticleCard article={articles[0]} />
          </div>
        )}
        {articles[1] && (
          <div className="col-start-7 col-span-5">
            <BestArticleCard article={articles[1]} />
          </div>
        )}
        {articles[2] && (
          <div className="col-start-1 col-span-4">
            <BestArticleCard article={articles[2]} />
          </div>
        )}
        {articles[3] && (
          <div className="col-start-5 col-span-4">
            <BestArticleCard article={articles[3]} />
          </div>
        )}
        {articles[4] && (
          <div className="col-start-9 col-span-4">
            <BestArticleCard article={articles[4]} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BestArticles;
