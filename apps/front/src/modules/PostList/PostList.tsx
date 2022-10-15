import { useTranslation } from "next-i18next";
import { ReactElement } from "react";
import { trpc } from "../../utils/trpc";
import { PostListRow } from "./PostListRow/PostListRow";

export const PostList = (): ReactElement => {
  const { t } = useTranslation("common", { keyPrefix: "PostList" });

  const postQuery = trpc.post.all.useQuery();

  return (
    <div className="flex items-center justify-center w-full pt-6 text-2xl text-blue-500">
      {postQuery.data ? (
        <div className="flex flex-col gap-4">
          {postQuery.data?.map((p) => (
            <PostListRow key={p.id} post={p} />
          ))}
        </div>
      ) : (
        <p>{t("loading")}</p>
      )}
    </div>
  );
};
