import fetch from 'node-fetch'
import { ipv4AndIpv6, DomainName, log, write, request } from './data.js'

const UpdateDomainRecord = (RecordId, RR, Type, Value) =>
  request('UpdateDomainRecord', {
    RecordId,
    RR,
    Type,
    Value,
  })
    .then(
      (result) => log(result),
      (error) => log(error),
    )
    .catch((error) => log(error))
const DescribeDomainRecords = ({ item, ip }) =>
  request('DescribeDomainRecords', { DomainName })
    .then(
      (result) =>
        result.DomainRecords.Record.filter((i) => i.Type === item.Type).forEach(
          (i) => UpdateDomainRecord(i.RecordId, i.RR, i.Type, ip),
        ),
      (error) => log(error),
    )
    .catch((error) => log(error))
    .finally(() => write(item.file, ip))
const sketch = (resources) =>
  resources.forEach((item) => {
    try {
      fetch(item.url)
        .then((res) => res.text())
        .then((ip) => DescribeDomainRecords({ item, ip }))
        .catch((error) => log(error))
    } catch (error) {
      log(error)
    }
  })
sketch(ipv4AndIpv6)
