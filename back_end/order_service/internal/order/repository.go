package order

import (
	"github.com/ashhab/order_service/internal/db"
	"github.com/ashhab/order_service/internal/order/model"
)

func GetAllOrders() ([]model.Order, error) {
	var orders []model.Order
	result := db.DB.Find(&orders)
	return orders, result.Error
}

func CreateOrder(order *model.Order) error {
	return db.DB.Create(order).Error
}
