import {
  ipv4AndIpv6,
  DomainName,
  log,
  request,
  ipv4Reg,
  ipv6Reg,
  update,
} from './data.js'

const sketch = (items) =>
  request('DescribeDomainRecords', { DomainName })
    .then((result) =>
      items.map(async (item) => {
        try {
          log(item.url)
          const ip = await fetch(item.url)
            .then((res) => res.text())
            .catch((err) => log(err))
          if (ipv4Reg.test(ip) || ipv6Reg.test(ip)) {
            update(item, result, ip)
          } else {
            log(item.backupUrl)
            const ip = await fetch(item.backupUrl)
              .then((res) => res.text())
              .catch((err) => log(err))
            update(item, result, ip)
          }
        } catch (error) {
          log(error)
        }
      })
    )
    .catch((error) => log(error))

sketch(ipv4AndIpv6)
