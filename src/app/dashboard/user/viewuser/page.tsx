"use client";
import React, { useEffect, useState } from "react";
import { Space, Table, message  } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
  age?: number;
  address: string;
}



const Viewuser: React.FC = () => {
  const [users, setUsers] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/user/dashboard/alluser"
        );
        const data = await res.json();

        // 👇 assuming your API returns array of users like [{id, name, age, address}]
        const formattedData = data.map((user: any, index: number) => ({
          key: user._id || index.toString(),
          name: user.fullname,
          email: user.email,
          age: user.age,
          address: user.address,
        }));

        setUsers(formattedData);
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
      const res = await fetch(`http://localhost:8000/api/v1/user/dashboard/deleteuser/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        message.success("User deleted successfully");
        setUsers((prev) => prev.filter((user) => user.key !== id));
      } else {
        message.error("Failed to delete user");
      }
    } catch (error) {
      console.error(error);
      message.error("Error deleting user");
    }
  };

  const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a onClick={() => handleDelete(record.key)}>Delete</a>
        <pre>{record.key}</pre>
      </Space>
    ),
  },
];

  return (
    <Table<DataType>
      columns={columns}
      dataSource={users}
      loading={loading}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default Viewuser;
