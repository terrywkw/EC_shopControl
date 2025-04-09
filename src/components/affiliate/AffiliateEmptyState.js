import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 40px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #9ca3af;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 10px;
  color: #1f2937;
`;

const Description = styled.p`
  color: #6b7280;
  margin-bottom: 20px;
  max-width: 500px;
`;

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #2563eb;
  }
`;

const Link = styled.a`
  color: #3b82f6;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.875rem;
  margin-top: 10px;
  
  &:hover {
    color: #2563eb;
  }
`;

const AffiliateEmptyState = ({ onAddClick }) => {
  return (
    <Container>
      <EmptyIcon>🔗</EmptyIcon>
      <Title>尚未設定推薦人</Title>
      <Description>
        設定推薦人可以讓更多人幫您推廣商品，透過分享專屬連結為您帶來更多訂單，依照銷售額給予推薦人獎勵。
      </Description>
      <Button onClick={onAddClick}>
        新增推薦人
      </Button>
      <Link href="#" target="_blank">
        了解更多分潤機制
      </Link>
    </Container>
  );
};

export default AffiliateEmptyState;