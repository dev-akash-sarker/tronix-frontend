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
  _id: string;
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
      .get("http://localhost:8000/api/v1/product/viewproducts")
      .then((res) => setProducts(res.data))
      .catch(() => message.error("Failed to load products"));
  }, []);

  const onFinish = async (values: unknown) => {
  // Cast 'values' to your interface
  const formValues = values as PromotionFormValues;

  // Destructure from the casted object
  const [startDate, endDate] = formValues.dateRange || [];

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8000/api/v1/promotion/createpromotion",
        {
        title: formValues.title,
        description: formValues.description,
        discountPercentage: formValues.discountPercentage,
        // Use optional chaining for safe method calls
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        products: formValues.products,
        }
      );
      message.success("Promotion created successfully!");
      form.resetFields();
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error("Error creating promotion");
      }
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
          rules={[{ required: true, message: "Select products" }]}
        >
          <Select mode="multiple" placeholder="Choose products">
            {products.map((p) => (
              <Select.Option key={p._id} value={p._id}>
                {p.title}
              </Select.Option>
            ))}
          </Select>
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
