"use client";

import React, { useState, useEffect } from 'react';
import { Table, Tag, Avatar, Select, Card, Typography, Space, Spin, Alert } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment'; 

const { Title, Text } = Typography;

// --- 1. TypeScript Interfaces (CORRECTED for 'items' array) ---

type StatusType = 'Delivered' | 'Pending' | 'Unpaid' | 'Canceled';

// ⭐ CORRECTED PRODUCT INTERFACE ⭐
interface OrderProduct {
    productId: number | string; // Using number or string to be flexible
    title: string;
    quantity: number;
    price: number; // Added price
    _id: string;
    image?: string; // Made optional if not always returned
}

interface BackendOrderType {
    _id: string;
    buyer: {
        firstName: string;
        lastName: string;
        email: string;
        contact: string;
        address: string;
        city: string;
        country: string;
        zipCode: string;
        note: string;
    };
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    items: OrderProduct[]; // ⭐ CORRECTED: Products are in the 'items' array
    payment: {
        method: string;
        status: StatusType;
    };
    createdAt: string;
    updatedAt: string;
    status: string;
    __v: number;
}

// The interface for the data displayed in the Ant Design Table
interface DisplayDataType {
    key: string;
    orderId: string;
    customerName: string;
    customerEmail: string;
    amount: number;
    paymentMethod: string;
    status: StatusType;
    createdAt: string;
    productSummary: OrderProduct[]; // The array the column uses
}

// Options for the editable status dropdown
const statusOptions: { value: StatusType; label: string }[] = [
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Unpaid', label: 'Unpaid' },
    { value: 'Canceled', label: 'Canceled' },
];


// --- 2. Main Component (TSX) ---

const Allorders: React.FC = () => {
    const [data, setData] = useState<DisplayDataType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- Data Fetching Logic ---
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/order/vieworders`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const backendOrders: BackendOrderType[] = await response.json();

                // ⭐ Data Transformation Step - FIX APPLIED ⭐
                const transformedData: DisplayDataType[] = backendOrders.map(order => {
                    return {
                        key: order._id,
                        orderId: order._id.substring(18),
                        customerName: `${order.buyer.firstName} ${order.buyer.lastName}`,
                        customerEmail: order.buyer.email,
                        amount: order.total,
                        paymentMethod: order.payment.method,
                        status: order.payment?.status || (order.status as StatusType) || 'Pending', 
                        createdAt: order.createdAt,
                        productSummary: order.items, // <<< FIX: Using 'order.items' now!
                    };
                });

                setData(transformedData);
            } catch (err) {
                setError((err as Error).message || "An unknown error occurred");
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []); 

    // --- Utility Functions ---

    const getStatusColor = (status: StatusType): string => {
        switch (status) {
            case 'Delivered': return 'green';
            case 'Pending': return 'gold';
            case 'Unpaid': return 'red';
            case 'Canceled': return 'default';
            default: return 'default';
        }
    };

const handleStatusChange = async (value: StatusType, recordKey: string) => {
    // Optimistic UI update
    setData((prevData) =>
        prevData.map((item) =>
            item.key === recordKey ? { ...item, status: value } : item
        )
    );

    try {
        const response = await fetch(`http://localhost:8000/api/v1/order/updatestatus/${recordKey}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: value }),
        });

        if (!response.ok) {
            throw new Error("Failed to update status");
        }

        console.log(`✔ Status updated in backend for order ${recordKey}`);

    } catch (error) {
        console.error("Backend status update failed:", error);

        // Rollback UI
setData((prevData) =>
      prevData.map((item) =>
          // 🛑 FIX: Replace 'record.status' with 'newStatus'
          item.key === recordKey ? { ...item, status: value } : item 
      )
  );

        alert("❌ Failed to update status. Please try again.");
    }
};

    
    // --- Column Definitions ---

    const columns: ColumnsType<DisplayDataType> = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
            width: 100,
            fixed: 'left',
            render: (text) => <Text strong type="secondary">...{text}</Text>,
        },
        {
            title: 'Customer',
            dataIndex: 'customerName',
            key: 'customerName',
            width: 180,
            render: (name, record) => (
                <Space direction='vertical' size={0}>
                    <Text strong>{name}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>{record.customerEmail}</Text>
                </Space>
            ),
        },
        // ⭐ PRODUCTS COLUMN - Now displays items from the 'items' array ⭐
        {
            title: 'Products',
            dataIndex: 'productSummary',
            key: 'productSummary',
            width: 280, 
            render: (products: OrderProduct[]) => (
                <Space direction="vertical" size={4} style={{ alignItems: 'flex-start', width: '100%' }}>
                    {products && products.slice(0, 2).map((p, index) => (
                        <Space key={index} style={{ width: '100%' }}>
                            {/* NOTE: We assume 'p.image' is available. If not, Antd will use UserOutlined icon. */}
                            <Avatar 
                                size="small" 
                                src={p.image} 
                                alt={p.title} 
                                icon={<UserOutlined />}
                                style={{ border: '1px solid #f0f0f0' }}
                            />
                            <Text ellipsis={true} style={{ flex: 1 }}>
                                **{p.quantity}x** **{p.title}**
                                <Text type="secondary" style={{ marginLeft: 8 }}>(${p.price.toFixed(2)})</Text>
                            </Text>
                        </Space>
                    ))}
                    {products && products.length > 2 && (
                        <Text type="secondary" style={{ fontSize: 12, marginLeft: 30 }}>
                            ... and {products.length - 2} more items
                        </Text>
                    )}
                    {(!products || products.length === 0) && (
                        <Text type="warning">No products listed</Text>
                    )}
                </Space>
            ),
        },
        // --- End of Products Column ---
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 120,
            align: 'right',
            render: (amount) => <Text style={{ color: '#1890ff' }}>${amount.toFixed(2)}</Text>,
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            width: 150,
            responsive: ['md'],
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (dateString) => (
                <Text>{moment(dateString).format('MMM D, YYYY h:mm A')}</Text>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            fixed: 'right',
            render: (status: StatusType, record) => (
                <Select<StatusType>
                    defaultValue={status}
                    onChange={(value) => handleStatusChange(value, record.key)}
                    style={{ width: 120 }}
                    variant='outlined'
                    options={statusOptions}
                    value={status}
                    optionRender={(option) => {
                        const labelText = String(option.label || '');
                        const statusValue = option.value as StatusType;

                        return (
                            <Tag color={getStatusColor(statusValue)} style={{ margin: 0 }}>
                                {labelText.toUpperCase()}
                            </Tag>
                        );
                    }}
                />
            ),
        },
    ];

    // --- Render Logic for Loading/Error States ---

    if (loading) {
        const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
        return (
            <div style={{ padding: 50, textAlign: 'center' }}>
                <Spin indicator={antIcon} />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: 24 }}>
                <Alert
                    message="Error"
                    description={`Failed to fetch orders: ${error}. Please ensure your backend is running and accessible.`}
                    type="error"
                    showIcon
                />
            </div>
        );
    }
    
    if (data.length === 0) {
        return (
             <div style={{ padding: 24 }}>
                <Alert
                    message="No Orders Found"
                    description="The server returned an empty list of orders."
                    type="info"
                    showIcon
                />
            </div>
        );
    }


    return (
        <div style={{ padding: 24, minHeight: '100vh', background: '#f0f2f5' }}>
            <Card
                title={<Title level={4} style={{ margin: 0 }}>All Orders</Title>}
                variant='outlined'
                style={{ borderRadius: 12 }}
            >
                <Table<DisplayDataType>
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 1100 }} 
                    size="middle"
                    rowClassName="editable-row"
                    style={{ width: '100%' }}
                />
            </Card>
        </div>
    );
};

export default Allorders;