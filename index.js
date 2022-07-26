import fetch from 'node-fetch'
import { ipv4AndIpv6, DomainName, log, request } from './data.js'
const UpdateDomainRecord = (RecordId, RR, Type, Value) =>
  request('UpdateDomainRecord', {
    RecordId,
    RR,
    Type,
    Value,
  })
    .then((result) => log(result))
    .catch((error) => log(error))
const sketch = (items) =>
  request('DescribeDomainRecords', { DomainName })
    .then((result) =>
      items.map(async (item) => {
        const ip = await fetch(item.url).then((res) => res.text())
        if (ip) {
          log(ip)
          result.DomainRecords.Record.filter(
            (i) => i.Type === item.Type,
          ).forEach((i) => UpdateDomainRecord(i.RecordId, i.RR, i.Type, ip))
        } else {
          log('IP cannot find')
        }
      }),
    )
    .catch((error) => log(error))

sketch(ipv4AndIpv6)
