import fetch from "node-fetch"
import { ipv4AndIpv6, ipv4Only, DomainName, log, request } from "./data.js"

const update = (RecordId, RR, Value, Type) =>
  request(
    "UpdateDomainRecord",
    {
      RecordId,
      RR,
      Type,
      Value
    }
  )
    .then(
      result => log(result),
      ex => log(ex)
    )

const sketch = (resources) => resources.forEach(item => fetch(item.url).then((res) => res.text()).then(ip => {
  request("DescribeDomainRecords", { DomainName }).then(
    result => result.DomainRecords.Record.filter(i => i.Type === item.Type).forEach(i => update(i.RecordId, i.RR, ip.includes(":") ? [ip] : ip, i.Type)),
    ex => log(ex)
  )
}))

try {
  sketch(ipv4AndIpv6)
} catch (error) {
  log(error)
  sketch(ipv4Only)
}
