import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

function AboutUs() {
  return (
    <div className="about-container">
      <Title level={2}>About Us</Title>
      <Paragraph>
        International Cargo Shipment delivers Products, Electronics & Consumer Products directly to customers and distributors.
        We operate a single office in Singapore and deliver all over Europe, ensuring timely and efficient delivery during the
        peak holiday season.
      </Paragraph>
      <Paragraph>
        Our fleet of modern cargo ships is equipped with state-of-the-art technology to ensure the safety and security of your
        goods. We are committed to providing excellent service and customer satisfaction.
      </Paragraph>
    </div>
  );
}

export default AboutUs;