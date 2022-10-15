# Learning Turborepo + PNPM + Next.js + tRPC + next-auth.js + tailwindCSS

## Project TODO list

- [x] - app packages
- [x] - api packages ready
- [x] - auth package
- [x] - db package
- [ ] - design system package
- [x] - eslint + prettier package setup
- [ ] - translations
- [ ] - sign up
- [ ] - sign in
- [ ] - social login
- [ ] - forgot password
- [ ] - protected pages using middleware
- [ ] - protected trpc routes
- [ ] - pusher setup
- [ ] - user and post tables
- [ ] - invalidate queries using pusher

## About

Ever wondered how to migrate your T3 application into a monorepo? Stop right here! This is the perfect starter repo to get you running with the perfect stack!

It uses [Turborepo](https://turborepo.org/) and contains:

```graphql
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ admin
  |   ├─ React 18
  |   ├─ TailwindCSS
  |   └─ E2E Typesafe API Server & Client
  ├─ front
  |   ├─ React 18
  |   ├─ TailwindCSS
  |   └─ E2E Typesafe API Server & Client
packages
 ├─ admin-api
 |   └─ tRPC v10 router definition
 ├─ auth
 |   └─ common authorization package
 ├─ db
 |   └─ typesafe db-calls using Prisma
 └─ front-api
     └─ tRPC v10 router definition
```

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

```diff
# Install dependencies
pnpm i

# In packages/db/prisma update schema.prisma provider to use sqlite
# or use your own database provider
- provider = "postgresql"
+ provider = "sqlite"

# Create a `.env` for prisma and make sure it's synced
echo DATABASE_URL=file:./db.sqlite >> packages/db/.env
pnpm db-push
```

Run `pnpm dev` at the project root folder.
