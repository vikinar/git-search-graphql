import { client } from '@api/base'
import { OWN_REPOSITORIES_QUERY } from '@api/repolist/me/query'
import { RepositoriesState, Repository } from '@api/repolist/types'
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

interface UserRepositoriesVariables {
  first: number
  after?: string
}

export const fetchUserRepositories = createAsyncThunk(
  'userRepositories/fetchRepositories',
  async ({ currentPage }: { currentPage: number }, { getState }) => {
    const state = getState() as RootState
    const perPage = 10
    const startIndex = (currentPage - 1) * perPage
    const variables: UserRepositoriesVariables = {
      first: perPage,
      after: currentPage !== 1 ? state.userRepositories.endCursor : undefined,
    }
    const { data } = await client.query({
      query: OWN_REPOSITORIES_QUERY,
      variables,
    })
    return { data, startIndex }
  }
)

export const userRepositoriesSlice = createSlice({
  name: 'userRepositories',
  initialState,
  reducers: {
    setUserCurrentPage: (state, { payload }) => {
      state.currentPage = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRepositories.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(
        fetchUserRepositories.fulfilled,
        (state, { payload: { data, startIndex } }) => {
          state.isLoading = false
          state.repositories =
            startIndex === 0
              ? data.viewer.repositories.nodes
              : [...data.viewer.repositories.nodes]
          state.repositories = state.repositories?.map((repo: Repository) => ({
            id: repo?.id,
            name: repo?.name,
            description: repo?.description,
            stargazerCount: repo?.stargazerCount,
            forkCount: repo?.forkCount,
            owner: {
              login: repo?.owner.login,
              avatarUrl: repo.owner.avatarUrl,
              url: repo.owner.url,
            },
          }))
          state.endCursor = data.viewer.repositories.pageInfo?.endCursor
          state.totalCount = data.viewer.repositories.totalCount
          state.hasNextPage = data.viewer.repositories.pageInfo?.hasNextPage
        }
      )
      .addCase(fetchUserRepositories.rejected, (state, { error }) => {
        state.isLoading = false
        state.error = error.message as string
      })
  },
})

export const { setUserCurrentPage } = userRepositoriesSlice.actions
