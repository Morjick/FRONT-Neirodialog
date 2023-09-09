export const preFetch: typeof useFetch = async (request, opts?) => {
  const config = useRuntimeConfig()

  return await useFetch(request, { baseURL: config.public.baseURL, ...opts, })
}
