package knife4gin

import (
	"embed"
	"github.com/gin-gonic/gin"
	"io"
	"log/slog"
	"net/http"
	"os"
	"strings"
)

//go:embed front
var front embed.FS

type OptionSwagger struct {
	Name           string
	SwaggerVersion string
}

type Option struct {
	DocJson         []byte //Swagger json
	DocJsonPath     string //Swagger json路径(DocJson为空时才生效)
	ApiRelativePath string //api 路径
	Swagger         *OptionSwagger
}

var (
	DefaultOption = Option{
		DocJsonPath:     "./doc/swagger.json",
		ApiRelativePath: "/doc",
		Swagger:         nil,
	}
)

func Register(r *gin.Engine, option *Option) {
	r.GET(option.ApiRelativePath+"/*any", Handler(option))
}

func Handler(option *Option) gin.HandlerFunc {

	if option.DocJsonPath == "" {
		option.DocJsonPath = "./doc/swagger.json"
	}

	if option.Swagger == nil {
		option.Swagger = &OptionSwagger{}
	}

	if option.Swagger.Name == "" {
		option.Swagger.Name = "2.X版本"
	}

	if option.Swagger.SwaggerVersion == "" {
		option.Swagger.SwaggerVersion = "2.0"
	}

	docJson := option.DocJson

	if docJson == nil {
		var err error
		docJson, err = os.ReadFile(option.DocJsonPath)
		if err != nil {
			slog.Info("not found docJson in " + option.DocJsonPath)
		}
	}

	indexPath := option.ApiRelativePath + "/index.html"
	servicesPath := option.ApiRelativePath + "/services.json"
	docJsonPath := option.ApiRelativePath + "/doc.json"

	return func(c *gin.Context) {
		switch c.Request.RequestURI {
		case indexPath:
			writeDocHtml(c)
		case servicesPath:
			writeServicesJson(c)
		case docJsonPath:
			writeDocJson(c, docJson)
		default:
			filePath := "front" + strings.TrimPrefix(c.Request.RequestURI, option.ApiRelativePath)
			c.FileFromFS(filePath, http.FS(front))
		}
	}

}

func writeBytes(write io.Writer, bytes []byte) {
	_, err := write.Write(bytes)
	if err != nil {
		slog.Error("bytes write error ", "err", err)
	}
}

func writeDocHtml(c *gin.Context) {
	docHtml, err := front.ReadFile("front/doc.html")
	if err != nil {
		writeBytes(c.Writer, []byte(err.Error()))
	}
	writeBytes(c.Writer, docHtml)
}

func writeDocJson(c *gin.Context, docJson []byte) {
	writeBytes(c.Writer, docJson)
}

func writeServicesJson(c *gin.Context) {
	var res []map[string]any
	res = append(res, map[string]any{
		"name":           "2.X版本",
		"url":            "doc.json",
		"swaggerVersion": "2.0",
		"location":       "doc.json",
	})
	c.JSON(http.StatusOK, res)
}
