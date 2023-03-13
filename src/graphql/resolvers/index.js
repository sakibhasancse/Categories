import { CategoryMutations, CategoryQuery } from './category';

const resolvers = {
    Query: {
        ...CategoryQuery
    },
    Mutation: {
        ...CategoryMutations,
    }
}

export default resolvers;