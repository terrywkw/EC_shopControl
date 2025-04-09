import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const StatTitle = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
`;

const StatChange = styled.div`
  font-size: 0.75rem;
  margin-top: 8px;
  color: ${props => props.positive ? '#16a34a' : '#dc2626'};
  display: flex;
  align-items: center;
`;

const OrderStatCards = ({ stats }) => {
  // 預設統計資料，若沒有傳入資料則使用此預設值
  const defaultStats = {
    total: {
      value: 35,
      change: 12,
      positive: true
    },
    pending: {
      value: 8,
      change: -5,
      positive: false
    },
    processing: {
      value: 12,
      change: 8,
      positive: true
    },
    completed: {
      value: 15,
      change: 2,
      positive: true
    }
  };
  
  const displayStats = stats || defaultStats;

  return (
    <Container>
      <StatCard>
        <StatTitle>所有訂單</StatTitle>
        <StatValue>{displayStats.total.value}</StatValue>
        <StatChange positive={displayStats.total.positive}>
          {displayStats.total.positive ? '▲' : '▼'} {Math.abs(displayStats.total.change)}% 較上週
        </StatChange>
      </StatCard>
      
      <StatCard>
        <StatTitle>待付款</StatTitle>
        <StatValue>{displayStats.pending.value}</StatValue>
        <StatChange positive={displayStats.pending.positive}>
          {displayStats.pending.positive ? '▲' : '▼'} {Math.abs(displayStats.pending.change)}% 較上週
        </StatChange>
      </StatCard>
      
      <StatCard>
        <StatTitle>處理中</StatTitle>
        <StatValue>{displayStats.processing.value}</StatValue>
        <StatChange positive={displayStats.processing.positive}>
          {displayStats.processing.positive ? '▲' : '▼'} {Math.abs(displayStats.processing.change)}% 較上週
        </StatChange>
      </StatCard>
      
      <StatCard>
        <StatTitle>已完成</StatTitle>
        <StatValue>{displayStats.completed.value}</StatValue>
        <StatChange positive={displayStats.completed.positive}>
          {displayStats.completed.positive ? '▲' : '▼'} {Math.abs(displayStats.completed.change)}% 較上週
        </StatChange>
      </StatCard>
    </Container>
  );
};

export default OrderStatCards;