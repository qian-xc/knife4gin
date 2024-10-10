## knife4gin

### 介绍

golang的web框架接口文档工具，需要配合[gin-swagger](https://github.com/swaggo/gin-swagger)使用，
由knife4j移植过来的

### 配置

```go
package router

import (
	"github.com/gin-gonic/gin"
	"github.com/qian-xc/knife4gin"
)

func InitRouter() *gin.Engine {

	r := gin.New()

	docsDefaultOption := knife4gin.DefaultOption
	//获取swagger生成的json内容
	//docsDefaultOption.DocJson = docs.SwaggerJson()  
	knife4gin.Register(r, &docsDefaultOption)

	return r

}

```

### 访问

浏览器打开 /doc/doc.html