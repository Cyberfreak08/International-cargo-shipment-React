import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/signIn.css";
import { routerConstant } from "../../utils/constants";
import { loginUser } from "../../Redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signInSuccess = useSelector((state) => state.user.isLoggedIn);
  const signInError = useSelector((state) => state.user.loginError);
  const onFinish = (values) => {
    dispatch(loginUser(values));
  };
  useEffect(() => {
    // console.log("===", success);
    if (signInSuccess) {
      console.log("inside success", signInSuccess);
      navigate(routerConstant.dashboard);
    } else if (signInError) {
      alert(`signInError! : ${signInError}`);
    }
  }, [signInSuccess, navigate, signInError]);
  return (
    <div>
      <div className="sign-in-form-container">
        <h2 className="form-title">Sign In</h2>

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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <div className="d-flex flex-column align-center">
            <p>
              {"Don't have an account?"}
              <Link className="ml-8 m-w-500" to={routerConstant.register}>
                Sign Up
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
