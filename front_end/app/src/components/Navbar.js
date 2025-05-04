import React from "react";
import {AppBar, Toolbar, Typography, Button} from "@mui/material";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    File Manager
                </Typography>
                <Button color="inherit" component={Link} to="/upload">
                    Upload
                </Button>
                <Button color="inherit" component={Link} to="/files">
                    Files
                </Button>
                <Button color="inherit" component={Link} to="/users">
                    Users
                </Button>
                <Button color="inherit" component={Link} to="/add_product">
                    Add Product
                </Button>
                <Button color="inherit" component={Link} to="/add_order">
                    Order
                </Button>
                <Button color="inherit" component={Link} to="/logout">
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
