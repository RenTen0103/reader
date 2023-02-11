import { computeMd5 } from "./md5"

export const fileVerify = (p: string) => {
    computeMd5(p)
}