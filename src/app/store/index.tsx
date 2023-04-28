import { persistReducer, persistStore } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import thunk from 'redux-thunk'

import { repositorySlice } from '@entities/repoCard/models/repository'
import { userRepositoriesSlice } from '@entities/repositoryList/models/me'
import { searchRepositoriesSlice } from '@entities/repositoryList/models/search'
import { configureStore } from '@reduxjs/toolkit'

const persistConfig = {
  key: 'root',
  storage: storageSession,
}

const persistedReducer = persistReducer(
  persistConfig,
  searchRepositoriesSlice.reducer
)

export const store = configureStore({
  reducer: {
    repositories: persistedReducer,
    userRepositories: userRepositoriesSlice.reducer,
    repository: repositorySlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
