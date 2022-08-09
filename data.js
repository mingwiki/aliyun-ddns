import Core from '@alicloud/pop-core'
import fs from 'fs'

const { AccessKeyID, AccessKeySecret, testIpv4, testIpv6, Domain } = process.env
const key = {
  accessKeyId: AccessKeyID,
  accessKeySecret: AccessKeySecret,
  // securityToken: "<your-sts-token>", // use STS Token
  endpoint: 'https://alidns.cn-hangzhou.aliyuncs.com',
  apiVersion: '2015-01-09',
}
const requestOption = {
  method: 'POST',
  formatParams: false,
}

export const ipv4AndIpv6 = [
  { file: './ipv4.log', url: testIpv4 || 'http://4.ipw.cn', Type: 'A' },
  { file: './ipv6.log', url: testIpv6 || 'http://6.ipw.cn', Type: 'AAAA' },
]

export const DomainName = Domain

export const log = (data) => {
  if (data) {
    console.log(`${new Date().toString()}\n${data}\n`)
  }
}

export const write = (file, data) => {
  if (data) {
    fs.appendFile(file, `${new Date().toString()}\n${data}\n`, (err) =>
      log(err),
    )
  }
}

export const request = (info, obj) =>
  new Core(key).request(info, obj, requestOption)

export const checkIp = (file, ip) => {
  const oldIP = fs.existsSync(file)
    ? fs
        .readFileSync(file, 'utf-8')
        .split('\n')
        .filter((i) => i)
        .pop()
    : null
  return ip !== oldIP
}
