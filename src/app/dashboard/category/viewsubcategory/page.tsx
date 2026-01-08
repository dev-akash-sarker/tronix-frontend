"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  message,
  Input,
  Popconfirm,
  Typography,
} from "antd";
import type { TableProps } from "antd";

const { Title } = Typography;
const { Search } = Input;

interface SubCategory {
  _id: string;
  name: string;
  categoryId: {
    _id: string;
    name: string;
  };
}

const ViewSubcategories: React.FC = () => {
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [filteredData, setFilteredData] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch subcategories
  const fetchSubcategories = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/category/viewsubcategories`
      );
      const data = await res.json();

      if (res.ok) {
        setSubcategories(data);
        setFilteredData(data);
      } else {
        message.error(data.message || "Failed to fetch subcategories");
      }
    } catch (error) {
      console.error(error);
      message.error("Error fetching subcategories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  // ✅ Delete handler
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/category/deletesubcategory/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (res.ok) {
        message.success("Subcategory deleted successfully");
        setSubcategories((prev) => prev.filter((sub) => sub._id !== id));
        setFilteredData((prev) => prev.filter((sub) => sub._id !== id));
      } else {
        message.error(data.message || "Failed to delete subcategory");
      }
    } catch (error) {
      console.error(error);
      message.error("Error deleting subcategory");
    }
  };

  // ✅ Search filter
  const onSearch = (value: string) => {
    const searchText = value.toLowerCase();
    const filtered = subcategories.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText) ||
        item.categoryId?.name.toLowerCase().includes(searchText)
    );
    setFilteredData(filtered);
  };

  // ✅ Table Columns
  const columns: TableProps<SubCategory>["columns"] = [
    {
      title: "Subcategory Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Parent Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (cat) => <span>{cat?.name || "N/A"}</span>,
      sorter: (a, b) =>
        a.categoryId?.name?.localeCompare(b.categoryId?.name || "") || 0,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <a href={`/dashboard/subcategory/edit/${record._id}`}>Edit</a>
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
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <Title level={3}>Subcategories</Title>
        <Search
          placeholder="Search by subcategory or category..."
          onSearch={onSearch}
          allowClear
          style={{ width: 300 }}
        />
      </div>

      <Table<SubCategory>
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default ViewSubcategories;
