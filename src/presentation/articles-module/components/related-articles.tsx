import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import BestArticleCard from "@/presentation/shared/components/custom-components/best-article-card/best-article-card";

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
const RelatedArticles: FC<IPropsComponent> = ({ articles }) => {
  return (
    <section>
      <h4 className="font-bold mb-4">مقالات مرتبط</h4>
      <Swiper
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 1, // 1 slide on small screens
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2, // 2 slides on medium screens
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3, // 3 slides on larger screens
            spaceBetween: 30,
          },
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[FreeMode, Pagination, Navigation]}
        className="mySwiper related-articles-swiper"
      >
        {articles.map((article,index) => (
          <SwiperSlide key={index}>
            <BestArticleCard article={article} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RelatedArticles;
