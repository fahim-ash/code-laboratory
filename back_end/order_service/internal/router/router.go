package router

import (
	"github.com/ashhab/order_service/internal/middleware"
	"github.com/ashhab/order_service/internal/order"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(middleware.Logger())

	api := r.Group("/api")
	{
		api.GET("/users", order.GetOrdersHandler)
		api.POST("/users", order.CreateOrderHandler)
	}

	return r
}
