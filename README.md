# 📄 Nextjs Boilerplate

A production-ready template for building modern web applications with Next.js, featuring Auth.js, shadcn UI, Prisma ORM, Prettier for code formatting, and Zod for schema validation.

---

## 🚀 Features

- **Next.js**: React framework with SSR and SSG support.
- **Auth.js**: Authentication system with OAuth and credential-based login.
- **shadcn UI**: Pre-styled, accessible components built on Tailwind CSS.
- **Prisma ORM**: Simplifies interaction with MySQL databases.
- **Prettier**: Enforces consistent code formatting across the project.
- **Zod**: Provides easy schema validation for form data and APIs.

## 📦 Tech Stack

- **Framework**: Next.js
- **Authentication**: Auth.js
- **UI Components**: shadcn UI
- **ORM**: Prisma
- **Database**: MySQL
- **Formatter**: Prettier
- **Validation**: Zod

## 🛠 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/omlexi/nextjs-boilerplate.git
cd nextjs-boilerplate
yarn install
```

Configure your database connection in the `.env` file:

```env
AUTH_SECRET="nextjs-boilerplate"
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
DATABASE_URL="mysql://user:password@localhost:3306/nextjs-boilerplate"
NEXTAUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST="http://localhost:3000"
```

Run the development server:

```bash
yarn dev
```

## 🔑 Setting up Authentication

Modify the `auth` configuration in `/src/auth.config.ts` to add OAuth providers or configure custom credentials login.

## 🗃 Database Setup with Prisma

1. Migrate the database schema:

   ```bash
   npx prisma migrate dev --name init
   ```

2. Generate the Prisma client:

   ```bash
   npx prisma generate
   ```

## 📄 License

This project is licensed under the MIT License.
