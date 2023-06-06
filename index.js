import {
    DomainNames, ipv4s, ipv6s, enabled, ipv4Reg, ipv6Reg, log, request, update, getIp, getLastLine, appendLastLine,
} from "./utils.js";

const app = async (servers, reg, type, path) => {
    const preIp = getLastLine(path);
    const name = type === "A" ? "ipv4" : "ipv6";
    for (const server of servers) {
        const res = await getIp(server);
        const ip = res?.replace(/[\n\t\r]/g, "").trim();
        log(`${server}: ${ip}`);
        if (reg.test(ip)) {
            if (ip === preIp) {
                log(name + "未改动");
            } else {
                DomainNames.map((DomainName) => {
                    request("DescribeDomainRecords", {DomainName})
                        .then((result) => update(type, result, ip))
                        .catch(log);
                });
                appendLastLine(path, ip);
            }
            return;
        } else {
            if (reg.test(preIp)) {
                appendLastLine(path, "unknown");
            }
            log("未找到" + name + "请检查网络");
        }
    }
};
enabled.map(i => {
    if (i === 'v4') {
        app(ipv4s, ipv4Reg, "A", "./ipv4.log");
    }
    if (i === 'v6') {
        app(ipv6s, ipv6Reg, "AAAA", "./ipv6.log");
    }
})