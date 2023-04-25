export interface Repository {
  description: string
  forkCount: string
  id: number
  name: string
  owner: {
    login: string
  }
  stargazerCount: number
}
export interface RepositoryNode {
  node: Repository
}
export interface RepositoriesState {
  repositories: Repository[] & any
  totalCount: number
  isLoading: boolean
  error: string | null
  searchQuery: string
  currentPage: number
  endCursor?: string | undefined
  hasNextPage?: boolean | undefined
}
