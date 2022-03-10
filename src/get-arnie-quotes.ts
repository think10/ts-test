import { httpGet } from './mock-http-interface'
// 1. Execute a HTTP GET
// 2. If the HTTP status code of the response is 200, push an object to the results array with a single key `"Arnie Quote"` and the HTTP response body's `message` property as the key's associated value.
// 3. If the HTTP status code of the response is not 200, push an object to the results array with a single key `"FAILURE"` and the HTTP response body's `message` property as the key's associated value.

// Finally, the `getArnieQuotes()` function's return value must be a promise that resolves to the overall results array.

// Note that for this challenge, the HTTP calls are mocked. You *must* use the provided `httpGet` function to perform your HTTP requests.
// TODO define this type properly
type TResult = { [key: string]: string }
let responsesCollection = [] as Array<TResult>
export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  const results = await Promise.all(
    urls.map(async (url) => {
      const data = await httpGet(url)
      console.log('data', data)
      if (data.status == 200) {
        let resp = { 'Arnie Quote': JSON.parse(data.body)?.message } as TResult
        return resp
      } else {
        let resp = { FAILURE: JSON.parse(data.body)?.message } as TResult
        return resp
      }
    }),
  )

  console.log('results', JSON.stringify(results))
  // Note that for this challenge, the HTTP calls are mocked. You *must* use the provided `httpGet` function to perform your HTTP requests.
  // console.log('respResult', JSON.stringify(respResult))
  return results
}
