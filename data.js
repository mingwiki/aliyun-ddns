import Core from "@alicloud/pop-core"
import fs from "fs"

const key = {
  accessKeyId: process.env.Id,
  accessKeySecret: process.env.Secret,
  // securityToken: '<your-sts-token>', // use STS Token
  endpoint: "https://alidns.cn-hangzhou.aliyuncs.com",
  apiVersion: "2015-01-09"
}
const requestOption = {
  method: "POST",
  formatParams: false
}
const testIpv4 = "http://4.ipw.cn"
const testIpv6 = "http://6.ipw.cn"

export const ipv4AndIpv6 = [{ url: testIpv4, Type: "A" }, { url: testIpv6, Type: "AAAA" }]

export const DomainName = "naizi.fun"

export const log = data => { if (data) console.log(`${new Date().toString()}\n${data}\n`) }

export const write = data => { if (data) fs.appendFile("./ip.log", `${new Date().toString()}\n${data}\n`, err => log(err)) }

export const request = (info, obj) => new Core(key).request(info, obj, requestOption)
