package order

import (
	"fmt"
	"github.com/ashhab/order_service/internal/order/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetOrdersHandler(c *gin.Context) {
	orders, err := ListOrders()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch orders"})
		return
	}
	c.JSON(http.StatusOK, orders)
}

func CreateOrderHandler(c *gin.Context) {
	var order model.Order
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := AddOrder(&order); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}
	c.JSON(http.StatusCreated, order)
}

func CreateProductHandler(c *gin.Context) {
	var product model.Product
	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	if err := AddProduct(&product); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create product"})
	}
	c.JSON(http.StatusCreated, product)
}

type filters struct {
	Id string
}

func GetProductHandler(c *gin.Context) {
	id := c.Query("id")
	queryFilters := filters{
		Id: id,
	}
	products, err := ListProducts(queryFilters)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch products"})
		return
	}
	c.JSON(http.StatusOK, products)
}
