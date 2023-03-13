import CategoryCollection from "../../models/category"

export const getCategories = async (body = {}, redisClient) => {
  const { queryData = {}, optionData = {} } = body
  const { limit = 50, skip = 0 } = optionData
  const { searchKeyword = '' } = queryData

  // Preparing searchKeyword query
  const query = {}
  if (searchKeyword) {
    const keyword = new RegExp(searchKeyword.trim(), 'i')
    query.$or = [
      { 'name': keyword },
      { 'description': keyword },
      { 'slug': keyword }
    ]
  }

  const cacheResults = await redisClient.get(`nestedCategory-${searchKeyword}-${limit}-${skip}`)

  if (cacheResults) {
    return JSON.parse(cacheResults)
  }

  const categories = await CategoryCollection.find(query)
    .skip(skip)
    .limit(limit)

  const nestedCategory = buildNestedCategory(categories)
  await redisClient.set(`nestedCategory-${searchKeyword}-${limit}-${skip}`, JSON.stringify(nestedCategory), 60 * 60 * 24)

  return nestedCategory
}

const buildNestedCategory = (categories = [], parentId = null) => {
  const nestedCategory = [];

  // Find all child categories of the given parent category
  for (const category of categories) {
    if (category?.parentId == parentId) {
      const categoryNode = {
        _id: category._id,
        createdAt: category.createdAt,
        description: category.description,
        level: category.level,
        name: category.name,
        slug: category.slug,
        status: category.status,
        children: buildNestedCategory(categories, category._id),
      };
      nestedCategory.push(categoryNode);
    }
  }

  return nestedCategory;
}