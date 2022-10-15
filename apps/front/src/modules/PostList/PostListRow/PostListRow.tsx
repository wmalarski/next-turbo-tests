import type { AppRouterTypes } from "@netr/front-api";
import { ReactElement } from "react";

type Props = {
  post: AppRouterTypes["post"]["all"]["output"][number];
};

export const PostListRow = ({ post }: Props): ReactElement => {
  return (
    <div className="p-4 border-2 border-gray-500 rounded-lg max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
      <p className="text-gray-600">{post.content}</p>
    </div>
  );
};
