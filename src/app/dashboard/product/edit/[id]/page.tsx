"use client";
import { useParams } from "next/navigation";
import type { FormProps, UploadFile } from "antd";
import { Alert, Button, Form, Input, message, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

type CategoryType = { _id: string; name: string };
type FieldType = {
  title?: string;
  description?: string;
  categoryId?: string;
  categoryname?: string;
  subcategoryId?: null;
  subcategoryname?: string;
  price?: string;
  discountPercentage?: string;
  stock?: string;
  tags?: string[];
  brand?: string;
  sku?: string;
  images?: UploadFile[];
};

export default function EditPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subcategories, setSubcategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [initialSubcat, setInitialSubcat] = useState<string | null>(null);
  const [addedFiles, setAddedFiles] = useState<UploadFile[]>([]);
  const [removedUrls, setRemovedUrls] = useState<string[]>([]);

  const params = useParams();
  const productId = params.id as string;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");

const normFile = (e: { fileList?: UploadFile[] } | UploadFile[]): UploadFile[] => {
  if (Array.isArray(e)) return e;
  return e.fileList ?? [];
};

  // fetch product
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/product/${productId}`
        );
        const data = await res.json();

        if (!res.ok) {
          message.error("Failed to load product");
          return;
        }

        form.setFieldsValue({
          title: data.title,
          description: data.description,
          categoryId: data.categoryId || undefined,
          subcategoryId: data.subCategoryId || undefined,
          categoryname: data.categoryname,
          subcategoryname: data.subcategoryname,
          price: data.price != null ? String(data.price) : undefined,
          discountPercentage:
            data.discountPercentage != null
              ? String(data.discountPercentage)
              : undefined,
          stock: data.stock != null ? String(data.stock) : undefined,
          sku: data.sku,
          brand: data.brand,
        });

        if (data.categoryId) setSelectedCategory(data.categoryId);
        if (data.subCategoryId) setInitialSubcat(data.subCategoryId);

        if (Array.isArray(data.images)) {
          const fileList = data.images.map((url: string, index: number) => ({
            uid: `existing-${index}-${Date.now()}`,
            name: `image-${index}.jpg`,
            status: "done",
            url,
          }));
          form.setFieldsValue({ images: fileList });
        }
      } catch (err) {
        console.error(err);
        message.error("Error fetching product");
      }
    };

    fetchProduct();
  }, [productId, form]);

  // fetch top-level categories
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/category/allcategory")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  // fetch subcategories when category changes
  useEffect(() => {
    if (!selectedCategory) {
      setSubcategories([]);
      return;
    }

    const fetchSubcategories = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/category/${selectedCategory}/subcategory`
        );
        const data = await res.json();
        setSubcategories(data || []);

        if (initialSubcat) {
          form.setFieldsValue({ subcategoryId: initialSubcat });
          setInitialSubcat(null);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubcategories();
  }, [selectedCategory, form, initialSubcat]);

  // custom preview
const handlePreview = async (file: UploadFile) => {
  if (file.url) {
    window.open(file.url, "_blank");
  } else if (file.originFileObj) {
    const url = URL.createObjectURL(file.originFileObj as Blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
};

  // submit handler
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", values.title ?? "");
      formData.append("description", values.description ?? "");
      formData.append("categoryId", values.categoryId ?? "");
      formData.append("subCategoryId", values.subcategoryId ?? "");
      formData.append("subcategoryname", values.subcategoryname ?? "");
      formData.append("price", String(values.price ?? ""));
      formData.append(
        "discountPercentage",
        String(values.discountPercentage ?? "")
      );
      formData.append("stock", String(values.stock ?? ""));
      formData.append("sku", values.sku ?? "");
      formData.append("brand", values.brand ?? "");

    if (addedFiles.length) {
      addedFiles.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });
    }

      if (removedUrls.length) {
        formData.append("removedUrls", JSON.stringify(removedUrls));
      }

      console.log("akash sarker", productId);

      const res = await fetch(
        `http://localhost:8000/api/v1/product/update/${productId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        setAlertMsg("Product updated successfully ✅");
        message.success("Product updated successfully ✅");
        setAddedFiles([]);
        setRemovedUrls([]);
      } else {
        message.error(data.message || "Failed to update product ❌");
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {alertMsg && (
        <Alert message={alertMsg} type="success" showIcon closable />
      )}
      <div className="mt-10">
        <Form
          name="editProduct"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true }]}
          >
            <Select
              onChange={(value) => {
                setSelectedCategory(value);
                form.setFieldsValue({ subcategoryId: undefined });
              }}
              placeholder="Select category"
            >
              {categories.map((cat) => (
                <Select.Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Subcategory" name="subcategoryId">
            <Select
              disabled={!subcategories.length}
              placeholder={
                subcategories.length ? "Select subcategory" : "No subcategories"
              }
            >
              {subcategories.map((sub) => (
                <Select.Option key={sub._id} value={sub._id}>
                  {sub.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Title"
            name="title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Price"
            name="price"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Discounted Percentage"
            name="discountPercentage"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item<FieldType>
            label="Stock"
            name="stock"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Sku"
            name="sku"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Brand"
            name="brand"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Upload"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture-card"
              onPreview={handlePreview}
              beforeUpload={(file) => {
                setAddedFiles((prev) => [...prev, file]);
                return false;
              }}
              onRemove={(file) => {
                if (typeof file.url === "string") {
                  setRemovedUrls((prev) => [
                    ...prev,
                    ...(file.url ? [file.url] : []),
                  ]); // fixed
                }
                setAddedFiles((prev) => prev.filter((f) => f.uid !== file.uid));
                return true;
              }}
              showUploadList={{ showPreviewIcon: true }}
            >
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
