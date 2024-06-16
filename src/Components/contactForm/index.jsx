// ContactForm.js
import { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import '../../assets/contactForm.css';

const { TextArea } = Input;
const { Title } = Typography;

const ContactForm = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      let contactList = localStorage.getItem('contactList');
      let contacts = contactList ? JSON.parse(contactList) : [];
      contacts.push(formData);
      localStorage.setItem('contactList', JSON.stringify(contacts));
      alert('Form submitted successfully!');
      form.resetFields();
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="contact-form-container">
      <Title level={2}>Contact Us</Title>
      <Form form={form} className="contact-form" onFinish={handleSubmit}>
        <Form.Item label="Name" required>
          <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item label="Message" required>
          <TextArea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
