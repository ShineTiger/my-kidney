import { Post } from "@prisma/client";
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import PostInput from "./PostInput";

interface PostType {
  title: string;
  content: string;
}

interface PostFormType {
  fn: (data: any) => void;
  loading: boolean;
  data: { post: Post } | undefined;
  methods: UseFormReturn<FieldValues, any>;
}

const PostForm = ({ loading, data, methods }: PostFormType) => {
  const {
    formState: { errors },
  } = useForm<PostType>({ mode: "onChange" });

  const onSubmit = (data: any) => console.log(data);

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="w-full max-w-lg my-0 mx-auto"
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <PostInput name="title" label="제목" type="text" />
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-200 text-m font-bold mb-2">
            내용
          </label>
          <span className="label-text-alt text-red-600">
            {errors.content ? errors.content.message : ""}
          </span>
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3">
          <button
            className="shadow bg-violet-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {loading ? "발행 중" : "발행하기"}
          </button>
        </div>
        <div className="md:w-2/3"></div>
      </div>
    </form>
  );
};

export default PostForm;
