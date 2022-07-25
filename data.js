import fs from "fs"

export const key = {
  accessKeyId: process.env.Id,
  accessKeySecret: process.env.Secret,
  // securityToken: '<your-sts-token>', // use STS Token
  endpoint: "https://alidns.cn-hangzhou.aliyuncs.com",
  apiVersion: "2015-01-09"
}

export const testIpv4 = "http://4.ipw.cn"

export const testIpv6 = "http://6.ipw.cn"

// export const resources = [{ url: testIpv4, type: "A" }, { url: testIpv6, type: "AAAA" }]
export const resources = [{ url: testIpv4, type: "A" }]

export const DomainName = "naizi.fun"

export const writeLog = log => { if (log) fs.appendFile("./ddns.log", `${new Date().toString()}\n${log}\n`, err => { return writeLog(err) }) }

export const consoleLog = log => { if (log) console.log(`${new Date().toString()}\n${log}\n`) }
