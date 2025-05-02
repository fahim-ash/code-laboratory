package model

type Order struct {
	Id          int    `json:"id" gorm:"primaryKey"`
	OrderNumber string `json:"order_number"`
	UserId      uint   `json:"user_id"`
}
