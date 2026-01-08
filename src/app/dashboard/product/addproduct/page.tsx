"use client";
import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Alert, Button, Form, Input, message, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";

type CategoryType = { _id: string; name: string };
type FieldType = {
  title?: string;
  description?: string;
  category?: string;
  subcategory: string;
  subcategoryId: string;
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
  const [subcategories, setSubcategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);
  const [productId, setProductId] = useState<string>("");
  const [alrmessage, setAlrMessage] = useState<string>("");

  const [form] = Form.useForm();

  // Fetch top-level categories
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/category/allcategory`)
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  // Fetch subcategories whenever category changes
  useEffect(() => {
    if (!selectedCategory) return;
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/category/${selectedCategory}/subcategory`
    )
      .then((res) => res.json())
      .then(setSubcategories)
      .catch(console.error);
  }, [selectedCategory]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const {
        title,
        description,
        category,
        subcategory,
        price,
        discountedPercentage,
        stock,
        sku,
        brand,
        images,
      } = values;

      const formData = new FormData();

      // Append images
      images?.forEach((file: any) => {
        if (file.originFileObj) formData.append("images", file.originFileObj);
      });

      formData.append("title", title ?? "");
      formData.append("description", description ?? "");
      formData.append("categoryId", category ?? "");
      formData.append("subCategoryId", subcategory ?? "");
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
        }
      );
      const data = await res.json();

      if (res.ok && data?.product?._id) {
        setProductId(data.product._id); // ✅ save product id
        setAlrMessage("Product uploaded successfully ✅");
        message.success("Product uploaded successfully ✅");
        form.resetFields();
        setFileList([]); // clear upload list
      } else {
        setAlrMessage("Failed to upload product ❌");
        message.error("Failed to upload product ❌");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      message.error("Something went wrong ❌");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handlePreview = async (file: any) => {
    console.log("Preview file:", file);
  };

  return (
    <>
      {alrmessage && (
        <Alert message={alrmessage} type="success" showIcon closable />
      )}
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
            <Select onChange={(value) => setSelectedCategory(value)}>
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
            rules={[{ required: true, message: "Please input your product name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input your product price!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Discounted Percentage"
            name="discountedPercentage"
            rules={[{ required: true, message: "Please input your discounted Percentage!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input product description!" }]}
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
          <Form.Item label="Upload" name="images" valuePropName="fileList">
            <Upload
              listType="picture-card"
              showUploadList={{ showPreviewIcon: true }}
              fileList={fileList}
              onPreview={handlePreview}
              beforeUpload={() => false} // prevent auto-upload
              onChange={({ fileList: newList }) => {
                setFileList(newList); // keep full list for preview
                // store only minimal info in form to avoid circular refs
                const simplifiedList = newList.map((f) => ({
                  uid: f.uid,
                  name: f.name,
                  url: f.url || f.response?.url,
                  originFileObj: f.originFileObj,
                }));
                form.setFieldValue("images", simplifiedList);
              }}
              onRemove={(file) => {
                const filtered = fileList.filter((f) => f.uid !== file.uid);
                setFileList(filtered);
                const simplifiedList = filtered.map((f) => ({
                  uid: f.uid,
                  name: f.name,
                  url: f.url || f.response?.url,
                  originFileObj: f.originFileObj,
                }));
                form.setFieldValue("images", simplifiedList);
              }}
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  if (!productId) {
                    return message.error("Product ID not set!");
                  }
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("productId", productId);

                  const res = await fetch(
                    `http://localhost:8000/api/v1/product/image/id/${productId}`,
                    { method: "POST", body: formData }
                  );
                  const data = await res.json();

                  if (data.success) {
                    message.success("Image uploaded ✅");
                    onSuccess?.(data, file);
                  } else {
                    message.error("Upload failed ❌");
                    onError?.(new Error("Upload failed"));
                  }
                } catch (err) {
                  console.error(err);
                  message.error("Error uploading ❌");
                  onError?.(err as Error);
                }
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
