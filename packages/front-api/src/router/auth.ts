import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { t } from "../trpc";

export const authRouter = t.router({
  signUp: t.procedure
    .input(z.object({ email: z.string().email(), password: z.string().min(6) }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });

      if (user) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      const createdUser = await ctx.prisma.user.create({
        data: {
          email: input.email,
          name: input.email,
        },
      });

      await ctx.prisma.userRole.create({
        data: {
          role: "user",
          userId: createdUser.id,
        },
      });

      // ctx.prisma.credentials.create({
      //   data: {
      //     userId: createdUser.id,
      //     // password:
      //   },
      // })
      // return ctx.prisma..create({
      //   data: { ...input, userId: ctx.user.id },
      // });
    }),
});
