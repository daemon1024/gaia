# Gaia

A web-based feed aggegator to aggregate various blogs written by folks at [OSDC](https://osdc.netlify.app/)

## Setup

Fork and Clone the repository.

```bash

# Install deps
yarn

# Run development server
yarn dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Add your feed

Head to [`gaia.config.js](./gaia.config.js) and append your detailes like

```diff
export default [
        ...
     },
+    {
+      title: "title of your blog",
+      feed: "link to your rss feed"
+    },
];
```

Run `yarn build && yarn start` to check if everything's running fine

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
