package model

type Order struct {
	Id           int           `json:"id" gorm:"primaryKey"`
	OrderNumber  string        `json:"order_number"`
	UserId       uint          `json:"user_id"`
	OrderDetails []OrderDetail `json:"order_details" gorm:"foreignKey:OrderId"`
}

type OrderDetail struct {
	Id        int     `json:"id" gorm:"primaryKey"`
	OrderId   int     `json:"order_id"`
	ProductId int     `json:"product_id"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
	Order     Order   `gorm:"foreignKey:OrderId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Product   Product `gorm:"foreignKey:ProductId"`
}

type Product struct {
	Id    int     `json:"id" gorm:"primaryKey"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

func TotalPrice(detail *OrderDetail) float64 {
	return detail.Price * float64(detail.Quantity)
}
