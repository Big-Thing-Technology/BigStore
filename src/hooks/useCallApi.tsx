import { notFound, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { AUTH_TOKEN } from '@/constant/token-key'

export const useCallApi = <T, E = {}, B = {}>({
  url,
  options,
  handleError,
  handleSuccess,
  preventLoadingGlobal,
  nonCallInit = false,
}: {
  url: string
  options?: RequestInit
  handleError?: (status: number, message: string) => void
  handleSuccess?: (message: string, data: T) => void
  preventLoadingGlobal?: boolean
  nonCallInit?: boolean
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<T>()
  const [error, setError] = useState<E>()
  const [letCall, setLetCall] = useState<boolean>(!nonCallInit)
  const [isMounted, setIsMounted] = useState(false)
  const [body, setBody] = useState<B>()
  const [urlReplace, setUrlReplace] = useState('')

  const [cookies, , removeCookies] = useCookies([AUTH_TOKEN])

  const router = useRouter()

  const promiseFunc = (body: B, urlReplace?: string) => {
    if (!!urlReplace && urlReplace?.length > 0) {
      setUrlReplace(urlReplace)
    }
    setBody(body)
    setLetCall(true)
  }

  const getData = async () => {
    try {
      const result = await fetch(urlReplace.length > 0 ? urlReplace : url, {
        ...options,
        headers: {
          token: cookies.token,
        },
        body: !!body ? JSON.stringify(body) : undefined,
      })
      const response = await result.json()
      const { status } = response
      if (status === 200) {
        setData(response.data)
        setError(undefined)
        if (handleSuccess) {
          handleSuccess(response.message, response.data)
        }
      }
      if (status === 400) setError(response.data)
      if (status === 401) {
        removeCookies(AUTH_TOKEN)
        router.push('/')
      }
      if (status === 403) {
        router.replace('/403')
      }
      if (status === 404) {
        notFound()
      }
      if (handleError && status !== 200) {
        handleError(status, response.message)
      }
    } catch (err: any) {
      if (handleError) {
        handleError(500, err.message)
      }
    } finally {
      setLoading(false)
      setLetCall(false)
      setUrlReplace('')
      // set global loading
    }
  }

  useEffect(() => {
    if (letCall && isMounted) {
      setLoading(true)
      getData()
      if (!preventLoadingGlobal) {
        // turn off global loading
      }
    }
  }, [letCall, isMounted])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleReset = () => {
    setLoading(false)
    setData(undefined)
    setError(undefined)
    setLetCall(false)
  }

  return {
    handleReset,
    setLetCall,
    loading,
    data,
    error,
    promiseFunc,
  }
}
