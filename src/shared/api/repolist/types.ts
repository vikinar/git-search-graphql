export type Repository = {
  description: string
  forkCount: string
  id: number
  name: string
  owner: {
    login: string
    url: string
    avatarUrl: string
  }
  stargazerCount: number
  updatedAt: string
  languages: {
    edges: [
      {
        node: {
          name: string
        }
      }
    ]
  }
}

export interface RepositoryState {
  repository?: Repository
  isLoading: boolean
  error: any
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
