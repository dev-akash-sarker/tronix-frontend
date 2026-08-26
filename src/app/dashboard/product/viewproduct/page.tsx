"use client";
import React, { useEffect, useState } from "react";
import { Space, Table, message } from "antd";
import type { TableProps } from "antd";
import Image from "next/image";

interface DataType {
  key: string;
  title?: string;
  description?: string;
  category?: string;
  subcategory: string;
  price?: string;
  discountedPercentage?: string;
  rating: null;
  stock?: string;
  tags: [string];
  brand?: string;
  sku?: string;
  images: [string];
}

const Viewproduct: React.FC = () => {
  const [products, setProducts] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("hello world");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/viewproducts`,
        );
        const data = await res.json();
        console.log(data);

        // 👇 assuming your API returns array of users like [{id, name, age, address}]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedData = data.map((products: any, index: number) => ({
          key: products.id || index.toString(),
          title: products.title,
          description: products.description,
          categoryId: products.categoryId,
          categoryname: products.categoryname,
          subcategoryname: products.subcategoryname,
          price: products.price,
          discountedPercentage: products.discountPercentage,
          rating: products.rating || "",
          stock: products.stock,
          tags: products.tags,
          brand: products.brand,
          sku: products.sku,
          images: products.thumbnail,
        }));

        setProducts(formattedData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/deleteproduct/${id}`,
        {
          method: "DELETE",
        },
      );

      console.log("sssssssssss", id);

      if (res.ok) {
        message.success("User deleted successfully");
        setProducts((prev) => prev.filter((products) => products.key !== id));
      } else {
        message.error("Failed to delete user");
      }
    } catch (error) {
      console.error(error);
      message.error("Error deleting user");
    }
  };

  console.log(    "helsssss",products)

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Product Image",
      dataIndex: "images",
      key: "Images",
      render: (text) => (
        <Image src={text} width={100} height={100} alt={text} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <span title={String(text)}>{String(text).slice(0, 50)}</span>
      ),
    },
    {
      title: "Category-name",
      dataIndex: "categoryname",
      key: "categoryname",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Subcategory-name",
      dataIndex: "subcategoryname",
      key: "subcategoryname",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Discounted Percentage",
      dataIndex: "discountedPercentage",
      key: "discountedPercentage",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Sku",
      dataIndex: "sku",
      key: "sku",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/dashboard/product/edit/${record.key}`}>Edit</a>
          <a onClick={() => handleDelete(record.key)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <Table<DataType>
      columns={columns}
      dataSource={products}
      loading={loading}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default Viewproduct;
