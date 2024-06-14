import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Dropdown, Button, Space, Avatar } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";

import "../../assets/navBar.css";
import { title } from "../../utils/constants";
// import { router } from "../../utils/routes";

const { Header } = Layout;

const TopNavbar = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  // const token = useSelector((state)=>state.reducer.user.token);
  useEffect(() => {
    // dispatch(getCurrentUser());
  }, [dispatch]);

  const handleMenuClick = (menuItem) => {
    switch (menuItem.key) {
      case "order":
        console.log('order');
        // dispatch(getAllOrders());
        // navigate(router.allOrders);
        break;
      case "signIn":
        // navigate(router.login);
        console.log('order');
        break;
      case "logout":
        console.log('order');
        // dispatch(logoutUser());
        // return navigate(router.login);
        break;
      case "profile":
        // navigate(router.profile);
        console.log('order');
        break;
      case "cart":
        console.log('order');
        // navigate(router.cart);
        break;
      case "products":
        console.log('order');
        // navigate(router.products);
        break;
      default:
        break;
    }
    alert('pressed menu')
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {loggedUser?.userName && (
        <>
          <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
            Go to Cart
          </Menu.Item>
          <Menu.Item key="products" icon={<UserOutlined />}>
            Products
          </Menu.Item>
          <Menu.Item key="order" icon={<UserOutlined />}>
            Your Orders
          </Menu.Item>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
            Logout
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <Header className="top-navbar">
      <Button type="link" onClick={() => navigate(-1)} className="back-button">
        Back
      </Button>
      <Space align="center">
        <div className="logo">{title}</div>
        <div className="user-section">
          {!loggedUser ? (
            <>
              <Avatar icon={<UserOutlined />} />
              Welcome,
              <span className="user-greeting">{loggedUser?.userName}</span>
              {/* </a> */}
              <Dropdown overlay={menu} trigger={["click"]}>
                <Button type="link" className="user-name">
                  <DownOutlined />
                </Button>
              </Dropdown>
              <Button
                type="link"
                // onClick={() => navigate(router.cart)}
                className="back-button"
              >
                Go to cart
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                // dispatch(updateSuccess(false));
                // navigate(router.login);
              }}
              className="login-button"
              type="link"
            >
              Sign In
            </Button>
          )}
        </div>
      </Space>
    </Header>
  );
};

export default TopNavbar;