import { client } from '@api/base'
import { RepositoryState } from '@api/repolist/types'
import { GET_REPO_BY_ID } from '@api/repository/query'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState: RepositoryState = {
  repository: undefined,
  isLoading: false,
  error: null,
}

interface RepositoryVariables {
  owner: string
  name: string
}
export const fetchRepository = createAsyncThunk(
  'repository/fetchRepository',
  async ({ owner, name }: RepositoryVariables) => {
    const variables: RepositoryVariables = {
      owner,
      name,
    }
    const { data } = await client.query({
      query: GET_REPO_BY_ID,
      variables,
    })
    console.log(data)
    return { data }
  }
)

export const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepository.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchRepository.fulfilled, (state, { payload: { data } }) => {
        state.isLoading = false
        state.repository = { ...data.repository }
      })
      .addCase(fetchRepository.rejected, (state, { error }) => {
        state.isLoading = false
        state.error = error.message as string
      })
  },
})
