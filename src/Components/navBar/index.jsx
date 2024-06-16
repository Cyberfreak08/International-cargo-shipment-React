import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Dropdown, Button, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "../../assets/navBar.css";
import { routerConstant, title } from "../../utils/constants";
import {
  getUserDataFromLocalStorage,
  logout,
} from "../../Redux/reducers/userSlice";

const { Header } = Layout;

const TopNavbar = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserDataFromLocalStorage());
  }, [dispatch]);

  const handleMenuClick = (menuItem) => {
    switch (menuItem.key) {
      case "max-revenue-category":
        return navigate(routerConstant.maxRevenue);
      case "2nd-quarter-result":
        return navigate(routerConstant.secondQuarter);
      case "national-international":
        return navigate(routerConstant.volume);
      case "4th-quarter-result":
        return navigate(routerConstant.lastQuarter);
      case "logout":
        dispatch(logout());
        return navigate(routerConstant.login);
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="max-revenue-category">
        Max revenue (Category Wise)
      </Menu.Item>
      <Menu.Item key="2nd-quarter-result">2nd Quarter Result</Menu.Item>
      <Menu.Item key="national-international">
        Customer Volume (National vs International)
      </Menu.Item>
      <Menu.Item key="4th-quarter-result">4th Quarter Result</Menu.Item>
    </Menu>
  );

  const userLogout = (
    <Menu onClick={handleMenuClick}>
      {loggedUser?.name && (
        <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
          Logout
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Header className="top-navbar">
      <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
        <Button type="link" className="left-menu">
          <MenuOutlined />
        </Button>
      </Dropdown>

      <div className="logo">{title}</div>

      <div className="user-section">
        {loggedUser ? (
          <>
            <Avatar icon={<UserOutlined />} />
            Welcome,{" "}
            <span className="user-greeting">
              {loggedUser?.name?.toUpperCase()}
            </span>
            <Dropdown
              overlay={userLogout}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button type="link" className="right-menu">
                <DownOutlined />
              </Button>
            </Dropdown>
          </>
        ) : (
          <Button
            onClick={() => {
              // Handle sign-in logic
            }}
            className="login-button"
            type="link"
          >
            Sign In
          </Button>
        )}
      </div>
    </Header>
  );
};

export default TopNavbar;
