// ContactForm.js
import { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import "../../assets/contactForm.css";
import { storeContactFormDetails } from "../../Redux/reducers/userSlice";

const { TextArea } = Input;
const { Title } = Typography;

const ContactForm = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async() => {
    if (
      formData.name &&
      formData.email &&
      formData.country &&
      formData.message
    ) {
      const user = {
        name: formData.name,
        email: formData.email,
        country: formData.country,
        message: formData.message,
        dateSent: new Date(),
      };
      const response = await storeContactFormDetails(user);
      if(response){
        alert("Form submitted successfully!");
      form.resetFields();
      setFormData({ name: "", email: "", country: "", message: "" });
      }else {
        alert('Error in submitting the form !!')
      }
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="contact-form-container">
      <Title level={2}>Contact Us</Title>
      <Form form={form} className="contact-form" onFinish={handleSubmit}>
        <Form.Item label="Name" required>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
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
        <Form.Item label="Country" required>
          <Input
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Country"
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
