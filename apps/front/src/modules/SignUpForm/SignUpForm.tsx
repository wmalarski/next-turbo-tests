import { trpc } from "@utils/trpc";
import { useTranslation } from "next-i18next";
import { FormEvent, ReactElement } from "react";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const SignUpForm = (): ReactElement => {
  const { t } = useTranslation("common", { keyPrefix: "PostForm" });

  const trpcContext = trpc.useContext();
  const mutation = trpc.auth.signUp.useMutation({
    onSuccess: () => {
      trpcContext.post.all.invalidate();
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const result = schema.safeParse(Object.fromEntries(data.entries()));

    if (!result.success) {
      return;
    }

    mutation.mutate(result.data);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">{t("submit")}</button>
    </form>
  );
};
