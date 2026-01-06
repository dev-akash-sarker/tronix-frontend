"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { FormProps } from "antd";
import Cookies from "js-cookie";
import { Skeleton,Button, Checkbox, Form, Input, Flex } from "antd";
import axios from "axios";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

export default function Login() {
  let [loading, setLoading] = useState<boolean>(false);
  let router = useRouter();

    useEffect(()=>{
    const checkAdmin = async () => {
      const res = await axios.get("http://localhost:8000/api/v1/check-admin");
      console.log("res", res)
      if(!res.data.exists){
        router.push("/")
      }
    }
    checkAdmin()
    
  }, [router])
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    console.log("Success:", values);
    const response = await axios.post(
      "http://localhost:8000/api/v1/admin/login",
      {
        email: values.email,
        password: values.password,
      }
    );
    Cookies.set("token", response.data.token, { expires: 7})
    router.push("/dashboard")
    console.log("Response:", response.data);
    setLoading(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("token");
      if (token) {
       window.location.href = "/dashboard"
      }
    };
    checkAuth()
  }, []);

  return (
    <Flex style={{ height: "100vh" }} align="center" justify="center">
      <Skeleton loading={loading} active>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Skeleton>
    </Flex>
  );
}
