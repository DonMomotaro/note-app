import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import useAxios from "@/hooks/useAxios";

const LoginPage = () => {
  const { mutateData } = useAxios();
  const onFinish = async (values: any) => {
    try {
    } catch (error) {}
  };
  return (
    <div className="flex justify-center mt-24">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Hãy điền tên đăng nhập" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Tên đăng nhập"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Hãy điền mật khẩu" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button mb-2"
          >
            Log in
          </Button>
          Hoặc <a href="/auth/signup">Đăng ký ngay</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
