import fetcher from "./fetcher";

// export const auth = (mode: 'signin' | 'signup', body:{email: string; password: string}) => {
//   return fetcher(`/${mode}`, body)
// }

export const auth = (mode: string, body: any) => {
  // console.log(mode, body)
  return fetcher(`/${mode}`, body)
}