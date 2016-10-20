chrome-extension: 139邮箱助手
===================================

## 坑
* 某些参数值不能被encode成%XX格式
```
func=user:getInitDataConfig
# 不能是 func=user%3AgetInitDataConfig
```
