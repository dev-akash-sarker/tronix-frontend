"use client";
import React, { useEffect, useState } from "react";
import { Table, Tag, Space, message, Typography } from "antd";
import axios from "axios";
const { Title } = Typography;

interface Featured {
  _id: string;
  products: { _id: string; title: string; price: number; discountPercentage: number }[];
}

export default function ViewFeaturedProduct() {
  const [promotions, setPromotions] = useState<Featured[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/featured/getfeatureproduct`);
        setPromotions(res.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: unknown) {
        message.error("Failed to load featured products");
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Productid",
      key: "Productid",
      render: (record: Featured) => (
        <Space direction="vertical">
          {record.products.map((p) => (
            <Tag key={p._id} color="green">
              {p._id}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Products",
      key: "products",
      render: (record: Featured) => (
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
      <Title level={3}>All Featured Product</Title>
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
