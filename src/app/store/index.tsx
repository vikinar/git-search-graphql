import { repositorySlice } from '@entities/repoCard/models/repository'
import { userRepositoriesSlice } from '@entities/repositoryList/models/me'
import { searchRepositoriesSlice } from '@entities/repositoryList/models/search'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    repositories: searchRepositoriesSlice.reducer,
    userRepositories: userRepositoriesSlice.reducer,
    repository: repositorySlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
