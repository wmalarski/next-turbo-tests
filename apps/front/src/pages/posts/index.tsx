import { Layout } from "@components/Layout/Layout";
import { CreatePostForm } from "@modules/CreatePostForm/CreatePostForm";
import { PostList } from "@modules/PostList/PostList";
import type { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Posts: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <Layout title={t("title")}>
      <main className="container flex flex-col items-center min-h-screen py-16 mx-auto">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Create <span className="text-blue-dark">T3</span> Turbo
        </h1>
        <CreatePostForm />
        <PostList />
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

export default Posts;
