import { trpc } from "@utils/trpc";
import { ReactElement } from "react";
import { PostForm, PostFormData } from "./PostForm/PostForm";

export const CreatePostForm = (): ReactElement => {
  const trpcContext = trpc.useContext();
  const mutation = trpc.post.create.useMutation({
    onSuccess: () => {
      trpcContext.post.all.invalidate();
    },
  });

  const handleSubmit = (data: PostFormData) => {
    mutation.mutate(data);
  };

  return <PostForm onSubmit={handleSubmit} />;
};
