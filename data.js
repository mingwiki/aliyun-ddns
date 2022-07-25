import Core from "@alicloud/pop-core"

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

export const ipv4Only = [{ url: testIpv4, Type: "A" }]

export const DomainName = "naizi.fun"

export const log = log => { if (log) console.log(`${new Date().toString()}\n${log}\n`) }

export const request = (info, obj) => new Core(key).request(info, obj, requestOption)
