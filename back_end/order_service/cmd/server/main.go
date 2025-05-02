package main

import (
	"fmt"
	"github.com/ashhab/order_service/internal/config"
	"github.com/ashhab/order_service/internal/db"
	"github.com/ashhab/order_service/internal/router"
)

func main() {
	config.LoadEnv()
	db.InitDB()
	r := router.SetupRouter()
	fmt.Print("the server is running bro")
	r.Run(":8080")
}
