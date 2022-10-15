import { useMutation } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "../../components/Layout/Layout";

const SignIn: NextPage = () => {
  const { t } = useTranslation("common");

  const mutation = useMutation(async () => {
    const result = await signIn("google");
    return result;
  });

  const handleGoogleClick = () => {
    mutation.mutate();
  };

  const session = useSession();

  return (
    <Layout title={t("title")}>
      <main className="container flex flex-col items-center min-h-screen py-16 mx-auto">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Create <span className="text-blue-dark">T3</span> Turbo
        </h1>
        <button onClick={handleGoogleClick}>Google</button>
        {mutation.status === "loading" && <span>Loading</span>}
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

export default SignIn;
