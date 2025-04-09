import React from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PageHeader = styled.div`
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const PageDescription = styled.p`
  color: #6b7280;
  margin: 4px 0 0 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const StatChange = styled.div`
  font-size: 0.75rem;
  color: ${(props) => (props.positive ? '#16a34a' : '#dc2626')};
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const ChartCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: 350px;
`;

const ChartTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 16px;
`;

const Dashboard = () => {
  // 示範銷售數據
  const salesData = [
    { name: '1月', sales: 3500 },
    { name: '2月', sales: 4200 },
    { name: '3月', sales: 3800 },
    { name: '4月', sales: 5000 },
    { name: '5月', sales: 4800 },
    { name: '6月', sales: 5500 },
    { name: '7月', sales: 6000 },
  ];

  return (
    <DashboardContainer>
      <PageHeader>
        <PageTitle>歡迎回來，王小明</PageTitle>
        <PageDescription>這是您的店舖概覽</PageDescription>
      </PageHeader>

      <StatsGrid>
        <StatCard>
          <StatTitle>今日銷售額</StatTitle>
          <StatValue>NT$ 15,280</StatValue>
          <StatChange positive={true}>▲ 12% 較昨日</StatChange>
        </StatCard>
        <StatCard>
          <StatTitle>本月訂單數</StatTitle>
          <StatValue>127</StatValue>
          <StatChange positive={true}>▲ 8% 較上月</StatChange>
        </StatCard>
        <StatCard>
          <StatTitle>商品總數</StatTitle>
          <StatValue>48</StatValue>
          <StatChange positive={false}>▼ 2 較上週</StatChange>
        </StatCard>
        <StatCard>
          <StatTitle>商店訪問量</StatTitle>
          <StatValue>1,254</StatValue>
          <StatChange positive={true}>▲ 23% 較上週</StatChange>
        </StatCard>
      </StatsGrid>

      <ChartCard>
        <ChartTitle>銷售趨勢</ChartTitle>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={salesData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`NT$ ${value}`, '銷售額']} />
            <Bar dataKey="sales" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </DashboardContainer>
  );
};

export default Dashboard;