import { size } from "lodash"

export const removeRedisCachingUsingKeys = async (redisClient, value) => {
  try {
    if (!redisClient || !value) return false

    const allKeys = await redisClient.keys('*')
    console.log("Found cache size", size(allKeys))

    if (!size(allKeys)) return false
    const expr = new RegExp(value, "gi")

    const cacheKeys = allKeys.filter(key => expr.test(key))
    console.log("Removable cache found", cacheKeys)

    if (!size(cacheKeys)) return false
    await redisClient.del(cacheKeys)
  } catch (error) {
    console.log("Error happened when removing cache")
  }
}
