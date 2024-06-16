import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../assets/signUp.css";
import { routerConstant, title } from "../../utils/constants";
import { signupUser } from "../../Redux/reducers/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const signUpSuccess = useSelector((state) => state.user.isLoggedIn);
  const signupError = useSelector((state) => state.user.signupError);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("===", signUpSuccess);
    if (signUpSuccess) {
      // console.log("inside ===", signUpSuccess);
      navigate(routerConstant.dashboard);
    } else if (signupError) {
      alert(`signUpError! : ${signupError}`);
    }
  }, [signUpSuccess, navigate, signupError]);
  const onFinish = (values) => {
    dispatch(signupUser(values));
  };

  return (
    <div>
      <h2 className="title-signUp">{title}</h2>
      <div className="sign-up-form-container">
        <h2 className="form-title">Sign Up</h2>

        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                pattern: /^[a-zA-Z0-9_]{4,20}$/,
                message:
                  "Username must be 4 to 20 characters long and can only contain letters, numbers, and underscores.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Enter a valid email address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}/,
                message:
                  "Password must contain at least 6 characters, including at least one uppercase letter, one digit, and one special symbol (!@#$%^&*).",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <div className="d-flex flex-column align-center">
            <p>
              {"Already have an account? "}
              <Link className="ml-8 m-w-500" to={routerConstant.login}>
                Sign In
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
