import AboutUs from "../../Components/aboutUs";
import ContactForm from "../../Components/contactForm";
import Home from "../../Components/home";
import NavBar from "../../Components/navBar";
import { Layout} from 'antd';
const { Content, Footer } = Layout;

export const Dashboard = () => {
    return(
        <div>
        <NavBar />
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Home />
          <AboutUs />
          <ContactForm />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        International Cargo Shipment ©2024
      </Footer>
        </div>
    )
};
