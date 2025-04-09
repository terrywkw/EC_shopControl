import React, { useState } from 'react';
import OrderActions from './OrderActions';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  font-size: 1.25rem;
  
  &:hover {
    color: #3b82f6;
  }
`;

const Content = styled.div`
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 12px 0;
  color: #4b5563;
  font-weight: 500;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;
`;

const InfoItem = styled.div`
  margin-bottom: 8px;
`;

const Label = styled.span`
  display: block;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 2px;
`;

const Value = styled.span`
  font-size: 0.875rem;
  color: #1f2937;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 10px 16px;
  background-color: #f9fafb;
  font-weight: 500;
  color: #4b5563;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 10px 16px;
  border-bottom: 1px solid #e5e7eb;
`;

const OrderTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 16px;
  gap: 8px;
`;

const TotalItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
`;

const TotalLabel = styled.span`
  font-size: 0.875rem;
  color: #4b5563;
`;

const TotalValue = styled.span`
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: ${(props) => (props.bold ? '600' : 'normal')};
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #e5e7eb;
  margin: 16px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? '#3b82f6' : 'white')};
  color: ${(props) => (props.primary ? 'white' : '#3b82f6')};
  border: 1px solid ${(props) => (props.primary ? '#3b82f6' : '#d1d5db')};
  
  &:hover {
    background-color: ${(props) => (props.primary ? '#2563eb' : '#f9fafb')};
  }
`;

const Timeline = styled.div`
  margin-top: 16px;
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 16px;
  position: relative;
  
  &:not(:last-child):after {
    content: '';
    position: absolute;
    left: 12px;
    top: 24px;
    bottom: -8px;
    width: 2px;
    background-color: #e5e7eb;
  }
`;

const TimelineDot = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#3b82f6' : '#e5e7eb')};
  color: ${(props) => (props.active ? 'white' : '#6b7280')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  margin-right: 12px;
  flex-shrink: 0;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
`;

const TimelineDescription = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 2px;
`;

const ProductImage = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f3f4f6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 0.75rem;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OrderDetail = ({ order = {}, onClose }) => {
  const [currentStatus, setCurrentStatus] = useState(order.status || 'pending');
  
  // Mock order data if not provided
  const orderData = order.id ? order : {
    id: 'ORD-1234',
    date: '2025-03-15 14:32',
    customer: {
      name: '林小明',
      email: 'ming@example.com',
      phone: '0912-345-678'
    },
    shipping: {
      address: '台北市中正區測試路123號4樓',
      method: '宅配',
      tracking: 'TW12345678'
    },
    payment: {
      method: '信用卡',
      last4: '4242',
      amount: 1250
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
    status: 'paid',
    timeline: [
      {
        id: 1,
        status: 'pending',
        title: '訂單建立',
        description: '2025-03-15 14:32',
        completed: true
      },
      {
        id: 2,
        status: 'paid',
        title: '付款完成',
        description: '2025-03-15 14:35',
        completed: true
      },
      {
        id: 3,
        status: 'shipped',
        title: '商品出貨',
        description: '待處理',
        completed: false
      },
      {
        id: 4,
        status: 'completed',
        title: '訂單完成',
        description: '待處理',
        completed: false
      }
    ]
  };

  const subtotal = orderData.items.reduce((sum, item) => sum + item.total, 0);
  const shipping = 100;
  const total = subtotal + shipping;
  
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
  
  const updateOrderStatus = (newStatus) => {
    // 模擬狀態更新
    setCurrentStatus(newStatus);
    alert(`訂單狀態已更新為: ${getStatusText(newStatus)}`);
  };

  return (
    <Container>
      <Header>
        <Title>
          訂單詳情
          <Badge status={currentStatus}>{getStatusText(currentStatus)}</Badge>
        </Title>
        <CloseButton onClick={onClose}>×</CloseButton>
      </Header>
      
      <Content>
        <Section>
          <SectionTitle>訂單資訊</SectionTitle>
          <Grid>
            <InfoItem>
              <Label>訂單編號</Label>
              <Value>{orderData.id}</Value>
            </InfoItem>
            <InfoItem>
              <Label>訂單日期</Label>
              <Value>{orderData.date}</Value>
            </InfoItem>
          </Grid>
        </Section>
        
        <Section>
          <SectionTitle>客戶資訊</SectionTitle>
          <Grid>
            <InfoItem>
              <Label>姓名</Label>
              <Value>{orderData.customer.name}</Value>
            </InfoItem>
            <InfoItem>
              <Label>電子郵件</Label>
              <Value>{orderData.customer.email}</Value>
            </InfoItem>
            <InfoItem>
              <Label>聯絡電話</Label>
              <Value>{orderData.customer.phone}</Value>
            </InfoItem>
          </Grid>
        </Section>
        
        <Section>
          <SectionTitle>配送資訊</SectionTitle>
          <Grid>
            <InfoItem>
              <Label>配送地址</Label>
              <Value>{orderData.shipping.address}</Value>
            </InfoItem>
            <InfoItem>
              <Label>配送方式</Label>
              <Value>{orderData.shipping.method}</Value>
            </InfoItem>
            <InfoItem>
              <Label>追蹤編號</Label>
              <Value>{orderData.shipping.tracking || '尚未建立'}</Value>
            </InfoItem>
          </Grid>
        </Section>
        
        <Section>
          <SectionTitle>付款資訊</SectionTitle>
          <Grid>
            <InfoItem>
              <Label>付款方式</Label>
              <Value>{orderData.payment.method}</Value>
            </InfoItem>
            {orderData.payment.last4 && (
              <InfoItem>
                <Label>卡號末四碼</Label>
                <Value>**** **** **** {orderData.payment.last4}</Value>
              </InfoItem>
            )}
          </Grid>
        </Section>
        
        <Section>
          <SectionTitle>商品明細</SectionTitle>
          <Table>
            <thead>
              <tr>
                <Th>商品</Th>
                <Th>單價</Th>
                <Th>數量</Th>
                <Th style={{ textAlign: 'right' }}>小計</Th>
              </tr>
            </thead>
            <tbody>
              {orderData.items.map((item) => (
                <tr key={item.id}>
                  <Td>
                    <Flex>
                      <ProductImage>圖</ProductImage>
                      {item.name}
                    </Flex>
                  </Td>
                  <Td>NT$ {item.price}</Td>
                  <Td>{item.quantity}</Td>
                  <Td style={{ textAlign: 'right' }}>NT$ {item.total}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <OrderTotal>
            <TotalItem>
              <TotalLabel>商品小計</TotalLabel>
              <TotalValue>NT$ {subtotal}</TotalValue>
            </TotalItem>
            <TotalItem>
              <TotalLabel>運費</TotalLabel>
              <TotalValue>NT$ {shipping}</TotalValue>
            </TotalItem>
            <Divider />
            <TotalItem>
              <TotalLabel>訂單總額</TotalLabel>
              <TotalValue bold>NT$ {total}</TotalValue>
            </TotalItem>
          </OrderTotal>
        </Section>
        
        <Section>
          <SectionTitle>訂單進度</SectionTitle>
          <Timeline>
            {orderData.timeline.map((step) => (
              <TimelineItem key={step.id}>
                <TimelineDot active={step.completed}>
                  {step.completed ? '✓' : ''}
                </TimelineDot>
                <TimelineContent>
                  <TimelineTitle>{step.title}</TimelineTitle>
                  <TimelineDescription>{step.description}</TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Section>
        
        <OrderActions 
          order={{ ...orderData, status: currentStatus }}
          onStatusChange={(action) => {
            // 處理不同的訂單操作
            switch(action) {
              case 'mark_paid':
                updateOrderStatus('paid');
                break;
              case 'mark_shipped':
                updateOrderStatus('shipped');
                break;
              case 'mark_completed':
                updateOrderStatus('completed');
                break;
              case 'cancel_order':
                updateOrderStatus('cancelled');
                break;
              case 'print_receipt':
                alert('準備列印收據...');
                break;
              case 'refund':
                alert('處理退款中...');
                break;
              default:
                alert(`執行操作: ${action}`);
            }
          }}
        />
        
        <Button onClick={() => alert('準備列印訂單...')} style={{ marginTop: '10px' }}>
          列印訂單
        </Button>
      </Content>
    </Container>
  );
};

export default OrderDetail;