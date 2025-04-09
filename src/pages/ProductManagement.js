import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 16px 0;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  width: 250px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.variant === 'primary' ? '#3b82f6' : 'white')};
  color: ${(props) => (props.variant === 'primary' ? 'white' : '#3b82f6')};
  border: ${(props) => (props.variant === 'primary' ? 'none' : '1px solid #3b82f6')};
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background-color: ${(props) => (props.variant === 'primary' ? '#2563eb' : '#f0f9ff')};
  }
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
      case 'active':
        return '#dcfce7';
      case 'draft':
        return '#f3f4f6';
      case 'out_of_stock':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case 'active':
        return '#16a34a';
      case 'draft':
        return '#6b7280';
      case 'out_of_stock':
        return '#dc2626';
      default:
        return '#6b7280';
    }
  }};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

const IconPlaceholder = () => (
  <span style={{ width: 16, height: 16, display: 'inline-block', textAlign: 'center' }}>+</span>
);

const ProductManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock product data
  const products = [
    {
      id: 1,
      name: '精選耶加雪夫咖啡豆',
      category: '咖啡豆',
      price: 450,
      stock: 35,
      status: 'active'
    },
    {
      id: 2,
      name: '手沖咖啡濾杯組',
      category: '咖啡器具',
      price: 880,
      stock: 15,
      status: 'active'
    },
    {
      id: 3,
      name: '義式濃縮咖啡機',
      category: '咖啡器具',
      price: 12800,
      stock: 0,
      status: 'out_of_stock'
    },
    {
      id: 4,
      name: '咖啡烘焙入門課程',
      category: '課程',
      price: 3500,
      stock: null,
      status: 'active'
    },
    {
      id: 5,
      name: '手沖咖啡技巧課程',
      category: '課程',
      price: 2800,
      stock: null,
      status: 'draft'
    }
  ];

  const handleEdit = (productId) => {
    alert(`編輯商品 ID: ${productId}`);
  };

  const handleDelete = (productId) => {
    alert(`刪除商品 ID: ${productId}`);
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return '已上架';
      case 'draft':
        return '草稿';
      case 'out_of_stock':
        return '無庫存';
      default:
        return status;
    }
  };

  return (
    <Container>
      <PageHeader>
        <PageTitle>商品管理</PageTitle>
        <Button variant="primary" onClick={() => navigate('/products/add')}>
          <IconPlaceholder />
          新增商品
        </Button>
      </PageHeader>
      
      <SearchContainer>
        <SearchInput 
          placeholder="搜尋商品..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button>搜尋</Button>
      </SearchContainer>
      
      <Card>
        <Table>
          <thead>
            <tr>
              <Th>商品名稱</Th>
              <Th>分類</Th>
              <Th>價格</Th>
              <Th>庫存</Th>
              <Th>狀態</Th>
              <Th>操作</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <Td>
                  <Flex>
                    <ProductImage>圖</ProductImage>
                    {product.name}
                  </Flex>
                </Td>
                <Td>{product.category}</Td>
                <Td>NT$ {product.price}</Td>
                <Td>{product.stock !== null ? product.stock : '無限'}</Td>
                <Td>
                  <Badge status={product.status}>{getStatusText(product.status)}</Badge>
                </Td>
                <Td>
                  <Flex>
                    <ActionButton onClick={() => handleEdit(product.id)}>編輯</ActionButton>
                    <ActionButton onClick={() => handleDelete(product.id)}>刪除</ActionButton>
                  </Flex>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          <PageButton onClick={() => setCurrentPage(1)} active={currentPage === 1}>1</PageButton>
          <PageButton onClick={() => setCurrentPage(2)} active={currentPage === 2}>2</PageButton>
          <PageButton onClick={() => setCurrentPage(3)} active={currentPage === 3}>3</PageButton>
        </Pagination>
      </Card>
    </Container>
  );
};

export default ProductManagement;