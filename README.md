# aliyun-ddns

## Update Aliyun DDNS automaticly 自动更新阿里云DDNS

### 1. Install 安装

```bash
$ git clone https://github.com/mingwiki/aliyun-ddns.git && cd aliyun-ddns && mv .env-example .env
```

### 2. Configuration 配置

修改.env文件 输入阿里云AccessKey 

[如何获取阿里云云账号AccessKey ID和AccessKey Secret](https://help.aliyun.com/document_detail/38738.html)


### 3. Start 启动

``` bash
$ npm install && npm start
```

### 4. crontab

每12小时执行一次

```bash
$ crontab -e
  0 */12 * * * /path/to/npm start --prefix /path/to/aliyun-ddns
$ crontab -l
```
