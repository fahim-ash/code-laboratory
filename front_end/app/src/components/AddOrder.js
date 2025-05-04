import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddOrder() {
    const [orderDetails, setOrderDetails] = useState([{ productId: "", quantity: 1, price: 0 }]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                let url = `${process.env.REACT_APP_ORDER_SERVICE}/api/products`;
                const response = await axios.get(url, { withCredentials: true });
                if (response.status === 200) {
                    setProducts(response.data);
                } else {
                    console.log('error fetching data');
                }
            } catch (error) {
                console.error("Failed to load products", error);
            }
        }

        fetchProducts();
    }, []);


    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...orderDetails];
        updatedDetails[index][field] = value;
        setOrderDetails(updatedDetails);
    };

    const addOrderDetail = () => {
        setOrderDetails([...orderDetails, { productId: "", quantity: 1, price: 0 }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                order_details: orderDetails.map((d) => ({
                    product_id: parseInt(d.productId),
                    quantity: parseInt(d.quantity),
                    price: parseFloat(d.price),
                })),
            }),
        });

        if (response.ok) {
            alert("Order added!");
            setOrderDetails([{ productId: "", quantity: 1, price: 0 }]);
        } else {
            alert("Failed to add order");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Add Order</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                {orderDetails.map((detail, index) => (
                    <div key={index} style={styles.detailCard}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Product</label>
                            <select
                                style={styles.input}
                                value={detail.productId}
                                onChange={(e) => handleDetailChange(index, "productId", e.target.value)}
                                required
                            >
                                <option value="">Select Product</option>
                                {products.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Quantity</label>
                            <input
                                type="number"
                                style={styles.input}
                                value={detail.quantity}
                                onChange={(e) => handleDetailChange(index, "quantity", e.target.value)}
                                min="1"
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Price</label>
                            <input
                                type="number"
                                style={styles.input}
                                value={detail.price}
                                onChange={(e) => handleDetailChange(index, "price", e.target.value)}
                                step="0.01"
                                required
                            />
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addOrderDetail}
                    style={styles.addButton}
                >
                    + Add Product
                </button>

                <button type="submit" style={styles.submitButton}>
                    Add Order
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        backgroundColor: "#fff",
    },
    heading: {
        textAlign: "center",
        marginBottom: "1.5rem",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    detailCard: {
        border: "1px solid #eee",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        marginBottom: "0.5rem",
        fontWeight: "bold",
    },
    input: {
        padding: "0.75rem",
        fontSize: "1rem",
        borderRadius: "6px",
        border: "1px solid #ccc",
        width: "100%",
        boxSizing: "border-box",
    },
    addButton: {
        padding: "0.75rem",
        fontSize: "1rem",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    submitButton: {
        padding: "0.75rem",
        fontSize: "1rem",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
};
