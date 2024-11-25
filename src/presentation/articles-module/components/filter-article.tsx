import { Switch } from "@/presentation/shared/components/shadcn-components/components/ui/switch";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ComboboxDemo } from "@/presentation/shared/components/shadcn-components/components/ui/comobox";
import { useCustomizedQuery } from "@/presentation/shared/hooks/useCustomizedQuery";
import { getCategory, getCity } from "@/infrastructure/api/articleServices";
import { MainContext } from "@/presentation/shared/context/context";

const FilterArticle = () => {
  const { token } = useContext(MainContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const { data: cities } = useCustomizedQuery(["city"], () =>
    getCity({ token })
  );
  const { data: categories } = useCustomizedQuery(["category"], () =>
    getCategory({ token })
  );

  const selectedCity = (cityId: string) => {
    setCity(cityId);
    setSearchParams({
      city: cityId,
      category: selectedCategory,
    });
  };

  const switchHandler = (categoryId: number) => {
    let categoriesList = [...selectedCategory];
    if(categoriesList.includes(String(categoryId))){
      const findIndex = categoriesList.findIndex(category=>category==String(categoryId)) 
      categoriesList.splice(findIndex,1);
    }else{
      categoriesList = [
        ...categoriesList , String(categoryId)
      ]
    }
    setSearchParams({
      ...(city && { city }),
      category: [...categoriesList],
    });
    setSelectedCategory(categoriesList);
  };

  useEffect(() => {
    setCity(searchParams.get("city") ? String(searchParams.get("city")) : "");

    setSelectedCategory(
      searchParams.getAll("category") ? searchParams.getAll("category") : []
    );
  }, []);

  return (
    <section className=" text-white rounded-md  bg-primary-600 p-4 py-8 md:px-8">
      <div className="w-full flex flex-col rounded-xl">
        <span className="font-bold">فیلتر کردن مقالات</span>
        <span className="text-sm mb-4">
          میتونی چند تا گزینه رو انتخاب و فیلتر رو اعمال کنی
        </span>
        <ComboboxDemo
          items={cities?.data || []}
          value={city}
          setValue={selectedCity}
          strSelect={"شهر مورد نظر خود را انتخاب کنید"}
          strNotFound={"شهر مورد نظر یافت نشد"}
        />

        <div className="flex flex-wrap gap-4 mb-6 mt-6">
          {categories?.data &&
            categories?.data.map((category, index) => (
              <div key={index} className="flex items-center gap-1">
                <label htmlFor={category.name} className="text-sm">
                  {category.name}
                </label>
                <div className="flex items-center" style={{ direction: "ltr" }}>
                  <Switch
                    id={category.name}
                    onClick={() => switchHandler(category.id)}
                    checked={selectedCategory.includes(String(category.id))}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FilterArticle;
