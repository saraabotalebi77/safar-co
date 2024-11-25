import CkEditor from "@/presentation/shared/components/custom-components/ui/ck-editor";
import { FC, useContext, useEffect, useState } from "react";
import { FormElementEvent } from "@/presentation/shared/types";
import { MainContext } from "@/presentation/shared/context/context";
import Button from "@/presentation/shared/components/custom-components/ui/button";
import { ComboboxDemo } from "@/presentation/shared/components/shadcn-components/components/ui/comobox";
import { useCustomizedMutation } from "@/presentation/shared/hooks/useCustomizedMutation";
import { editArticle } from "@/infrastructure/api/articleServices";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type TItem = { id: number; name: string };
interface IArticle {
  content: string;
  created_at: string;
  id: number;
  image: string;
  title: string;
  updated_at: string;
  category_id: number;
  city_id: number;
}
interface IPropsComponent {
  cities: TItem[];
  categories: TItem[];
  article: IArticle;
  articleId:string |undefined;
}

const EditExistedArticle: FC<IPropsComponent> = ({
  cities,
  categories,
  article,
  articleId
}) => {
  const { token } = useContext(MainContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(article.image);
  const [image, setImage] = useState<File | undefined>();
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCustomizedMutation(
    ["edit-article"],
    editArticle
  );


  const submitFormHandler = async (e: FormElementEvent) => {
    e.preventDefault();
    if (!title || !content || !city || !category) {
      setValidation("پرکردن تمامی فیلد ها الزامی است");
      return;
    }
    setValidation("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("city_id", city);
    formData.append("category_id", category);
    if (image) {
      formData.append("image", image);
    }
    mutate({ token, data: formData , id:articleId||"" },{
      onSuccess : ()=>{
        navigate("/profile/articles");
        queryClient.refetchQueries({queryKey:["user-articles"]})
        queryClient.refetchQueries({queryKey:["notification"]})
      }
    });
  };
  useEffect(()=>{
    setTitle(article.title);
    setContent(article.content);
    setCity(String(article.city_id));
    setCategory(String(article.category_id));
    setPreviewUrl(article.image);
  },[article])
  return (
    <form
      className="flex flex-col gap-4 border border-[#3779eb] ring-1 ring-accent-200 p-5 rounded-md"
      onSubmit={submitFormHandler}
    >
      <div className="flex items-center gap-2">
        <label htmlFor="title-article">عنوان مقاله : </label>
        <input
          className="grow border border-gray-300 rounded-md p-2 focus:border-[#3779eb] focus:ring-accent-200"
          type="text"
          id="title-article"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row items-center ">
        <div className="w-full lg:w-1/2 inline-flex items-center gap-1">
          <label htmlFor="city">شهر : </label>
          <ComboboxDemo
            items={cities}
            value={city}
            setValue={setCity}
            strSelect="شهر مورد نظر خود را انتخاب کنید"
            strNotFound="شهر مورد نظر یافت نشد"
            width="w-[250px]"
          />
        </div>

        <div className="w-full lg:w-1/2 inline-flex items-center gap-1">
          <label htmlFor="category">دسته بندی : </label>
          <ComboboxDemo
            items={categories}
            value={category}
            setValue={setCategory}
            strSelect="مقاله شما در کدام دسته قرار میگیرد"
            strNotFound="دسته بندی مورد نظر یافت نشد"
            width="w-[250px]"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="w-full inline-flex items-center gap-2">
          <span>عکس : </span>
          <label
            htmlFor="image"
            className="grow border border-gray-300 rounded-lg p-2 relative cursor-pointer"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-1">
              <img src="/assets/images/profile/upload.svg" alt="upload-img" />
              <span className="font-medium text-sm">آپلود عکس</span>
            </div>
            <input
              className="opacity-0"
              type="file"
              id="image"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setImage(e.target.files?.[0]);
                  const reader = new FileReader();
                  reader.readAsDataURL(e.target.files[0]);
                  reader.onloadend = () => {
                    setPreviewUrl(reader?.result);
                  };
                }
              }}
            />
          </label>
        </div>
        <div className="w-full sm:w-1/2 inline-flex justify-end mr-auto">
        {typeof previewUrl == "string" &&  <img src={previewUrl} alt="" className="w-1/2" />}
        </div>

      </div>

      <CkEditor
        data={content}
        onChange={(e, editor) => {
          const content = editor.getData();
          setContent(content);
        }}
      />
      <small
        id="validation"
        className="text-error flex items-center font-medium h-8"
      >
        {validation}
      </small>
      <Button
        type="submit"
        className="flex items-center justify-center self-end h-9 w-[100px] text-sm"
      >
        {!isPending && <span>ویرایش مقاله</span>}
        {isPending && <span className="loading"></span>}
      </Button>
    </form>
  );
};

export default EditExistedArticle;
