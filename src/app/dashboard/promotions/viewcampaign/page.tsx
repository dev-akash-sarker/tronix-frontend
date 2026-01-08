"use client";
import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button, message, Typography } from "antd";
import axios from "axios";
const { Title } = Typography;

interface Promotion {
  _id: string;
  title: string;
  description: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  products: { _id: string; title: string; price: number; discountPercentage: number }[];
}

export default function ViewPromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/promotion/getpromotion`);
        setPromotions(res.data);
      } catch (error) {
        message.error("Failed to load promotions");
      } finally {
        setLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Discount (%)",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: "Duration",
      key: "duration",
      render: (record: Promotion) => (
        <>
          {new Date(record.startDate).toLocaleDateString()} -{" "}
          {new Date(record.endDate).toLocaleDateString()}
        </>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (record: Promotion) => {
        const now = new Date();
        const start = new Date(record.startDate);
        const end = new Date(record.endDate);
        let status = "Upcoming";
        let color = "blue";

        if (now >= start && now <= end) {
          status = "Active";
          color = "green";
        } else if (now > end) {
          status = "Expired";
          color = "red";
        }

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Products",
      key: "products",
      render: (record: Promotion) => (
        <Space direction="vertical">
          {record.products.map((p) => (
            <Tag key={p._id} color="gold">
              {p.title}
            </Tag>
          ))}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={3}>All Promotions</Title>
      <Table
        rowKey="_id"
        dataSource={promotions}
        columns={columns}
        loading={loading}
        bordered
      />
    </div>
  );
}
