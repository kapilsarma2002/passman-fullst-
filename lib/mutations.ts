import fetcher from "./fetcher";

// export const auth = (mode: 'signin' | 'signup', body:{email: string; password: string}) => {
//   return fetcher(`/${mode}`, body)
// }

export const auth = (mode: string, body: any) => {
  return fetcher(`/${mode}`, body)
}

export const editAuth = (mode: string, body: any) => {
  return fetcher(`/${mode}/${body.id}`, body)
}