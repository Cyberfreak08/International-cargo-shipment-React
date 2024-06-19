import { Card, Row, Col } from 'antd';
import '../../assets/contactList.css';

const contacts = [
  {
    id: "ad4a",
    name: "harisundar",
    email: "harisundarofficial08@gmail.com",
    country: "India",
    message: "Hii",
    dateSent: "2024-06-17T06:39:41.655Z"
  }
];

const ContactList = () => {
  return (
    <div className="contacts-container">
      <h1>Contact Details</h1>
      <Row gutter={16}>
        {contacts.map(contact => (
          <Col span={8} key={contact.id}>
            <Card title={contact.name} bordered={false} className="contact-card">
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Country:</strong> {contact.country}</p>
              <p><strong>Message:</strong> {contact.message}</p>
              <p><strong>Date Sent:</strong> {new Date(contact.dateSent).toLocaleString()}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ContactList;
