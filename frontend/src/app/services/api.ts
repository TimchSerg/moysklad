import { FetchArgs, createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { getAccessTokenStorage, getRefreshTokenStorage, setBaseTokenStorage } from './tokens'

const baseQuery = fetchBaseQuery(
  { 
    baseUrl: process.env.REACT_APP_HOST ? process.env.REACT_APP_HOST : 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
      const token = getAccessTokenStorage()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      
      return headers
    } 
  })

export const staggeredBaseQueryWithBailOut = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
      // try to get a new token
      const token = getRefreshTokenStorage();
      const arg = {
        url: '/refresh',
        method: 'POST',
        body: { refresh_token: token },
      }
      const refreshResult = await baseQuery(arg, api, extraOptions)
      
      if (refreshResult.data) {
        // store the new token
        setBaseTokenStorage(refreshResult.data)
        // retry the initial query
        result = await baseQuery(args, api, extraOptions)
      } else {
        retry.fail(result.error)
      }
      
    }else if(result.error){
      retry.fail(result.error)
    }

    return result

  },
  {
    maxRetries: 2,
  }
)


/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded 
 */
export const api = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  // reducerPath: 'authApi',
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: staggeredBaseQueryWithBailOut,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: ['Auth', 'Restaurant', 'User', 'Requisites', 'Questionnaire', 'Tasks'],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
})