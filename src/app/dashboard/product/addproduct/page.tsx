/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Alert, Button, Form, Input, message, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { Bounce, ToastContainer, toast } from "react-toastify";

type SubcategoryType = {
  _id: string;
  name: string;
};

type CategoryType = {
  _id: string;
  name: string;
  subcategories: SubcategoryType[];
};

type FieldType = {
  title?: string;
  description?: string;
  category?: string;
  subcategory: string;
  subcategoryId: string;
  subcategoryname: string;
  price?: string;
  discountedPercentage?: string;
  rating: null;
  stock?: string;
  tags: [string];
  brand?: string;
  sku?: string;
  images: { uid: string; name: string; url?: string }[]; // ✅ store minimal info
};

const Addproduct: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subcategories, setSubcategories] = useState<SubcategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);
  const [productId, setProductId] = useState<string>("");

  const [form] = Form.useForm();

  // Fetch top-level categories
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/category/allcategory`)
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const {
        title,
        description,
        category,
        subcategory,
        subcategoryname,
        price,
        discountedPercentage,
        stock,
        sku,
        brand,
      } = values;

      const formData = new FormData();

      // Append images from fileList state
      fileList.forEach((file: any) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });

      formData.append("title", title ?? "");
      formData.append("description", description ?? "");
      formData.append("categoryId", category ?? "");
      formData.append("subCategoryId", subcategory ?? "");
      formData.append("subcategoryname", subcategoryname ?? "")
      formData.append("price", price ?? "");
      formData.append("discountPercentage", discountedPercentage ?? "");
      formData.append("stock", stock ?? "");
      formData.append("sku", sku ?? "");
      formData.append("brand", brand ?? "");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/addproduct`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (res.ok && data?.product?._id) {
        setProductId(data.product._id);

        message.success("Product uploaded successfully ✅");
        toast.success("Product uploaded successfully", {
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
        form.resetFields();
        setFileList([]);
      } else {
        message.error("Failed to upload product ❌");
        toast.error("Failed to add product", {
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
    } catch (err) {
      console.error("Error adding product:", err);
      message.error("Something went wrong ❌");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handlePreview = async (file: any) => {
    console.log("Preview file:", file);
  };

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
      <div className="mt-10">
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Category */}
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select Category"
              onChange={(value) => {
                setSelectedCategory(value);

                const selectedCat = categories.find((cat) => cat._id === value);

                setSubcategories(selectedCat?.subcategories || []);

                // Clear previously selected subcategory
                form.setFieldValue("subcategory", undefined);
              }}
            >
              {categories.map((cat) => (
                <Select.Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Subcategory */}
          <Form.Item label="Subcategory" name="subcategory">
            <Select disabled={!subcategories.length}>
              {subcategories.map((sub) => (
                <Select.Option key={sub._id} value={sub._id}>
                  {sub.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Other fields */}
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input your product name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please input your product price!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Discounted Percentage"
            name="discountedPercentage"
            rules={[
              {
                required: true,
                message: "Please input your discounted Percentage!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input product description!" },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Stock"
            name="stock"
            rules={[{ required: true, message: "Please input stock!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Sku"
            name="sku"
            rules={[{ required: true, message: "Please input sku!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Please input brand!" }]}
          >
            <Input />
          </Form.Item>

          {/* Upload */}
          <Form.Item label="Upload" name="images">
            <Upload
              listType="picture-card"
              showUploadList={{ showPreviewIcon: true }}
              fileList={fileList}
              onPreview={handlePreview}
              beforeUpload={() => false}
              onChange={({ fileList: newList }) => {
                setFileList(newList);
              }}
              onRemove={(file) => {
                setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
              }}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Upload Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Addproduct;
