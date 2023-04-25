import { client } from '@api/base'
import { SEARCH_REPOSITORIES_QUERY } from '@api/repolist/search/query'
import { RepositoriesState, RepositoryNode } from '@api/repolist/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@src/app/store'

const initialState: RepositoriesState = {
  repositories: [],
  totalCount: 1,
  isLoading: false,
  error: null,
  searchQuery: '',
  currentPage: 1,
}

interface SearchRepositoriesVariables {
  query: string
  first: number
  after?: string
}

export const fetchRepositories = createAsyncThunk(
  'repositoryList/fetchSearchRepositories',
  async (
    { searchQuery, currentPage }: { searchQuery: string; currentPage: number },
    { getState }
  ) => {
    const state = getState() as RootState
    const perPage = 10
    const startIndex = (currentPage - 1) * perPage
    const variables: SearchRepositoriesVariables = {
      query: `topic:${searchQuery}`,
      first: perPage,
      after: currentPage !== 1 ? state.repositories.endCursor : undefined,
    }
    const { data } = await client.query({
      query: SEARCH_REPOSITORIES_QUERY,
      variables,
    })
    return { data, startIndex }
  }
)

export const searchRepositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(
        fetchRepositories.fulfilled,
        (state, { payload: { data, startIndex } }) => {
          state.isLoading = false
          state.repositories =
            startIndex === 0 ? data.search.edges : [...data.search.edges]
          state.repositories = state.repositories?.map(
            (repo: RepositoryNode) => ({
              id: repo.node?.id,
              name: repo.node?.name,
              description: repo.node?.description,
              stargazerCount: repo.node?.stargazerCount,
              forkCount: repo.node?.forkCount,
              owner: {
                login: repo.node?.owner.login,
                avatar: repo.node?.owner.avatarUrl,
                url: repo.node?.owner.url,
              },
            })
          )
          state.endCursor = data.search.pageInfo.endCursor
          state.totalCount = data.search.repositoryCount
          state.hasNextPage = data.search.pageInfo.hasNextPage
        }
      )
      .addCase(fetchRepositories.rejected, (state, { error }) => {
        state.isLoading = false
        state.error = error.message as string
      })
  },
})

export const { setSearchQuery, setCurrentPage } =
  searchRepositoriesSlice.actions
