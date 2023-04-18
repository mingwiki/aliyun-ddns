import {
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
} from './utils.js'
import { readFileSync, writeFileSync } from 'fs'
const app = async (v, servers, reg, type, path) => {
  const preIp = readFileSync(path, 'utf-8')
  const name = type === 'A' ? 'ipv4' : 'ipv6'
  if (v) {
    for (let i = 0; i < servers.length; i++) {
      const res = await getIp(servers[i])
      const ip = res?.replace(/[\n\t\r]/g, '').trim()
      log(`${servers[i]}: ${ip}`)
      if (reg.test(ip)) {
        if (ip === preIp) {
          log(name + '未改动')
        } else {
          DomainNames.map((DomainName) => {
            request('DescribeDomainRecords', { DomainName })
              .then((result) => update(type, result, ip))
              .catch(log)
          })
        }
        writeFileSync(path, ip, 'utf-8')
        return
      } else {
        writeFileSync(path, '', 'utf-8')
      }
    }
    if (!preIp) {
      log('未找到' + name + '请检查网络')
    }
  }
}
app(ipv4, ipv4s, ipv4Reg, 'A', './pre4')
app(ipv6, ipv6s, ipv6Reg, 'AAAA', './pre6')
