
import { createCategory, deleteCategory, updateCategory } from './category-services';

export default {
    async createCategory(parent, args, context) {
        const inputData = JSON.parse(JSON.stringify(args?.inputData || {}))
        return await createCategory(inputData, context?.redis)
    },
    async deleteCategory(parent, args, context) {
        const inputData = JSON.parse(JSON.stringify(args?.inputData))
        return await deleteCategory(inputData, context?.redis)
    },
    async updateCategory(parent, args, context) {
        const inputData = JSON.parse(JSON.stringify(args?.inputData))
        return await updateCategory(inputData, context?.redis)
    },
}