## knife4gin

### 介绍

golang的web框架接口文档工具，需要配合[gin-swagger](https://github.com/swaggo/gin-swagger)使用，
由knife4j移植过来的

### 版本要求

golang 1.21 及以上

### 安装依赖

```shell
go get github.com/qian-xc/knife4gin
```

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
	//docsDefaultOption.DocJson = docs.SwaggerJson()   //参考推荐用法配置json注入
	knife4gin.Register(r, &docsDefaultOption)

	return r

}

```

### 推荐用法

在swagger生成的doc包中新建文件 swagger.go

```go

package docs

import _ "embed"

//go:embed swagger.json
var swaggerJson []byte

func SwaggerJson() []byte {
	return swaggerJson
}


```

### 访问

浏览器打开 /doc/doc.html