import { useTranslation } from "next-i18next";
import { FormEvent, ReactElement } from "react";
import { z } from "zod";

const schema = z.object({
  content: z.string(),
  title: z.string().min(1),
});

export type PostFormData = z.infer<typeof schema>;

type Props = {
  onSubmit: (args: PostFormData) => void;
};

export const PostForm = ({ onSubmit }: Props): ReactElement => {
  const { t } = useTranslation("common", { keyPrefix: "PostForm" });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const result = schema.safeParse(Object.fromEntries(data.entries()));

    if (!result.success) {
      return;
    }

    onSubmit(result.data);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <input name="title" type="text" />
      <input name="content" type="text" />
      <button type="submit">{t("submit")}</button>
    </form>
  );
};
