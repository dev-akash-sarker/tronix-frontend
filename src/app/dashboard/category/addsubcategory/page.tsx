"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Spin } from "antd";
import { Bounce, ToastContainer, toast } from "react-toastify";

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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/category/allcategory`,
        );
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/category/addsubcategories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );

      const data = await res.json();

      if (res.ok) {
        message.success("Subcategory added successfully");
        toast.success("Subcategory added successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        message.error(data.message || "Failed to add subcategory");
        toast.error("Already have the subcategory name", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong");
      toast.error("Failed to add subcategory", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingCategories) return <Spin tip="Loading categories..." />;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
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
    </>
  );
};

export default AddSubCategory;
