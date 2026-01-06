"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";
import React from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Statistic,
  Button,
  Space,
  Grid,
} from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import {
  Line,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const data = [
  { name: "Jul", Orders: 45, Earnings: 50, Refunds: 5 },
  { name: "Aug", Orders: 43, Earnings: 28, Refunds: 8 },
  { name: "Sep", Orders: 88, Earnings: 95, Refunds: 6 },
  { name: "Oct", Orders: 55, Earnings: 42, Refunds: 25 },
  { name: "Nov", Orders: 65, Earnings: 87, Refunds: 15 },
  { name: "Dec", Orders: 68, Earnings: 38, Refunds: 30 },
];

export default function Dashboard() {
  const screens = useBreakpoint();

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("token");
      if (!token) {
        window.location.href = "/admin/login";
      }
    };
    checkAuth();
  }, []);

  return (
    <div
      style={{
        padding: screens.xs ? 12 : 24,
        minHeight: "100vh",
        background: "#f9fafb",
      }}
    >
      {/* === Top Stats Section === */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{ borderRadius: 12, height: "100%", textAlign: "center" }}
          >
            <Statistic
              title="TOTAL EARNINGS"
              value={559.25}
              precision={2}
              prefix="$"
              suffix="k"
            />
            <Text type="success">
              <ArrowUpOutlined /> +16.24%
            </Text>
            <div style={{ marginTop: 8 }}>
              <Button type="link" size="small">
                View net earnings
              </Button>
            </div>
          </Card>
        </Col>
        {/* ... other cards remain the same */}
      </Row>

      {/* === Revenue Section === */}
      <Card style={{ marginTop: 24, borderRadius: 12, overflow: "hidden" }}>
        <Space
          direction={screens.xs ? "vertical" : "horizontal"}
          align={screens.xs ? "start" : "center"}
          style={{ justifyContent: "space-between", width: "100%", marginBottom: 16 }}
        >
          <Title level={screens.xs ? 5 : 4} style={{ margin: 0 }}>
            Revenue
          </Title>
          <Space wrap>
            <Button size="small" type="default">1M</Button>
            <Button size="small" type="default">6M</Button>
            <Button size="small" type="default">1Y</Button>
            <Button size="small" type="default">All</Button>
          </Space>
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={12} sm={12} md={6}><Statistic title="Orders" value={7585} /></Col>
          <Col xs={12} sm={12} md={6}><Statistic title="Earnings" prefix="$" value={22.89} precision={2} suffix="k" /></Col>
          <Col xs={12} sm={12} md={6}><Statistic title="Refunds" value={367} /></Col>
          <Col xs={12} sm={12} md={6}><Statistic title="Conversion Ratio" value={18.92} precision={2} suffix="%" /></Col>
        </Row>

        <div style={{ width: "100%", height: screens.xs ? 250 : 350, marginTop: 30 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: screens.xs ? 10 : 12 }} />
              <YAxis tick={{ fontSize: screens.xs ? 10 : 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: screens.xs ? 10 : 12 }} />
              <Bar dataKey="Earnings" fill="#00b894" radius={[5, 5, 0, 0]} />
              <Line type="monotone" dataKey="Orders" stroke="#1e90ff" strokeWidth={2} />
              <Line type="monotone" dataKey="Refunds" stroke="#ff7675" strokeDasharray="5 5" strokeWidth={2} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
