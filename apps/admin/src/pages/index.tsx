import { Layout } from "@components/Layout/Layout";
import type { AppRouterTypes } from "@netr/admin-api";
import { trpc } from "@utils/trpc";
import type { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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

  const postQuery = trpc.post.all.useQuery();

  return (
    <Layout title={t("title")}>
      <main className="container flex flex-col items-center min-h-screen py-16 mx-auto">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Create <span className="text-indigo-500">T3</span> Turbo
        </h1>
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
