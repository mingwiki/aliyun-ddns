import Core from "@alicloud/pop-core"
import fetch from "node-fetch"
import { key, resources, DomainName, consoleLog } from "./data.js"

const client = new Core(key)
const requestOption = {
  method: "POST",
  formatParams: false
}
const update = (RecordId, Value, Type) =>
  ["*", "@"].forEach(RR => {
    client
      .request(
        "UpdateDomainRecord",
        {
          RecordId,
          RR,
          Type,
          Value
        },
        requestOption
      )
      .then(
        result => consoleLog(result),
        ex => consoleLog(ex)
      )
  })

resources.forEach(item => fetch(item.url).then((res) => res.text()).then(ip => {
  client.request("DescribeDomainRecords", { DomainName }, requestOption).then(
    result => result.DomainRecords.Record.filter(i => i.Type === item.type).forEach(i => update(i.RecordId, ip, item.type)),
    ex => consoleLog(ex)
  )
}))
