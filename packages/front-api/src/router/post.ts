import { z } from "zod";
import { protectedProcedure, t } from "../trpc";

export const postRouter = t.router({
  all: t.procedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
  byId: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(z.object({ content: z.string(), title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: { ...input, userId: ctx.user.id },
      });
    }),
});
