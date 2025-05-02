package order

import "github.com/ashhab/order_service/internal/order/model"

func ListOrders() ([]model.Order, error) {
	return GetAllOrders()
}

func AddOrder(order *model.Order) error {
	return CreateOrder(order)
}
