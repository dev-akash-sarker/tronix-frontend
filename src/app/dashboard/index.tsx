"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";

import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu , Col , Row } from "antd";

import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub9",
    label: "Orders",
    icon: <AppstoreOutlined />,
    children: [
      { key: "/dashboard/orders/allorders", label: "All orders" },
    ],
  },
  {
    key: "sub1",
    label: "Customers",
    icon: <MailOutlined />,
    children: [
      { key: "/dashboard/user/viewuser", label: "All customers" },
    ],
  },
  {
    key: "sub2",
    label: "Products",
    icon: <MailOutlined />,
    children: [
      { key: "/dashboard/product/addproduct", label: "Add Products" },
      { key: "/dashboard/product/viewproduct", label: "View Products" },
    ],
  },
  {
    key: "sub3",
    label: "Category",
    icon: <AppstoreOutlined />,
    children: [
      { key: "/dashboard/category/addcategory", label: "Add Category" },
      { key: "/dashboard/category/viewcategory", label: "View Category" },
      { key: "/dashboard/category/addsubcategory", label: "Add Subcategory" },
      { key: "/dashboard/category/viewsubcategory", label: "View Subcategory" },
    ],
  },
  {
    key: "sub4",
    label: "Promotions",
    icon: <AppstoreOutlined />,
    children: [
      { key: "/dashboard/promotions/addcampaign", label: "Add Campaigns" },
      { key: "/dashboard/promotions/viewcampaign", label: "View Campaign" },
    ],
  },
  {
    key: "sub10",
    label: "Finance",
    icon: <AppstoreOutlined />,
    children: [
      { key: "34", label: "Total earnings" },
      { key: "35", label: "My Balance" },
    ],
  },
  {
    key: "sub6",
    label: "Payment Gateway",
    icon: <AppstoreOutlined />,
    children: [
      { key: "24", label: "Add Paypal" },
      { key: "25", label: "Add Stripe" },
      { key: "26", label: "Add SSL-Commerze" },
    ],
  },
  {
    key: "sub8",
    label: "Delivery Gateway",
    icon: <AppstoreOutlined />,
    children: [
      { key: "27", label: "Add Paypal" },
      { key: "28", label: "Add Stripe" },
      { key: "29", label: "Add SSL-Commerze" },
    ],
  },
  {
    key: "sub11",
    label: "Refund & Returns",
    icon: <AppstoreOutlined />,
    children: [
      { key: "38", label: "Track returns" },
    ],
  },
];


export default function Sidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  // useEffect(() => {
  //   const checkAuth = () => {
  //     const token = Cookies.get("token");
  //     if (!token) {
  //       window.location.href = "/admin/login";
  //     }
  //   };
  //   checkAuth();
  // }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    router.push(e.key)
  };

  return (
     <>
    <Row>
      <Col span={5}>
        <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
          </Col>
      <Col span={19}>
      {children}
      </Col>
    </Row>
 
  </>
    
  );
}
