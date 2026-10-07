import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useAuth } from '@/contexts/AuthContext'
import type { Post } from '@/schemas/postSchema'
import { ApiError } from '@/services/api'
import { fetchPostsByUser } from '@/services/postService'

export interface UseAdminPostsResult {
  posts: Post[]
  isLoading: boolean
  error: string | null
  addPost: (post: Post) => void
  updatePostInList: (post: Post) => void
  removePost: (postId: number) => void
  refresh: () => Promise<void>
}

const AdminPostsContext = createContext<UseAdminPostsResult | null>(null)

export interface AdminPostsProviderProps {
  children: ReactNode
}

export function AdminPostsProvider({ children }: AdminPostsProviderProps) {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(user))
  const [error, setError] = useState<string | null>(null)

  // A DummyJSON simula o CRUD sem persistir no backend. Posts criados ou editados são mantidos em estado local na sessão.
  useEffect(() => {
    if (!user) {
      return
    }

    let isMounted = true

    async function loadInitialPosts(userId: number) {
      try {
        const data = await fetchPostsByUser(userId)
        if (isMounted) {
          setPosts(data)
        }
      } catch (err) {
        if (isMounted) {
          if (err instanceof ApiError) {
            setError(err.message)
          } else if (err instanceof Error) {
            setError(err.message)
          } else {
            setError('Ocorreu um erro ao carregar as publicações do usuário.')
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadInitialPosts(user.id)

    return () => {
      isMounted = false
    }
  }, [user])

  const refresh = useCallback(async () => {
    if (!user) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchPostsByUser(user.id)
      setPosts(data)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Ocorreu um erro ao carregar as publicações do usuário.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [user])

  const addPost = useCallback((newPost: Post) => {
    setPosts((prev) => [newPost, ...prev])
  }, [])

  const updatePostInList = useCallback((updatedPost: Post) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    )
  }, [])

  const removePost = useCallback((postId: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId))
  }, [])

  const value = useMemo<UseAdminPostsResult>(
    () => ({
      posts,
      isLoading,
      error,
      addPost,
      updatePostInList,
      removePost,
      refresh,
    }),
    [posts, isLoading, error, addPost, updatePostInList, removePost, refresh],
  )

  return (
    <AdminPostsContext.Provider value={value}>
      {children}
    </AdminPostsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAdminPosts(): UseAdminPostsResult {
  const context = useContext(AdminPostsContext)

  if (!context) {
    throw new Error('useAdminPosts deve ser usado dentro de AdminPostsProvider')
  }

  return context
}
