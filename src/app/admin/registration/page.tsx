"use client";
import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Flex, Alert } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FieldType = {
  firstName?: String;
  lastName?: String;
  email?: string;
  password?: string;
  remember?: string;
};


export default function Registration() {

  let [loading, setLoading] = useState<boolean>(false);
  let [message, setMessage] = useState<string>("");
  let [waitforme , setWaitforme] = useState<boolean>(true);
  setTimeout(()=>{
    setWaitforme(false)
  }, 2000)
let router = useRouter();
  useEffect(()=>{
    const checkAdmin = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/check-admin`);
      console.log("res", res)
      if(res.data.exists){
        router.push("/admin/login")
      } else {
        router.push("/admin/registration")
      }

    }
    checkAdmin()
  }, [router])
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    setLoading(true);
    setMessage("Registration Successfull, please check your email")
let data =  await axios.post(
      "http://localhost:8000/api/v1/admin/registration",
      {
        email: values.email,
        password: values.password,
      },
      {
        headers: {
          authorization: "123456abcd",
        },
      }
    );
console.log(data)
setLoading(false)

};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
  return (
<>
{message && <Alert message={message} type="success" showIcon closable/>}
{!waitforme &&<Flex style={{ height: "100vh" }} align="center" justify="center">
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
        <Form.Item<FieldType>
          label="First name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Last name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary">
           <Link href="/admin/login">login</Link>
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}  className=" ml-2">
            Signup
          </Button>

        </Form.Item>
      </Form>
    </Flex>}
    </>
  );
}
