import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  
  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  width: 100%;
  font-size: 0.875rem;
  margin-bottom: 12px;
  
  &::placeholder {
    color: #9ca3af;
  }
  
  @media (min-width: 640px) {
    width: 250px;
    margin-bottom: 0;
  }
`;

const InfoText = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  
  @media (min-width: 640px) {
    margin-left: auto;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 650px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-weight: 500;
  color: #6b7280;
  font-size: 0.875rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    background-color: #f9fafb;
  }
`;

const Badge = styled.span`
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => props.status === '啟用' ? '#dcfce7' : '#f3f4f6'};
  color: ${props => props.status === '啟用' ? '#16a34a' : '#6b7280'};
`;

const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.checked ? '#3b82f6' : '#d1d5db'};
  transition: 0.4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${props => props.checked ? 'translateX(16px)' : 'translateX(0)'};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px 16px;
  border-top: 1px solid #e5e7eb;
  overflow-x: auto;
`;

const PageButton = styled.button`
  padding: 6px 12px;
  background-color: ${props => props.active ? '#3b82f6' : 'white'};
  color: ${props => props.active ? 'white' : '#4b5563'};
  border: 1px solid ${props => props.active ? '#3b82f6' : '#d1d5db'};
  border-radius: 4px;
  margin: 0 4px;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '#2563eb' : '#f9fafb'};
  }
`;

const AffiliateList = ({ affiliates, onAffiliateClick, onToggleStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // 篩選推薦人資料
  const filteredAffiliates = affiliates.filter(
    affiliate => 
      affiliate.id.includes(searchTerm) || 
      affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.surname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // 計算頁數
  const totalPages = Math.ceil(filteredAffiliates.length / itemsPerPage);
  
  // 取得當前頁面的資料
  const currentAffiliates = filteredAffiliates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // 處理切換頁面
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // 處理點擊推薦人
  const handleAffiliateClick = (affiliate) => {
    if (onAffiliateClick) {
      onAffiliateClick(affiliate);
    }
  };
  
  // 處理切換推薦人狀態
  const handleToggleStatus = (e, id) => {
    e.stopPropagation();
    if (onToggleStatus) {
      onToggleStatus(id);
    }
  };

  return (
    <Container>
      <SearchBar>
        <SearchInput 
          placeholder="搜尋推薦人..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InfoText>
          {`1–${Math.min(currentAffiliates.length, itemsPerPage)} 共 ${filteredAffiliates.length} 筆`}
        </InfoText>
      </SearchBar>
      
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>推薦代碼</Th>
              <Th>姓名</Th>
              <Th>類別</Th>
              <Th>總抽成</Th>
              <Th>狀態</Th>
            </tr>
          </thead>
          <tbody>
            {currentAffiliates.map((affiliate) => (
              <tr key={affiliate.id} onClick={() => handleAffiliateClick(affiliate)}>
                <Td>{affiliate.id}</Td>
                <Td>{`${affiliate.name} ${affiliate.surname}`}</Td>
                <Td>{affiliate.type}</Td>
                <Td>{`TWD ${affiliate.commission}`}</Td>
                <Td>
                  <Switch>
                    <SwitchInput 
                      type="checkbox" 
                      checked={affiliate.status === '啟用'} 
                      onChange={(e) => handleToggleStatus(e, affiliate.id)}
                    />
                    <SwitchSlider 
                      checked={affiliate.status === '啟用'} 
                      onClick={(e) => handleToggleStatus(e, affiliate.id)}
                    />
                  </Switch>
                  <Badge status={affiliate.status} style={{ marginLeft: '10px' }}>
                    {affiliate.status}
                  </Badge>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      
      {totalPages > 1 && (
        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PageButton 
              key={page} 
              active={currentPage === page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PageButton>
          ))}
        </Pagination>
      )}
    </Container>
  );
};

export default AffiliateList;