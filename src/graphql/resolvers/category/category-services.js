import { size } from "lodash"
import slugify from "slugify"

import { CustomError } from "../../app/error"
import { removeRedisCachingUsingKeys } from "../../app/redisHelper"
import CategoryCollection from "../../models/category.js"


export const createCategory = async (inputData, redisClient) => {
    const { description, name, parentId = null } = inputData || {}

    if (!name) throw new CustomError(404, 'Name is required')

    let patentCategory = {}
    if (parentId) {
        patentCategory = await CategoryCollection.findOne({
            _id: parentId
        })
        if (!size(patentCategory)) throw new CustomError(404, `Parent category with id ${parentId} not found`)
        if (patentCategory.level >= 3) {
            throw new CustomError(400, 'Could not add this category as a child')
        }
    }
    const slug = slugify(name, {
        lower: true,
        strict: true,
        trim: true
    })

    const existsCategory = await CategoryCollection.find({
        slug
    })

    if (size(existsCategory)) throw new CustomError(400, 'Category already exists')

    const category = await CategoryCollection.create({
        description,
        slug,
        name,
        parentId,
        level: parentId ? 1 + patentCategory?.level : 0
    })

    await removeRedisCachingUsingKeys(redisClient, 'nestedCategory')
    return category
}

const getAllChildCategoryIds = async (categoryId, results = []) => {
    const childCategories = await CategoryCollection.find({ parentId: categoryId });

    const childIds = results
    for (const childCategory of childCategories) {
        childIds.push(childCategory._id)
        await getAllChildCategoryIds(childCategory._id, childIds);
    }
    return childIds
};

export const deleteCategory = async (inputData = {}, redisClient) => {
    const { categoryId } = inputData
    if (!categoryId) throw new CustomError(404, 'CategoryId is required')
    // Find the category to delete
    const category = await CategoryCollection.findOne({
        _id: categoryId
    })

    if (!category) throw new CustomError(404, `Category with id ${categoryId} not found`)

    // Find all child categories and delete them recursively
    const childIds = await getAllChildCategoryIds(categoryId, [categoryId]);

    if (size(childIds)) await CategoryCollection.deleteMany({ _id: { $in: childIds } })
    await removeRedisCachingUsingKeys(redisClient, 'nestedCategory')
    return {
        message: 'Successfully deleted category',
        code: 200
    }
}

export const updateCategory = async (inputData = {}, redisClient) => {
    const { categoryId, description, name, status } = inputData
    if (!categoryId) throw new CustomError(404, 'Category id required')
    // Find the category to update
    const category = await CategoryCollection.findOne({
        _id: categoryId
    })

    if (!category) throw new CustomError(404, 'Category not found')

    const updateData = {}
    // Preparing update data 
    if (name) {
        const slug = slugify(name, {
            lower: true,
            strict: true,
            trim: true
        })
        updateData.name = name
        updateData.slug = slug
    }
    if (description) updateData.description = description
    if (status && category.status !== status) {
        updateData.status = status

        if (status === 'deactivate') {
            // Find all child categories and update them recursively
            const childIds = await getAllChildCategoryIds(categoryId);
            if (size(childIds)) {
                await CategoryCollection.updateMany({ _id: { $in: childIds } },
                    {
                        $set: {
                            status: 'deactivate'
                        }
                    });
            }
        }
    }

    if (!size(updateData)) {
        throw new CustomError(404, 'Could not update category')
    }
    const updatedCategory = await CategoryCollection.findOneAndUpdate({ _id: categoryId }, updateData)
    await removeRedisCachingUsingKeys(redisClient, 'nestedCategory')
    return updatedCategory
}
