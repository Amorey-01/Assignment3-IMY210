# Reflection — IMY 210 Assignment 3

## GitHub Repository
[paste your GitHub repo link here]

## Experience

Working with Docker and Strapi for the first time was both challenging and rewarding. 
Setting up Strapi as a headless CMS was relatively straightforward using the quick-start 
guide, but understanding how the API structure worked — particularly how Strapi wraps 
responses in a `data` array with an `attributes` object — took some time to figure out. 
Once I understood the response format, integrating it with Nuxt using `useFetch` became 
much cleaner.

The biggest challenge was configuring the content types correctly in Strapi and ensuring 
the public permissions were set so the Nuxt frontend could access the API without 
authentication errors. I also ran into issues with the slug field not being recognised 
until I attached it to the title field properly.

Docker was the most unfamiliar part of the assignment. Understanding the difference between 
images and containers, and how a Dockerfile builds an environment layer by layer, required 
careful reading of the documentation. Writing separate Dockerfiles for the Nuxt and Strapi 
instances taught me how to think about each part of an application as an isolated service.

Overall this assignment gave me a much better understanding of the Jamstack architecture — 
how a headless CMS like Strapi can serve content to any frontend via an API, and how Docker 
ensures that the application runs consistently regardless of the environment it is deployed in.

## Commands to Run

### Strapi (Backend)
```bash
docker build -t strapi-blog .
docker run -p 1337:1337 strapi-blog
```

### Nuxt (Frontend)
```bash
docker build -t nuxt-blog .
docker run -p 3000:3000 nuxt-blog
```