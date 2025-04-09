import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 20px;
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? '#3b82f6' : 'white'};
  color: ${props => props.primary ? 'white' : '#3b82f6'};
  border: 1px solid ${props => props.primary ? '#3b82f6' : '#e5e7eb'};
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-right: 10px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.primary ? '#2563eb' : '#f0f9ff'};
  }
  
  &:disabled {
    background-color: #f3f4f6;
    color: #9ca3af;
    border-color: #e5e7eb;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const OrderActions = ({ order, onStatusChange }) => {
  // 可用的狀態操作
  const availableActions = {
    pending: [
      { 
        action: 'mark_paid', 
        label: '標記為已付款', 
        primary: true, 
        icon: '💰'
      },
      { 
        action: 'cancel_order', 
        label: '取消訂單', 
        primary: false, 
        icon: '❌'
      }
    ],
    paid: [
      { 
        action: 'mark_shipped', 
        label: '標記為已出貨', 
        primary: true, 
        icon: '📦'
      },
      { 
        action: 'refund', 
        label: '退款', 
        primary: false, 
        icon: '💸'
      }
    ],
    shipped: [
      { 
        action: 'mark_completed', 
        label: '標記為已完成', 
        primary: true, 
        icon: '✅'
      },
      { 
        action: 'resend_notification', 
        label: '重新發送通知', 
        primary: false, 
        icon: '📧'
      }
    ],
    completed: [
      { 
        action: 'print_receipt', 
        label: '列印收據', 
        primary: false, 
        icon: '🖨️'
      }
    ],
    cancelled: [
      { 
        action: 'reactivate', 
        label: '重新啟用', 
        primary: false, 
        icon: '🔄'
      }
    ]
  };

  const currentActions = availableActions[order.status] || [];

  const handleAction = (action) => {
    if (onStatusChange) {
      onStatusChange(action);
    }
  };

  return (
    <Container>
      <ButtonGroup>
        {currentActions.map((action, index) => (
          <ActionButton
            key={index}
            primary={action.primary}
            onClick={() => handleAction(action.action)}
          >
            {action.icon} {action.label}
          </ActionButton>
        ))}
      </ButtonGroup>
    </Container>
  );
};

export default OrderActions;