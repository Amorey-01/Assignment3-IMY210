// composables/usePosts.js
export const usePosts = async () => {
  const config = useRuntimeConfig()
  const base = config.public.strapiBase

  const res = await fetch(`${base}/api/posts?populate=*`)
  const json = await res.json()

  // Strapi wraps data in { data: [ { id, attributes: {...} } ] }
  return json.data.map(item => ({
    id: item.id,
    ...item.attributes
  }))
}