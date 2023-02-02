import Core from '@alicloud/pop-core'
const {
  AccessKeyID,
  AccessKeySecret,
  testIpv4,
  testIpv6,
  backupIpv4,
  backupIpv6,
  Domain,
} = process.env
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
  { url: testIpv4, backupUrl: backupIpv4, Type: 'A' },
  { url: testIpv6, backupUrl: backupIpv6, Type: 'AAAA' },
]
export const DomainName = Domain
export const log = (data) => {
  if (data) {
    console.log(`${new Date().toString()}\n${JSON.stringify(data)}\n`)
  }
}
export const request = (info, obj) =>
  new Core(key).request(info, obj, requestOption)
export const ipv4Reg =
  /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
export const ipv6Reg =
  /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/
export const UpdateDomainRecord = (RecordId, RR, Type, Value) =>
  request('UpdateDomainRecord', {
    RecordId,
    RR,
    Type,
    Value,
  })
    .then((result) => log(result))
    .catch((error) => log(error))
export const update = (item, result, ip) => {
  try {
    log(ip)
    result.DomainRecords.Record.filter((i) => i.Type === item.Type).forEach(
      (i) => UpdateDomainRecord(i.RecordId, i.RR, i.Type, ip)
    )
  } catch (error) {
    log(error)
  }
}
