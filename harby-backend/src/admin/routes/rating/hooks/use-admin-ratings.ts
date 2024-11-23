// use-admin-ratings.ts
import { useAdminCustomQuery } from "medusa-react"

export const useAdminRatings = (
  query: {
    limit?: number
    offset?: number
  } = {}
) => {
  const { data, isLoading, error } = useAdminCustomQuery(
    `/admin/rating`,
    ["rating"],
    query
  )

  return { 
    ratings: data?.ratings ?? [], 
    count: data?.count ?? 0, 
    offset: data?.offset ?? 0,
    limit: data?.limit ?? 20,
    isLoading, 
    error 
  }
}