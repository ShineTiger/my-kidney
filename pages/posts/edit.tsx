import Layout from "@/components/layout";
import PostInput from "@/components/PostInput";
import PostTextarea from "@/components/PostTextarea";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import useSWR from "swr";

interface GetPostType {
  post:
    | (Post & {
        user: {
          id: string;
          name: string | null;
          image: string | null;
        };
      })
    | null;
  user:
    | {
        id: string;
        name: string | null;
        image: string | null;
      }
    | undefined;
}

function edit() {
  const router = useRouter();
  const { id } = router.query;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR<GetPostType>(id ? `/api/posts/${id}` : null, fetcher);

  const methods = useForm({
    mode: "onChange",
    defaultValues: { title: data?.post?.title, content: data?.post?.content },
  });

  const onValid = (validForm: any) => {
    console.log(validForm);
    fetch(`/api/posts/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validForm),
    })
      .then((res) => router.push(`/posts/${id}`))
      .catch((error) => console.log(`에러입니다:${error}`));
  };
  return (
    <Layout>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onValid)}
          className="w-full max-w-lg my-0 mx-auto"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <PostInput name="title" label="제목" type="text" />
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <PostTextarea name="content" label="내용" />
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button
                className="shadow bg-violet-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                {"발행하기"}
              </button>
            </div>
            <div className="md:w-2/3"></div>
          </div>
        </form>
      </FormProvider>
    </Layout>
  );
}

export default edit;
