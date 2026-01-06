"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Spin } from "antd";

interface Category {
  _id: string;
  name: string;
}

const { Option } = Select;

const AddSubCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(true);

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/category/allcategory");
        const data = await res.json();
        if (res.ok) {
          setCategories(data); // Assuming backend returns array of categories
        } else {
          message.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error(error);
        message.error("Something went wrong while fetching categories");
      } finally {
        setFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values: { categoryId: string; name: string }) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/category/addsubcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        message.success("Subcategory added successfully");
      } else {
        message.error(data.message || "Failed to add subcategory");
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingCategories) return <Spin tip="Loading categories..." />;

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: 500, margin: "auto", marginTop: 50 }}
    >
      <Form.Item
        label="Select Category"
        name="categoryId"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select placeholder="Select a category">
          {categories.map((cat) => (
            <Option key={cat._id} value={cat._id}>
              {cat.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Subcategory Name"
        name="name"
        rules={[{ required: true, message: "Please enter subcategory name" }]}
      >
        <Input placeholder="Enter subcategory name" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Subcategory
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddSubCategory;
