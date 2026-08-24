"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  message,
} from "antd";
import axios from "axios";
const { RangePicker } = DatePicker;

interface Product {
  id: string;
  title: string;
}

interface PromotionFormValues {
  title: string;
  description: string;
  discountPercentage: number;
  products: unknown[]; // Replace 'any' with your actual product type if possible
  dateRange?: [Date, Date]; // Adjust based on your date picker's output
}
export default function AddPromotionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Load all products
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/viewproducts`)
      .then((res) => {
        console.log("API PRODUCTS:", res.data);

        res.data.forEach((product: Product, index: number) => {
          console.log(`Product ${index}:`, {
            id: product.id,
            title: product.title,
          });
        });

        setProducts(res.data);
      })
      .catch(() => message.error("Failed to load products"));
  }, []);

const onFinish = async (values: PromotionFormValues) => {
  console.log("========== PROMOTION ==========");
  console.log("FULL VALUES:", values);
  console.log("PRODUCTS:", values.products);
  console.log("PRODUCT 0:", values.products?.[0]);
  console.log("PRODUCT TYPE:", typeof values.products?.[0]);

  const [startDate, endDate] = values.dateRange || [];

  try {
    setLoading(true);

    const payload = {
      title: values.title,
      description: values.description,
      discountPercentage: values.discountPercentage,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      products: values.products,
    };

    console.log("PAYLOAD:", payload);

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/promotion/createpromotion`,
      payload
    );

    message.success("Promotion created successfully!");
    form.resetFields();
  } catch (error: any) {
    console.error("ERROR:", error.response?.data || error);
    message.error("Error creating promotion");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Promotion</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Promotion Title"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter promotion title" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Promotion details" />
        </Form.Item>

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
  rules={[
    {
      required: true,
      type: "array",
      min: 1,
      message: "Please select at least one product",
    },
  ]}
>
  <Select
    mode="multiple"
    placeholder="Choose products"
    options={products.map((product) => ({
      label: product.title,
      value: product.id,
    }))}
    onChange={(value) => {
      console.log("SELECT CHANGE:", value);
    }}
  />
</Form.Item>

        <Form.Item
          name="dateRange"
          label="Promotion Duration"
          rules={[{ required: true }]}
        >
          <RangePicker />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Create Promotion
        </Button>
      </Form>
    </div>
  );
}
