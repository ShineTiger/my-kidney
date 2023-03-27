import { Post } from "@prisma/client";
import { useFormContext, UseFormRegister } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  type?: string;
}

const PostTextarea = ({ name, label, type }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-200 text-m font-bold mb-2">
        {label}
      </label>
      <textarea
        {...register(name, {
          required: "내용을 입력해주세요",
        })}
        className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
        id={name}
      ></textarea>
      <span className="label-text-alt text-red-600">
        {errors.root && <p className="text-red-600">{errors?.root?.message}</p>}
      </span>
    </div>
  );
};

export default PostTextarea;
