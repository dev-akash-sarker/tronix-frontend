"use client";
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";

const AddCategory: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { name: string }) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/category/addcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: values.name }),
      });

      const data = await res.json();

      if (res.ok) {
        message.success("Category added successfully");
      } else {
        message.error(data.message || "Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}
    >
      <Form.Item
        label="Category Name"
        name="name"
        rules={[{ required: true, message: "Please enter category name" }]}
      >
        <Input placeholder="Enter category name" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Category
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCategory;
