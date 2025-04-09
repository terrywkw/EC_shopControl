import React, { useState } from 'react';
import styled from 'styled-components';
import OrderDetail from '../components/orders/OrderDetail';
import OrderBulkActions from '../components/orders/OrderBulkActions';
import OrderStatCards from '../components/orders/OrderStatCards';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PageHeader = styled.div`
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const PageDescription = styled.p`
  color: #6b7280;
  margin: 4px 0 0 0;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  width: 250px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-weight: 500;
  color: #4b5563;
  font-size: 0.875rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.875rem;
`;

const Badge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${(props) => {
    switch (props.status) {
      case 'pending':
        return '#fffbeb';
      case 'paid':
        return '#dcfce7';
      case 'shipped':
        return '#dbeafe';
      case 'completed':
        return '#f3f4f6';
      case 'cancelled':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case 'pending':
        return '#d97706';
      case 'paid':
        return '#16a34a';
      case 'shipped':
        return '#2563eb';
      case 'completed':
        return '#4b5563';
      case 'cancelled':
        return '#dc2626';
      default:
        return '#6b7280';
    }
  }};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px 16px;
  border-top: 1px solid #e5e7eb;
`;

const PageButton = styled.button`
  padding: 6px 12px;
  background-color: ${(props) => (props.active ? '#3b82f6' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#4b5563')};
  border: 1px solid ${(props) => (props.active ? '#3b82f6' : '#d1d5db')};
  border-radius: 4px;
  margin: 0 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${(props) => (props.active ? '#2563eb' : '#f9fafb')};
  }
`;

const Button = styled.button`
  background-color: white;
  color: #3b82f6;
  border: 1px solid #3b82f6;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    background-color: #f0f9ff;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 8px;
`;

const Checkbox = styled.input`
  cursor: pointer;
`;

const OrderManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  
  // Mock order data
  const orders = [
    {
      id: 'ORD-1234',
      customer: '林小明',
      date: '2025-03-15',
      amount: 1250,
      items: 3,
      status: 'pending'
    },
    {
      id: 'ORD-1233',
      customer: '陳大華',
      date: '2025-03-14',
      amount: 4580,
      items: 2,
      status: 'paid'
    },
    {
      id: 'ORD-1232',
      customer: '張小美',
      date: '2025-03-12',
      amount: 890,
      items: 1,
      status: 'shipped'
    },
    {
      id: 'ORD-1231',
      customer: '王大明',
      date: '2025-03-10',
      amount: 3450,
      items: 4,
      status: 'completed'
    },
    {
      id: 'ORD-1230',
      customer: '李小芳',
      date: '2025-03-08',
      amount: 2100,
      items: 2,
      status: 'cancelled'
    }
  ];

  // 擴充訂單資料 (用於詳情顯示)
  const getFullOrderData = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return null;
    
    return {
      ...order,
      customer: {
        name: order.customer,
        email: `customer_${order.id.split('-')[1]}@example.com`,
        phone: `0912-345-${order.id.split('-')[1]}`
      },
      date: `${order.date} 14:30`,
      shipping: {
        address: `台北市中正區測試路123號4樓`,
        method: '宅配',
        tracking: order.status === 'shipped' || order.status === 'completed' ? `TW12345678` : ''
      },
      payment: {
        method: '信用卡',
        last4: '4242',
        amount: order.amount
      },
      items: [
        {
          id: 1,
          name: '精選耶加雪夫咖啡豆',
          quantity: 2,
          price: 450,
          total: 900
        },
        {
          id: 2,
          name: '手沖濾紙 100入',
          quantity: 1,
          price: 350,
          total: 350
        }
      ],
      timeline: [
        {
          id: 1,
          status: 'pending',
          title: '訂單建立',
          description: order.date,
          completed: true
        },
        {
          id: 2,
          status: 'paid',
          title: '付款完成',
          description: order.status === 'pending' ? '待處理' : order.date,
          completed: order.status !== 'pending'
        },
        {
          id: 3,
          status: 'shipped',
          title: '商品出貨',
          description: ['shipped', 'completed'].includes(order.status) ? order.date : '待處理',
          completed: ['shipped', 'completed'].includes(order.status)
        },
        {
          id: 4,
          status: 'completed',
          title: '訂單完成',
          description: order.status === 'completed' ? order.date : '待處理',
          completed: order.status === 'completed'
        }
      ]
    };
  };

  const handleViewOrder = (orderId) => {
    const orderData = getFullOrderData(orderId);
    setSelectedOrder(orderData);
    setShowOrderDetail(true);
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return '待付款';
      case 'paid':
        return '已付款';
      case 'shipped':
        return '已出貨';
      case 'completed':
        return '已完成';
      case 'cancelled':
        return '已取消';
      default:
        return status;
    }
  };
  
  const closeOrderDetail = () => {
    setShowOrderDetail(false);
    setSelectedOrder(null);
  };

  // 處理訂單選擇
  const handleOrderSelect = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };
  
  // 處理全選/取消全選
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(filteredOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };
  
  // 處理批量操作
  const handleBulkAction = (action, orderIds) => {
    // 在實際應用中，這裡會與後端 API 通訊
    // 這裡僅做模擬
    alert(`對 ${orderIds.length} 筆訂單執行操作: ${action}`);
  };

  // 根據篩選條件過濾訂單
  const filteredOrders = orders.filter(order => {
    // 狀態篩選
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false;
    }
    
    // 搜尋條件
    if (searchTerm && !order.id.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !order.customer.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <Container>
      <PageHeader>
        <PageTitle>訂單管理</PageTitle>
        <PageDescription>處理和追蹤所有訂單</PageDescription>
      </PageHeader>
      
      {/* 訂單統計卡片 */}
      <OrderStatCards />
      
      {/* 批量操作區塊 */}
      <OrderBulkActions 
        selectedOrders={selectedOrders}
        onApplyAction={handleBulkAction}
        onClearSelection={() => setSelectedOrders([])}
      />
      
      {/* 過濾與搜尋區塊 */}
      <FilterContainer>
        <FilterSelect 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">所有狀態</option>
          <option value="pending">待付款</option>
          <option value="paid">已付款</option>
          <option value="shipped">已出貨</option>
          <option value="completed">已完成</option>
          <option value="cancelled">已取消</option>
        </FilterSelect>
        
        <SearchInput 
          placeholder="搜尋訂單號或客戶名稱..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FilterContainer>
      
      {/* 訂單列表 */}
      <Card>
        <Table>
          <thead>
            <tr>
              <Th style={{ width: '40px' }}>
                <Checkbox 
                  type="checkbox" 
                  checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                  onChange={handleSelectAll}
                />
              </Th>
              <Th>訂單編號</Th>
              <Th>客戶</Th>
              <Th>日期</Th>
              <Th>金額</Th>
              <Th>商品數</Th>
              <Th>狀態</Th>
              <Th>操作</Th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <Td>
                    <Checkbox 
                      type="checkbox" 
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleOrderSelect(order.id)}
                    />
                  </Td>
                  <Td>{order.id}</Td>
                  <Td>{order.customer}</Td>
                  <Td>{order.date}</Td>
                  <Td>NT$ {order.amount}</Td>
                  <Td>{order.items}</Td>
                  <Td>
                    <Badge status={order.status}>{getStatusText(order.status)}</Badge>
                  </Td>
                  <Td>
                    <Button onClick={() => handleViewOrder(order.id)}>
                      查看
                    </Button>
                  </Td>
                </tr>
              ))
            ) : (
              <tr>
                <Td colSpan="8" style={{ textAlign: 'center', padding: '24px' }}>
                  沒有找到符合條件的訂單
                </Td>
              </tr>
            )}
          </tbody>
        </Table>
        
        {filteredOrders.length > 0 && (
          <Pagination>
            <PageButton onClick={() => setCurrentPage(1)} active={currentPage === 1}>1</PageButton>
            <PageButton onClick={() => setCurrentPage(2)} active={currentPage === 2}>2</PageButton>
            <PageButton onClick={() => setCurrentPage(3)} active={currentPage === 3}>3</PageButton>
          </Pagination>
        )}
      </Card>
      
      {/* 訂單詳情彈窗 */}
      {showOrderDetail && (
        <Modal>
          <ModalContent>
            <OrderDetail order={selectedOrder} onClose={closeOrderDetail} />
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default OrderManagement;