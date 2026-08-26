/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputNumber,
  Select,
  message,
} from "antd";
import axios from "axios";

interface Product {
  id: string;
  title: string;
}

export default function AddFeaturedProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Load all products
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/product/viewproducts")
      .then((res) => setProducts(res.data))
      .catch(() => message.error("Failed to load products"));
  }, []);

  const onFinish = async (values: any) => {
console.log("letsee",values.products.map((product: any)=> product));

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/featured/createfeatureproduct`,
        {
          products: values.products.map((product: any)=> product),
          discountPercentage: values.discountPercentage,
        }
      );
      message.success("Featured product created successfully!");
      form.resetFields();
    } catch (error: any) {
      message.error(
        error.response?.data?.message || "Error creating featured product"
      );
    } finally {
      setLoading(false);
    }
  };

  console.log("products", products)

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Featured Product</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
          name="discountPercentage"
          label="Discount (%)"
          rules={[{ required: true, message: "Please enter discount" }]}
        >
          <InputNumber min={1} max={90} />
        </Form.Item>

        <Form.Item
          name="products"
          label="Select Products"
          rules={[{ required: true, message: "Select products" }]}
        >
          <Select mode="multiple" placeholder="Choose products">
            {products.map((p) => (
              <Select.Option key={p.id} value={p.id}>
                {p.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Add Featured Product
        </Button>
      </Form>
    </div>
  );
}
