import React, { useState } from "react";

export default function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = `${process.env.REACT_APP_ORDER_SERVICE}/api/products`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name, price: parseFloat(price) }),
        });

        if (response.ok) {
            alert("Product added!");
            setName("");
            setPrice("");
        } else {
            alert("Failed to add product");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Add Product</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Product Name</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Price</label>
                    <input
                        type="number"
                        step="0.01"
                        style={styles.input}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>Add Product</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "500px",
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
    button: {
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

// Add button hover effect
styles.button[':hover'] = {
    backgroundColor: "#0056b3",
};
