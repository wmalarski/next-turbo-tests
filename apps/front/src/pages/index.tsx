import type { AppRouterTypes } from "@netr/front-api";
import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FormEvent } from "react";
import { Layout } from "../components/Layout/Layout";
import { trpc } from "../utils/trpc";

const PostCard: React.FC<{
  post: AppRouterTypes["post"]["all"]["output"][number];
}> = ({ post }) => {
  return (
    <div className="p-4 border-2 border-gray-500 rounded-lg max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
      <p className="text-gray-600">{post.content}</p>
    </div>
  );
};

const Home: NextPage = () => {
  const { t } = useTranslation("common");

  const trpcContext = trpc.useContext();
  const postQuery = trpc.post.all.useQuery();
  const mutation = trpc.post.create.useMutation({
    onSuccess: () => {
      trpcContext.post.all.invalidate();
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    mutation.mutate({ content, title });
  };

  const session = useSession();

  return (
    <Layout title={t("title")}>
      <main className="container flex flex-col items-center min-h-screen py-16 mx-auto">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Create <span className="text-blue-dark">T3</span> Turbo
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input name="title" type="text" />
          <input name="content" type="text" />
          <button type="submit">Submit</button>
        </form>
        <div className="flex items-center justify-center w-full pt-6 text-2xl text-blue-500">
          {postQuery.data ? (
            <div className="flex flex-col gap-4">
              {postQuery.data?.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          ) : (
            <p>Loading..</p>
          )}
        </div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["common"])),
    },
  };
};

export default Home;
