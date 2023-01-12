import Core from '@alicloud/pop-core'
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
  { url: testIpv4 || 'http://4.ipw.cn', Type: 'A' },
  { url: testIpv6 || 'http://6.ipw.cn', Type: 'AAAA' },
]

export const DomainName = Domain

export const log = (data) => {
  if (data) {
    console.log(`${new Date().toString()}\n${JSON.stringify(data)}\n`)
  }
}

export const request = (info, obj) =>
  new Core(key).request(info, obj, requestOption)
