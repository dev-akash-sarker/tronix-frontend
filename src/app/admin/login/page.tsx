/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Flex, message } from "antd";
import Cookies from "js-cookie";
import axios from "axios";

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm(); // ✅ to set form errors programmatically

  // Check if admin exists
  useEffect(() => {
    const checkAdminExists = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/check-admin`
        );
        if (!res.data.exists) {
          router.replace("/");
        }
      } catch (error) {
        console.error("Admin check failed:", error);
      }
    };
    checkAdminExists();
  }, [router]);

  // Redirect if already logged in
  useEffect(() => {
    const token = Cookies.get("token");
    console.log("Token from cookies:", token);
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  // Handle login submit
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/login`,
        {
          email: values.email,
          password: values.password,
        }
      );

      Cookies.set("token", res.data.token, { expires: 7 });
      message.success("Login successful");
      router.push("/dashboard");
    } catch (error: any) {
      // If 401 or 404, show inline form errors
      if (
        error.response?.status === 401 ||
        error.response?.status === 404
      ) {
        form.setFields([
          {
            name: "email",
            errors: ["Email or password is incorrect"],
          },
          {
            name: "password",
            errors: ["Email or password is incorrect"],
          },
        ]);
      } else {
        message.error(
          error.response?.data?.message || "Something went wrong"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {
    message.error("Please fill in all required fields");
  };

  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <Form
        form={form}
        name="admin-login"
        style={{ width: 360 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Login
        </Button>
      </Form>
    </Flex>
  );
}
