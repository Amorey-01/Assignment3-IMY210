export const posts = [
  {
    id: 1,
    slug: "getting-started-with-nuxt",
    title: "Getting Started with Nuxt 3",
    author: "John Doe",
    category: "Tech",
    snippet: "Nuxt 3 is a powerful Vue framework that makes building full-stack web applications straightforward and enjoyable.",
    content: `
## Welcome to Nuxt 3

Nuxt 3 is a powerful framework built on top of **Vue 3** that gives you file-based routing, SSR, and much more out of the box.

## Why Use Nuxt?

- File-based routing
- Server-side rendering
- Auto-imports

## Getting Started

Install it with:

\`\`\`bash
npx nuxi@latest init my-app
\`\`\`

Then run \`npm run dev\` and visit \`http://localhost:3000\`.
    `
  },
  {
    id: 2,
    slug: "understanding-docker",
    title: "Understanding Docker for Beginners",
    author: "Jane Smith",
    category: "DevOps",
    snippet: "Docker lets you package your application and all its dependencies into a portable container that runs anywhere.",
    content: `
## What is Docker?

Docker is a platform that allows you to **package applications** into containers — lightweight, portable units that include everything needed to run your app.

## Key Concepts

- **Image**: A blueprint for a container
- **Container**: A running instance of an image
- **Dockerfile**: Instructions to build an image

## Basic Example

\`\`\`dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
\`\`\`

## Why Docker?

It eliminates the classic "it works on my machine" problem by ensuring every environment is identical.
    `
  },
  {
    id: 3,
    slug: "trip-to-drakensberg",
    title: "A Trip to the Drakensberg",
    author: "Lerato Nkosi",
    category: "Travel",
    snippet: "The Drakensberg mountains offer some of the most breathtaking scenery in all of Southern Africa — a must-visit destination.",
    content: `
## The Mountains Await

The **Drakensberg** is the highest mountain range in Southern Africa, stretching across KwaZulu-Natal and into Lesotho.

## Best Time to Visit

Visit between **April and September** for clear skies and mild hiking temperatures. Summer brings thunderstorms but lush greenery.

## Top Activities

- Hiking to Tugela Falls
- Rock art tours (San paintings)
- Birding and wildlife spotting

## Tips

Bring warm layers — temperatures drop sharply at night even in summer.
    `
  },
  {
    id: 4,
    slug: "strapi-rest-api",
    title: "Building REST APIs with Strapi",
    author: "John Doe",
    category: "Tech",
    snippet: "Strapi is an open-source headless CMS that lets you build and manage APIs without writing backend code from scratch.",
    content: `
## What is Strapi?

Strapi is an open-source **headless CMS** that auto-generates a REST (and GraphQL) API from your content types.

## Quick Start

\`\`\`bash
npx create-strapi-app@latest my-project
cd my-project
npm run develop
\`\`\`

## Creating a Content Type

1. Go to **Content-Type Builder**
2. Create a new collection (e.g. "Post")
3. Add fields: title, author, content, category
4. Save and your API is live at \`/api/posts\`

## Fetching Data

\`\`\`js
const res = await fetch('http://localhost:1337/api/posts')
const data = await res.json()
\`\`\`
    `
  },
  {
    id: 5,
    slug: "healthy-eating-habits",
    title: "5 Simple Healthy Eating Habits",
    author: "Sipho Dlamini",
    category: "Lifestyle",
    snippet: "Small, consistent changes to how you eat can make a massive difference to your energy levels and long-term health.",
    content: `
## Start Small

You don't need a dramatic diet overhaul. Small, **consistent changes** compound into big results over time.

## 5 Habits to Build

1. **Drink water first** — Start every morning with a glass of water before coffee or food
2. **Eat more colour** — Aim for 3 different coloured vegetables per day
3. **Slow down** — Chew thoroughly; it takes 20 minutes for your brain to register fullness
4. **Plan your meals** — Spontaneous eating leads to poor choices
5. **Sleep enough** — Poor sleep spikes hunger hormones

## The Bottom Line

Consistency beats perfection. Pick one habit and stick to it for 3 weeks before adding another.
    `
  }
]