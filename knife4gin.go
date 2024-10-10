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
	DocJsonPath  string
	RelativePath string
	Swagger      *OptionSwagger
}

func Register(r *gin.Engine, option *Option) {
	r.GET(option.RelativePath+"/*any", Handler(option))
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

	docJson, err := os.ReadFile(option.DocJsonPath)
	if err != nil {
		slog.Info("not found docJson in " + option.DocJsonPath)
	}
	indexPath := option.RelativePath + "/index.html"
	servicesPath := option.RelativePath + "/services.json"
	docJsonPath := option.RelativePath + "/doc.json"

	return func(c *gin.Context) {
		switch c.Request.RequestURI {
		case indexPath:
			writeDocHtml(c)
		case servicesPath:
			writeServicesJson(c)
		case docJsonPath:
			writeDocJson(c, docJson)
		default:
			filePath := "front" + strings.TrimPrefix(c.Request.RequestURI, option.RelativePath)
			c.FileFromFS(filePath, http.FS(front))
		}
	}

}

func writeBytes(write io.Writer, bytes []byte) {
	_, err := write.Write(bytes)
	slog.Error("bytes write error ", "err", err)
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
