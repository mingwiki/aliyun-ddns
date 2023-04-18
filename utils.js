import Core from '@alicloud/pop-core'
const {
  AccessKeyID,
  AccessKeySecret,
  Domains,
  ipv4_servers,
  ipv6_servers,
  ipv4_enabled,
  ipv6_enabled,
} = process.env
const key = {
  accessKeyId: AccessKeyID,
  accessKeySecret: AccessKeySecret,
  endpoint: 'https://alidns.cn-hangzhou.aliyuncs.com',
  apiVersion: '2015-01-09',
}
const requestOption = {
  method: 'POST',
  formatParams: false,
}
const parseEnv = (s) =>
  s
    .split(',')
    .map((i) => i.trim())
    .filter((i) => !!i)
const [DomainNames, ipv4s, ipv6s, ipv4, ipv6] = [
  parseEnv(Domains),
  parseEnv(ipv4_servers),
  parseEnv(ipv6_servers),
  ipv4_enabled,
  ipv6_enabled,
]

const ipv4Reg =
  /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const ipv6Reg =
  /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/
const log = (data) => {
  data && console.log(`${new Date().toString()}\n${JSON.stringify(data)}\n`)
}
const request = (info, obj) => new Core(key).request(info, obj, requestOption)
const UpdateDomainRecord = (RecordId, RR, Type, Value) =>
  request('UpdateDomainRecord', {
    RecordId,
    RR,
    Type,
    Value,
  })
    .then(log)
    .catch(log)
const update = (type, result, ip) => {
  try {
    log(`将更新${type === 'A' ? 'ipv4' : 'ipv6'}为: ${ip}`)
    result.DomainRecords.Record.filter((i) => i.Type === type).forEach((i) => {
      log(i)
      UpdateDomainRecord(i.RecordId, i.RR, i.Type, ip)
    })
  } catch (error) {
    log(error)
  }
}
const getIp = async (url) => {
  return await fetch(url)
    .then((res) => res.text())
    .catch(log)
}
export {
  DomainNames,
  ipv4s,
  ipv6s,
  ipv4,
  ipv6,
  ipv4Reg,
  ipv6Reg,
  log,
  request,
  update,
  getIp,
}
