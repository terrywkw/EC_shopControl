import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ActionSelect = styled.select`
  padding: 8px 12px;
  padding-right: 28px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: white;
  cursor: pointer;
  min-width: 150px;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#3b82f6' : 'white'};
  color: ${props => props.primary ? 'white' : '#3b82f6'};
  border: 1px solid ${props => props.primary ? '#3b82f6' : '#d1d5db'};
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.primary ? '#2563eb' : '#f0f9ff'};
  }
  
  &:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
    border-color: #d1d5db;
    cursor: not-allowed;
  }
`;

const SelectedCount = styled.span`
  font-size: 0.875rem;
  color: #4b5563;
`;

const OrderBulkActions = ({ selectedOrders = [], onApplyAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');
  
  const handleActionChange = (e) => {
    setSelectedAction(e.target.value);
  };
  
  const handleApplyAction = () => {
    if (selectedAction && selectedOrders.length > 0) {
      onApplyAction(selectedAction, selectedOrders);
      setSelectedAction('');
    }
  };

  return (
    <Container>
      <SelectedCount>
        已選擇 {selectedOrders.length} 筆訂單
      </SelectedCount>
      
      <SelectContainer>
        <ActionSelect 
          value={selectedAction} 
          onChange={handleActionChange}
          disabled={selectedOrders.length === 0}
        >
          <option value="">批量操作</option>
          <option value="mark_paid">標記為已付款</option>
          <option value="mark_shipped">標記為已出貨</option>
          <option value="mark_completed">標記為已完成</option>
          <option value="mark_cancelled">標記為已取消</option>
          <option value="print">批量列印</option>
          <option value="export">匯出訂單</option>
        </ActionSelect>
      </SelectContainer>
      
      <Button 
        primary 
        onClick={handleApplyAction}
        disabled={!selectedAction || selectedOrders.length === 0}
      >
        套用操作
      </Button>
      
      {selectedOrders.length > 0 && (
        <Button onClick={onClearSelection}>
          清除選擇
        </Button>
      )}
    </Container>
  );
};

export default OrderBulkActions;