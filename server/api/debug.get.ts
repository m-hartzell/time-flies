export default defineEventHandler(() => {
  return {
    env: process.env.DATABASE_URL,
    config: useRuntimeConfig()
  }
})