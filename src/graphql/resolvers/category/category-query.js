
import { getCategories } from './category-helper'

const CategoryQuery = {
    async getCategories(parent, args, context) {
        return await getCategories(args, context?.redis)
    }
}
export default CategoryQuery