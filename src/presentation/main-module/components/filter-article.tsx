import Button from "@/presentation/shared/components/custom-components/ui/button";
import { useToast } from "@/presentation/shared/components/shadcn-components/hooks/use-toast";
import { useContext } from "react";
import { MainContext } from "@/presentation/shared/context/context";
import { useNavigate , useSearchParams } from "react-router-dom";
import { InputChangeEvent } from "@/presentation/shared/types";

const FilterArticle = () => {
  const { token } = useContext(MainContext);
  const [searchParams,setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const addTourismPalceBtnHandler = () => {
    if (!token) {
      toast({
        title: "ابتدا نیاز است که احراز هویت انجام شود.",
        variant: "error",
      });
    } else {
      navigate("/profile/articles/add");
    }
  };
  const searchInputHandler = (e:InputChangeEvent)=>{
    if(e.target.value.length!==0){
      setSearchParams({
        search : e.target.value
      })
    }else{
      setSearchParams({})
    }
  }
  return (
    <section className="bg-primary-500 text-white rounded-md p-4 py-8 md:px-8 mb-8">
      <div className="w-full m-auto md:w-full ">
        <span className="block font-bold text-sm sm:text-base">
          دیدنی های ایران رو کشف کن!
        </span>

        <div className="flex flex-col-reverse items-center gap-3 md:flex-row justify-between mt-4">
          <div className="w-full  lg:w-1/2 flex flex-col gap-3">
            <div>
              <input
                type="text"
                placeholder="هرجارو میخوای جستجو کن"
                className="bg-[url('/assets/images/search.svg')] bg-no-repeat bg-right w-full  ring-1 focus:ring-2 rounded-md text-black text-sm px-6 py-2 placeholder:text-gray-200"
                onChange={searchInputHandler}
              />
            </div>
            <div className="w-full flex items-center justify-center gap-2 ">
              <span className="font-light text-sm md:texe-base">
                توهم اگر مکان خاصی رو میشناسی به ما معرفی کن
              </span>
              <Button
                className="bg-gray-300 text-black inline-flex justify-center gap-1"
                onClick={addTourismPalceBtnHandler}
              >
                <img
                  src="/assets/images/home/location.svg"
                  alt="location"
                  className="w-4"
                />
                <span className="text-black">افزودن مکان</span>
              </Button>
            </div>
          </div>
          <img
            src="/assets/images/home/map.png"
            alt="map"
            className="w-full sm:w-1/2 aspect-square md:w-1/3 xl:w-1/4"
          />
        </div>
      </div>
    </section>
  );
};

export default FilterArticle;
