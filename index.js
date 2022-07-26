import fetch from "node-fetch"
import { ipv4AndIpv6, DomainName, log, write, request } from "./data.js"

const update = (RecordId, RR, Type, Value) =>
  request(
    "UpdateDomainRecord", { RecordId, RR, Type, Value })
    .then((result) => log(result), (error) => log(error))
    .catch((error) => log(error))

const sketch = (resources) => resources.forEach((item) => fetch(item.url).then((res) => res.text())
  .then((ip) => {
    write(ip)
    request("DescribeDomainRecords", { DomainName })
      .then((result) => result.DomainRecords.Record.filter((i) => i.Type === item.Type).forEach((i) => update(i.RecordId, i.RR, i.Type, ip.includes(":") ? [ip] : ip)), (error) => log(error))
      .catch((error) => log(error))
  }).catch((error) => log(error)))

sketch(ipv4AndIpv6)
