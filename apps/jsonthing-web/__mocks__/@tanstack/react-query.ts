const useQuery = jest.fn(async ({ queryFn }) => {
    const queryResult = await queryFn()

    return {
        data: queryResult,
    }
})

const useMutation = jest.fn(({ mutationFn }) => ({
    mutate: mutationFn,
}))

const ReactQueryModule = jest.requireActual('@tanstack/react-query')

module.exports = {
    ...ReactQueryModule,
    useMutation,
    useQuery,
}
