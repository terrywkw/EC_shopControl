import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #ffffff;
  border-bottom: 1px solid #e1e4e8;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #dbeafe;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-weight: bold;
`;

const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>好嗨!商 賣家中心</Logo>
      <UserInfo>
        <UserName>王小明</UserName>
        <UserAvatar>王</UserAvatar>
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;