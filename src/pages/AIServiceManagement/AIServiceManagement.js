import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TokenPurchaseModal from './TokenPurchaseModal';
import AIHelpModal from './AIHelpModal';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// 模擬數據 - 在實際應用中應從API獲取
const mockUsageData = [
  { date: '04/02', text: 1200, image: 300, total: 1500 },
  { date: '04/03', text: 800, image: 200, total: 1000 },
  { date: '04/04', text: 1500, image: 400, total: 1900 },
  { date: '04/05', text: 2000, image: 600, total: 2600 },
  { date: '04/06', text: 1800, image: 500, total: 2300 },
  { date: '04/07', text: 1000, image: 300, total: 1300 },
  { date: '04/08', text: 1600, image: 400, total: 2000 }
];

const mockUsageHistory = [
  { 
    id: 1, 
    timestamp: '2025-04-08 14:23:15', 
    serviceType: 'text', 
    description: '商品描述生成', 
    tokenUsed: 150,
    product: '精品咖啡豆'
  },
  { 
    id: 2, 
    timestamp: '2025-04-08 10:45:32', 
    serviceType: 'image', 
    description: '商品圖片生成', 
    tokenUsed: 350,
    product: '手沖咖啡壺'
  },
  { 
    id: 3, 
    timestamp: '2025-04-07 16:12:08', 
    serviceType: 'text', 
    description: '商品描述生成', 
    tokenUsed: 180,
    product: '咖啡過濾器'
  },
  { 
    id: 4, 
    timestamp: '2025-04-07 11:30:45', 
    serviceType: 'image', 
    description: '商品圖片生成', 
    tokenUsed: 320,
    product: '咖啡磨豆機'
  },
  { 
    id: 5, 
    timestamp: '2025-04-06 09:15:22', 
    serviceType: 'text', 
    description: '行銷文案生成', 
    tokenUsed: 200,
    product: '母親節限定組合'
  },
  { 
    id: 6, 
    timestamp: '2025-04-05 13:45:11', 
    serviceType: 'text', 
    description: '商品描述生成', 
    tokenUsed: 160,
    product: '手工拿鐵杯'
  },
  { 
    id: 7, 
    timestamp: '2025-04-05 15:20:33', 
    serviceType: 'image', 
    description: '商品圖片生成', 
    tokenUsed: 380,
    product: '手工拿鐵杯'
  }
];

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const PageHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const PageDescription = styled.p`
  color: #6b7280;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
`;

const CardSubtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardFooter = styled.div`
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;
  cursor: pointer;
`;

const PrimaryButton = styled(Button)`
  background-color: #3b82f6;
  color: white;
  border: none;
  
  &:hover {
    background-color: #2563eb;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: white;
  color: #374151;
  border: 1px solid #d1d5db;
  
  &:hover {
    background-color: #f9fafb;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceCard = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  border-width: 1px;
  display: flex;
  flex-direction: column;
`;

const TextServiceCard = styled(ServiceCard)`
  background-color: #eff6ff;
  border-color: #dbeafe;
`;

const ImageServiceCard = styled(ServiceCard)`
  background-color: #f5f3ff;
  border-color: #ede9fe;
`;

const SavingsServiceCard = styled(ServiceCard)`
  background-color: #ecfccb;
  border-color: #d9f99d;
`;

const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ServiceTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ServiceName = styled.h3`
  font-weight: 500;
`;

const TokenAmount = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0.5rem;
`;

const TokenUnit = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: #6b7280;
`;

const ServiceDescription = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TabButton = styled.button`
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
  background-color: ${props => props.active ? '#dbeafe' : '#f3f4f6'};
  color: ${props => props.active ? '#1e40af' : '#374151'};
  
  &:hover {
    background-color: ${props => props.active ? '#dbeafe' : '#e5e7eb'};
  }
`;

const ChartContainer = styled.div`
  height: 20rem;
`;

const SearchBar = styled.div`
  position: relative;
  flex-grow: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FilterContainer = styled.div`
  width: 12rem;
`;

const SelectContainer = styled.div`
  position: relative;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  appearance: none;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Table = styled.table`
  min-width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const TableHead = styled.thead`
  background-color: #f9fafb;
`;

const TableHeader = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;
  
  &:hover {
    background-color: #f9fafb;
  }
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  white-space: nowrap;
  font-size: 0.875rem;
  color: #374151;
`;

const TableCellWithIcon = styled(TableCell)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const GreenBadge = styled(Badge)`
  background-color: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
`;

const AmberBadge = styled(Badge)`
  background-color: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.625rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  margin-top: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 9999px;
  background-color: ${props => props.danger ? '#ef4444' : '#3b82f6'};
  width: ${props => props.percentage}%;
`;

const Pagination = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PaginationButton = styled.button`
  padding: 0.25rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: ${props => props.active ? '#eff6ff' : 'white'};
  color: ${props => props.active ? '#1e40af' : '#374151'};
  border-color: ${props => props.active ? '#bfdbfe' : '#d1d5db'};
  
  &:hover {
    background-color: ${props => props.active ? '#eff6ff' : '#f9fafb'};
  }
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const AIServiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHistory, setFilteredHistory] = useState(mockUsageHistory);
  const [selectedServiceType, setSelectedServiceType] = useState('all');
  const [timeRange, setTimeRange] = useState('7days');
  const [usageData, setUsageData] = useState(mockUsageData);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  
  // 模擬的Token餘額
  const remainingTokens = 12500;
  const totalTokens = 20000;
  const usedTokens = totalTokens - remainingTokens;
  const usagePercentage = (usedTokens / totalTokens) * 100;
  
  // 處理搜尋和篩選邏輯
  useEffect(() => {
    let filtered = mockUsageHistory;
    
    // 處理搜尋詞
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // 處理服務類型篩選
    if (selectedServiceType !== 'all') {
      filtered = filtered.filter(item => item.serviceType === selectedServiceType);
    }
    
    setFilteredHistory(filtered);
  }, [searchTerm, selectedServiceType]);
  
  // 處理時間範圍變更
  useEffect(() => {
    // 實際應用中應根據選擇的時間範圍從API獲取數據
    // 這裡僅模擬不同的數據長度
    if (timeRange === '30days') {
      // 模擬30天數據
      const thirtyDaysData = [...mockUsageData];
      for (let i = 9; i <= 30; i++) {
        thirtyDaysData.push({
          date: `04/${i < 10 ? '0' + i : i}`,
          text: Math.floor(Math.random() * 2000),
          image: Math.floor(Math.random() * 600),
          get total() { return this.text + this.image; }
        });
      }
      setUsageData(thirtyDaysData);
    } else {
      setUsageData(mockUsageData);
    }
  }, [timeRange]);
  
  // 服務類型對應的圖標
  const serviceTypeIcon = (type) => {
    switch (type) {
      case 'text':
        return <span className="material-icons" style={{ fontSize: '20px', color: '#3b82f6' }}>chat</span>;
      case 'image':
        return <span className="material-icons" style={{ fontSize: '20px', color: '#8b5cf6' }}>image</span>;
      default:
        return <span className="material-icons" style={{ fontSize: '20px', color: '#6b7280' }}>description</span>;
    }
  };
  
  return (
    <Container>
      <PageHeader>
        <PageTitle>AI 服務使用管理</PageTitle>
        <PageDescription>管理您的AI服務使用狀況、查看歷史記錄並購買更多Token</PageDescription>
      </PageHeader>
      
      {/* Token使用概覽卡片 */}
      <Card>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <CardTitle style={{ marginBottom: '1rem' }}>Token餘額</CardTitle>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#3b82f6' }}>
                  {remainingTokens.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  / {totalTokens.toLocaleString()} Tokens
                </div>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                本月已使用 {usedTokens.toLocaleString()} Tokens
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <PrimaryButton onClick={() => setIsPurchaseModalOpen(true)}>
                <span className="material-icons" style={{ fontSize: '1rem' }}>shopping_cart</span>
                購買Token
              </PrimaryButton>
              <SecondaryButton onClick={() => setIsHelpModalOpen(true)}>
                <span className="material-icons" style={{ fontSize: '1rem' }}>info</span>
                使用說明
              </SecondaryButton>
            </div>
          </div>
          
          {/* 進度條 */}
          <ProgressBar>
            <ProgressFill 
              percentage={usagePercentage} 
              danger={usagePercentage > 80}
            />
          </ProgressBar>
          
          {/* 服務類別卡片 */}
          <Grid style={{ marginTop: '1.5rem' }}>
            <TextServiceCard>
              <ServiceHeader>
                <ServiceTitle>
                  <span className="material-icons" style={{ fontSize: '1.25rem', color: '#3b82f6' }}>chat</span>
                  <ServiceName>文字生成</ServiceName>
                </ServiceTitle>
                <span className="material-icons" style={{ fontSize: '1rem', color: '#9ca3af' }}>help</span>
              </ServiceHeader>
              <TokenAmount>7,500 <TokenUnit>Tokens 剩餘</TokenUnit></TokenAmount>
              <ServiceDescription>商品描述、行銷文案等文字生成服務</ServiceDescription>
            </TextServiceCard>
            
            <ImageServiceCard>
              <ServiceHeader>
                <ServiceTitle>
                  <span className="material-icons" style={{ fontSize: '1.25rem', color: '#8b5cf6' }}>image</span>
                  <ServiceName>圖像生成</ServiceName>
                </ServiceTitle>
                <span className="material-icons" style={{ fontSize: '1rem', color: '#9ca3af' }}>help</span>
              </ServiceHeader>
              <TokenAmount>5,000 <TokenUnit>Tokens 剩餘</TokenUnit></TokenAmount>
              <ServiceDescription>商品圖片、行銷圖像等圖像生成服務</ServiceDescription>
            </ImageServiceCard>
            
            <SavingsServiceCard>
              <ServiceHeader>
                <ServiceTitle>
                  <span className="material-icons" style={{ fontSize: '1.25rem', color: '#84cc16' }}>savings</span>
                  <ServiceName>節省估算</ServiceName>
                </ServiceTitle>
                <span className="material-icons" style={{ fontSize: '1rem', color: '#9ca3af' }}>help</span>
              </ServiceHeader>
              <TokenAmount>約 4.2 <TokenUnit>小時節省</TokenUnit></TokenAmount>
              <ServiceDescription>基於本月使用量的時間節省估算</ServiceDescription>
            </SavingsServiceCard>
          </Grid>
        </CardContent>
      </Card>
      
      {/* 使用趨勢圖 */}
      <Card>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <CardTitle>使用趨勢</CardTitle>
            <TabButtons>
              <TabButton 
                active={timeRange === '7days'}
                onClick={() => setTimeRange('7days')}
              >
                最近 7 天
              </TabButton>
              <TabButton 
                active={timeRange === '30days'}
                onClick={() => setTimeRange('30days')}
              >
                最近 30 天
              </TabButton>
            </TabButtons>
          </div>
          
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={usageData}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} Tokens`, '']} />
                <Legend formatter={(value) => value === 'text' ? '文字生成' : '圖像生成'} />
                <Bar dataKey="text" fill="#3b82f6" name="text" />
                <Bar dataKey="image" fill="#8b5cf6" name="image" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* 使用歷史紀錄 */}
      <Card>
        <CardHeader>
          <CardTitle>使用歷史紀錄</CardTitle>
          <CardSubtitle>查看所有 AI 服務使用記錄</CardSubtitle>
        </CardHeader>
        
        <CardContent>
          <FlexRow>
            <SearchBar>
              <span className="material-icons" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1rem' }}>
                search
              </span>
              <SearchInput
                type="text"
                placeholder="搜尋服務描述或商品..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>
            
            <FilterContainer>
              <SelectContainer>
                <span className="material-icons" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1rem' }}>
                  filter_list
                </span>
                <Select
                  value={selectedServiceType}
                  onChange={(e) => setSelectedServiceType(e.target.value)}
                >
                  <option value="all">所有服務</option>
                  <option value="text">文字生成</option>
                  <option value="image">圖像生成</option>
                </Select>
                <div style={{ position: 'absolute', inset: 'Y 0 right-0', display: 'flex', alignItems: 'center', paddingRight: '0.75rem', pointerEvents: 'none' }}>
                  <svg style={{ width: '1rem', height: '1rem', color: '#9ca3af' }} viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </SelectContainer>
            </FilterContainer>
            
            <SecondaryButton>
              <span className="material-icons" style={{ fontSize: '1rem' }}>file_download</span>
              匯出紀錄
            </SecondaryButton>
          </FlexRow>
          
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <Table>
              <TableHead>
                <tr>
                  <TableHeader>時間</TableHeader>
                  <TableHeader>服務類型</TableHeader>
                  <TableHeader>描述</TableHeader>
                  <TableHeader>商品</TableHeader>
                  <TableHeader>使用Token</TableHeader>
                </tr>
              </TableHead>
              <tbody>
                {filteredHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCellWithIcon>
                      <span className="material-icons" style={{ fontSize: '1rem', color: '#9ca3af' }}>access_time</span>
                      {item.timestamp}
                    </TableCellWithIcon>
                    <TableCellWithIcon>
                      {serviceTypeIcon(item.serviceType)}
                      <span style={{ marginLeft: '0.5rem', fontWeight: '500', color: '#111827' }}>
                        {item.serviceType === 'text' ? '文字生成' : '圖像生成'}
                      </span>
                    </TableCellWithIcon>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.product}</TableCell>
                    <TableCell style={{ fontWeight: '500' }}>
                      {item.tokenUsed.toLocaleString()} Tokens
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
            
            {filteredHistory.length === 0 && (
              <div style={{ padding: '2rem 0', textAlign: 'center', color: '#6b7280' }}>
                沒有符合條件的記錄
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            顯示 <span style={{ fontWeight: '500' }}>{filteredHistory.length}</span> 筆記錄 (共 {mockUsageHistory.length} 筆)
          </div>
          
          <Pagination>
            <PaginationButton>
              上一頁
            </PaginationButton>
            <PaginationButton active>
              1
            </PaginationButton>
            <PaginationButton>
              下一頁
            </PaginationButton>
          </Pagination>
        </CardFooter>
      </Card>
      
      {/* 購買Token彈出視窗 */}
      <TokenPurchaseModal 
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      />
      
      {/* AI服務說明彈出視窗 */}
      <AIHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </Container>
  );
};

export default AIServiceManagement;