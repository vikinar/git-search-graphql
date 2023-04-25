import { lazy } from 'react'
import { Route, Routes } from 'react-router'

import ErrorBoundary from '@src/app/Errors/ErrorBoundary'

const RepoListPage = lazy(() => import('./RepoList'))
const RepoDetailsPage = lazy(() => import('./RepoDetails'))

export const Routing = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<RepoListPage />} />
        <Route path="/:repoId" element={<RepoDetailsPage />} />
      </Routes>
    </ErrorBoundary>
  )
}
