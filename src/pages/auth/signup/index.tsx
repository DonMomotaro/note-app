import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import useAxios from "@/hooks/useAxios";
import { END_POINT } from "@/constants/endpoint";
import { toast } from "react-toastify";
import useNotification from "@/hooks/useNotification";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";

const SignupPage = () => {
  const router = useRouter();
  const { saveAccessToken } = useAuth();
  const { mutateData } = useAxios();
  const { contextHolder, openNotification } = useNotification();

  const onFinish = async (values: any) => {
    const { username, password, cfpassword } = values || {};
    if (password !== cfpassword) {
      openNotification("error", "Mật khẩu không khớp");
      return;
    }
    try {
      const data = await mutateData(`${END_POINT.AUTH.SIGN_UP}`, {
        username: values?.username,
        password: values?.password,
      });
      if (!data.success) {
        openNotification("error", data?.message);
        return;
      }
      openNotification("success", "Đăng ký thành công");
      saveAccessToken(data?.data?.accessToken);
      router.push("/");
    } catch (error: any) {
      openNotification("error", error?.message);
    }
  };
  return (
    <div className="flex justify-center mt-24">
      {contextHolder}
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
        <Form.Item
          name="cfpassword"
          rules={[{ required: true, message: "Hãy điền mật khẩu" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Xác nhận mật khẩu"
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
            Đăng ký
          </Button>
          Hoặc <a href="/login">Đăng nhập</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupPage;
