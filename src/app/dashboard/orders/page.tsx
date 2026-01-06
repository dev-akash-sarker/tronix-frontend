import React, { useState } from 'react';
import { Table, Tag, Avatar, Rate, Select, Card, Typography, Space } from 'antd';
import { ColumnsType } from 'antd/es/table'; // Import ColumnsType for strong typing
import { UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// --- 1. TypeScript Interfaces ---

type StatusType = 'Paid' | 'Pending' | 'Unpaid' | 'Canceled';

interface CustomerType {
  name: string;
  avatar: string;
}

interface DataType {
  key: string;
  orderId: string;
  customer: CustomerType;
  product: string;
  amount: number;
  vendor: string;
  status: StatusType; // Use the defined union type
  rating: number;
  votes: number;
}

// --- 2. Sample Data (Typed) ---

const initialData: DataType[] = [ // Ensure initial data conforms to DataType[]
  {
    key: '1',
    orderId: '#VZ2112',
    customer: { name: 'Alex Smith', avatar: 'https://placehold.co/100x100/A0522D/ffffff?text=AS' },
    product: 'Clothes',
    amount: 109.00,
    vendor: 'Zoetic Fashion',
    status: 'Paid',
    rating: 5.0,
    votes: 61,
  },
  {
    key: '2',
    orderId: '#VZ2111',
    customer: { name: 'Jansh Brown', avatar: 'https://placehold.co/100x100/87CEEB/ffffff?text=JB' },
    product: 'Kitchen Storage',
    amount: 149.00,
    vendor: 'Micro Design',
    status: 'Pending',
    rating: 4.5,
    votes: 61,
  },
  {
    key: '3',
    orderId: '#VZ2109',
    customer: { name: 'Ayaan Bowen', avatar: 'https://placehold.co/100x100/FFD700/000000?text=AB' },
    product: 'Bike Accessories',
    amount: 215.00,
    vendor: 'Nesta Technologies',
    status: 'Paid',
    rating: 4.9,
    votes: 89,
  },
  {
    key: '4',
    orderId: '#VZ2108',
    customer: { name: 'Prezy Mark', avatar: 'https://placehold.co/100x100/FF69B4/ffffff?text=PM' },
    product: 'Furniture',
    amount: 199.00,
    vendor: 'Syntyce Solutions',
    status: 'Unpaid',
    rating: 4.3,
    votes: 47,
  },
  {
    key: '5',
    orderId: '#VZ2107',
    customer: { name: 'Vihan Hudda', avatar: 'https://placehold.co/100x100/6A5ACD/ffffff?text=VH' },
    product: 'Bags and Wallets',
    amount: 330.00,
    vendor: 'iTest Factory',
    status: 'Paid',
    rating: 4.7,
    votes: 161,
  },
];

// Options for the editable status dropdown (typed for clarity)
const statusOptions: { value: StatusType; label: string }[] = [
  { value: 'Paid', label: 'Paid' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Unpaid', label: 'Unpaid' },
  { value: 'Canceled', label: 'Canceled' },
];

// --- 3. Main Component (TSX) ---

// Define the component as a React Functional Component (FC)
const Orders: React.FC = () => {
  // Type the state to hold an array of DataType
  const [data, setData] = useState<DataType[]>(initialData);

  // Function to determine the color of the Status tag (Typed)
  const getStatusColor = (status: StatusType): string => {
    switch (status) {
      case 'Paid':
        return 'green';
      case 'Pending':
        return 'gold';
      case 'Unpaid':
        return 'red';
      default:
        return 'default';
    }
  };

  // Handler for status change (Typed arguments)
  const handleStatusChange = (value: StatusType, recordKey: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === recordKey ? { ...item, status: value } : item
      )
    );
  };

  // --- 4. Column Definitions (Typed with ColumnsType<DataType>) ---

  const columns: ColumnsType<DataType> = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 100,
      fixed: 'left',
      // Render function arguments are automatically typed by ColumnsType
      render: (text) => <Text strong type="secondary">{text}</Text>,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      width: 180,
      render: (customer: CustomerType) => (
        <Space>
          {/* We now know 'customer' is of type CustomerType */}
          <Avatar size="small" src={customer.avatar} icon={<UserOutlined />} />
          <Text>{customer.name}</Text>
        </Space>
      ),
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      width: 180,
      responsive: ['sm'],
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      align: 'right',
      render: (amount) => <Text style={{ color: '#1890ff' }}>${amount.toFixed(2)}</Text>,
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
      width: 150,
      responsive: ['md'],
    },
    {
      title: 'Status (Editable)',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      fixed: 'right',
      // The second argument of render is the whole record, which is DataType
      render: (status: StatusType, record) => (
        // The Select component uses StatusType for its value
        <Select<StatusType>
          defaultValue={status}
          onChange={(value) => handleStatusChange(value, record.key)}
          style={{ width: 120 }}
          bordered={false}
          dropdownStyle={{ minWidth: 120 }}
          options={statusOptions}
          value={status}
          optionRender={(option) => {
            // FIX: Safely assert that the label is a string and the value is StatusType
            const labelText = String(option.label || ''); 
            const statusValue = option.value as StatusType;

            return (
              <Tag color={getStatusColor(statusValue)} style={{ margin: 0 }}>
                {labelText.toUpperCase()}
              </Tag>
            );
          }}
        >
          {/* Note: In Ant Design 5, using the `options` prop is the preferred way over mapping Option components */}
        </Select>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 150,
      render: (rating, record) => (
        <Space direction="vertical" size={2} style={{ alignItems: 'flex-start' }}>
          <Rate disabled defaultValue={rating} allowHalf count={5} style={{ fontSize: 16 }} />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {rating.toFixed(1)} ({record.votes} votes)
          </Text>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, minHeight: '100vh', background: '#f0f2f5' }}>
      <Card
        title={<Title level={4} style={{ margin: 0 }}>Order Tracking Dashboard</Title>}
        bordered={false}
        style={{ borderRadius: 12 }}
        bodyStyle={{ padding: 0 }}
      >
        {/* We explicitly tell the Table component what type of data it is receiving */}
        <Table<DataType>
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 900 }} 
          size="middle"
          rowClassName="editable-row"
          style={{ width: '100%' }}
        />
      </Card>
      
      <div style={{ marginTop: 20, padding: 16, backgroundColor: '#fff', borderRadius: 8 }}>
        <Title level={5}>Live Status Data (For Debugging)</Title>
        {data.map(item => (
          <Text key={item.key} style={{ display: 'block' }}>
            {item.orderId}: <Tag color={getStatusColor(item.status)}>{item.status.toUpperCase()}</Tag>
          </Text>
        ))}
      </div>
    </div>
  );
};

export default Orders;