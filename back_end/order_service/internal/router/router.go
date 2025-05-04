package router

import (
	"github.com/ashhab/order_service/internal/middleware"
	"github.com/ashhab/order_service/internal/order"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"time"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(middleware.Logger())

	// CORS config
	config := cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // your React app
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true, // Important if using cookies / tokens
		MaxAge:           12 * time.Hour,
	}
	r.Use(cors.New(config))
	api := r.Group("/api")
	{
		api.GET("/orders", order.GetOrdersHandler)
		api.POST("/orders", order.CreateOrderHandler)
		api.GET("/products", order.GetProductHandler)
		api.POST("/products", order.CreateProductHandler)
	}

	return r
}
