This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# **Divine's Corner**

### **How I approached solving the problem?**

I approached the problem by carefully analyzing the  requirements and breaking the solution into several key components:

1.  **Tools**:
    - Next.js: Since Create React App is being deprecated (as noted on the React website), Next.js is the recommended choice. It also enables me to showcase server-side rendering (SSR), which is important for this project because the events are client-facing and need to be optimized for SEO, ensuring they appear in search results when users look for events.
    
    - SASS: I chose a preprocessor so I can define mixins, functions, and style tokens that capture design decisions. This allows consistent styling across the events application and makes the codebase more maintainable and scalable.

    - date-fns: A lightweight library that makes working with and formatting dates seamles

    - classnames: Utility for cleaner, more readable conditional styling, avoiding complex template literals when applying multiple classes.

