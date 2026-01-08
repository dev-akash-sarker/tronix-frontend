"use client";
import React, { useEffect, useState } from "react";
import { Table, Space, Button, message, Popconfirm } from "antd";
import type { TableProps } from "antd";

interface Category {
  _id: string;
  name: string;
}

const ViewCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/category/allcategory`);
        const data = await res.json();
        if (res.ok) setCategories(data);
        else message.error(data.message || "Failed to fetch categories");
      } catch (error) {
        console.error(error);
        message.error("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/category/deletecategory/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (res.ok) {
        message.success("Category deleted successfully");
        setCategories((prev) => prev.filter((cat) => cat._id !== id));
      } else {
        message.error(data.message || "Failed to delete category");
      }
    } catch (error) {
      console.error(error);
      message.error("Error deleting category");
    }
  };

  const columns: TableProps<Category>["columns"] = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
                <Space>
     <a href={`/dashboard/category/edit/${record._id}`}>Edit</a>
          <Popconfirm
            title="Are you sure you want to delete this subcategory?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table<Category>
      columns={columns}
      dataSource={categories}
      loading={loading}
      rowKey="_id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ViewCategories;
