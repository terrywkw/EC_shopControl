import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 240px;
  background-color: #ffffff;
  height: calc(100vh - 60px);
  border-right: 1px solid #e1e4e8;
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e1e4e8;
`;

const ShopInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShopName = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

const ShopStatus = styled.span`
  font-size: 0.75rem;
  color: #16a34a;
  margin-top: 4px;
`;

const NavMenu = styled.nav`
  padding: 10px 0;
`;

const MenuItem = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.active ? '#3b82f6' : '#4b5563')};
  background-color: ${(props) => (props.active ? '#dbeafe' : 'transparent')};
  font-weight: ${(props) => (props.active ? '500' : 'normal')};
  border-left: ${(props) => (props.active ? '4px solid #3b82f6' : '4px solid transparent')};
  
  &:hover {
    background-color: ${(props) => (props.active ? '#dbeafe' : '#f9fafb')};
  }
`;

const MenuItemText = styled.span`
  margin-left: 10px;
`;

const MenuGroup = styled.div`
  margin-bottom: 10px;
`;

const MenuGroupTitle = styled.div`
  padding: 10px 20px;
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Sidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState({});

  // Mock placeholder for icons
  const IconPlaceholder = ({ label }) => (
    <span style={{ width: 20, height: 20, display: 'inline-block', textAlign: 'center' }}>
      {label.charAt(0)}
    </span>
  );

  return (
    <SidebarContainer>
      <SidebarHeader>
        <ShopInfo>
          <ShopName>好咖啡小舖</ShopName>
          <ShopStatus>●&nbsp;營業中</ShopStatus>
        </ShopInfo>
      </SidebarHeader>
      
      <NavMenu>
        <MenuGroup>
          <MenuGroupTitle>營運管理</MenuGroupTitle>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <MenuItem active={location.pathname === '/'}>
              <IconPlaceholder label="儀" />
              <MenuItemText>儀表板</MenuItemText>
            </MenuItem>
          </Link>
          <Link to="/orders" style={{ textDecoration: 'none' }}>
            <MenuItem active={location.pathname === '/orders'}>
              <IconPlaceholder label="訂" />
              <MenuItemText>訂單管理</MenuItemText>
            </MenuItem>
          </Link>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <MenuItem active={location.pathname === '/products'}>
              <IconPlaceholder label="商" />
              <MenuItemText>商品管理</MenuItemText>
            </MenuItem>
          </Link>
        </MenuGroup>
        
        <MenuGroup>
          <MenuGroupTitle>行銷推廣</MenuGroupTitle>
          <Link to="/affiliate" style={{ textDecoration: 'none' }}>
            <MenuItem active={location.pathname === '/affiliate'}>
              <IconPlaceholder label="分" />
              <MenuItemText>分潤導購</MenuItemText>
            </MenuItem>
          </Link>
          <Link to="/affiliate/settings" style={{ textDecoration: 'none' }}>
            <MenuItem active={location.pathname === '/affiliate/settings'}>
              <IconPlaceholder label="設" />
              <MenuItemText>分潤設定</MenuItemText>
            </MenuItem>
          </Link>
          <Link to="/affiliate/referrers" style={{ textDecoration: 'none' }}>
            <MenuItem active={location.pathname === '/affiliate/referrers'}>
              <IconPlaceholder label="推" />
              <MenuItemText>推薦人管理</MenuItemText>
            </MenuItem>
          </Link>
          <MenuItem>
            <IconPlaceholder label="優" />
            <MenuItemText>優惠券管理</MenuItemText>
          </MenuItem>
        </MenuGroup>
        
        <MenuGroup>
          <MenuGroupTitle>賣家成長</MenuGroupTitle>
          <Link to="/achievements" style={{ textDecoration: 'none' }}>
            <MenuItem active={location.pathname === '/achievements'}>
              <IconPlaceholder label="成" />
              <MenuItemText>成就中心</MenuItemText>
            </MenuItem>
          </Link>
          <Link to="/ai-services" style={{ textDecoration: 'none' }}>
            <MenuItem active={location.pathname === '/ai-services'}>
              <IconPlaceholder label="AI" />
              <MenuItemText>AI 服務管理</MenuItemText>
            </MenuItem>
          </Link>
        </MenuGroup>
        
        <MenuGroup>
          <MenuGroupTitle>系統設定</MenuGroupTitle>
          <Link to="/settings" style={{ textDecoration: 'none' }}>
            <MenuItem active={location.pathname === '/settings'}>
              <IconPlaceholder label="設" />
              <MenuItemText>店舖設定</MenuItemText>
            </MenuItem>
          </Link>
        </MenuGroup>
      </NavMenu>
    </SidebarContainer>
  );
};

export default Sidebar;