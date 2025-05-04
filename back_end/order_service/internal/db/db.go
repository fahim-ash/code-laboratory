package db

import (
	"fmt"
	"github.com/ashhab/order_service/internal/order/model"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
	"sync"
)

var (
	DB   *gorm.DB
	once sync.Once
)

func InitDB() {
	once.Do(func() {
		var err error
		DB, err = gorm.Open(sqlite.Open("order.db"), &gorm.Config{})
		if err != nil {

			log.Fatal("Database connection failed")
		}

		err = DB.AutoMigrate(
			&model.Order{},
			&model.Product{},
			&model.OrderDetail{},
		)
		if err != nil {
			log.Fatalf("Issue occurred during migration: %v", err)
		}
		fmt.Println("Databases migrated successfully")

	})
}
