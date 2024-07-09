import Home from "./Home/Home";
import Products from "./Products/Products";
import Comments from "./Comments/Comments";
import Users from "./Users/Users";
import Orders from "./Orders/Orders";
import Discounts from "./Discounts/Discounts";
import Login from "./Login/Login";

const routes = [
    { path: "/Login", element: <Login /> },
    { path: "/", element: <Home /> },
    { path: "/products", element: <Products /> },
    { path: "/comments", element: <Comments /> },
    { path: "/users", element: <Users /> },
    { path: "/orders", element: <Orders /> },
    { path: "/Discounts", element: <Discounts /> },
];

export default routes;
