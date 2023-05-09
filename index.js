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
  getLastLine,
  appendLastLine,
} from './utils.js'
import { readFileSync, writeFileSync, existsSync } from 'fs'
const app = async (v, servers, reg, type, path) => {
  const preIp = getLastLine(path)
  const name = type === 'A' ? 'ipv4' : 'ipv6'
  if (v) {
    for (const server of servers) {
      const res = await getIp(server)
      const ip = res?.replace(/[\n\t\r]/g, '').trim()
      log(`${server}: ${ip}`)
      if (reg.test(ip)) {
        if (ip === preIp) {
          log(name + '未改动')
        } else {
          DomainNames.map((DomainName) => {
            request('DescribeDomainRecords', { DomainName })
              .then((result) => update(type, result, ip))
              .catch(log)
          })
          appendLastLine(path, ip)
        }
        return
      } else {
        appendLastLine(path, 'unknown')
      }
    }
    if (!preIp || preIp === 'unknown') {
      log('未找到' + name + '请检查网络')
    }
  }
}
app(ipv4, ipv4s, ipv4Reg, 'A', './pre4')
app(ipv6, ipv6s, ipv6Reg, 'AAAA', './pre6')
