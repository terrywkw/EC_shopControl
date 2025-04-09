import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: ${props => props.color};
  color: white;
`;

const StatTitle = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: auto;
`;

const StatFooter = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 4px;
`;

const AchievementStats = ({ stats }) => {
  return (
    <StatsContainer>
      <StatCard>
        <StatHeader>
          <IconWrapper color="#3b82f6">
            <span>✓</span>
          </IconWrapper>
          <StatTitle>已完成任務</StatTitle>
        </StatHeader>
        <StatValue>{stats.totalCompletedTasks}</StatValue>
        <StatFooter>持續完成任務提升店舖等級</StatFooter>
      </StatCard>
      
      <StatCard>
        <StatHeader>
          <IconWrapper color="#8b5cf6">
            <span>🏆</span>
          </IconWrapper>
          <StatTitle>累計獲得經驗值</StatTitle>
        </StatHeader>
        <StatValue>{stats.totalEarnedExp}</StatValue>
        <StatFooter>共計提升了多個賣家等級</StatFooter>
      </StatCard>
      
      <StatCard>
        <StatHeader>
          <IconWrapper color="#10b981">
            <span>📈</span>
          </IconWrapper>
          <StatTitle>本月獲得經驗值</StatTitle>
        </StatHeader>
        <StatValue>{stats.thisMonthEarnedExp}</StatValue>
        <StatFooter>繼續加油！有效提升店舖等級</StatFooter>
      </StatCard>
      
      <StatCard>
        <StatHeader>
          <IconWrapper color="#f59e0b">
            <span>🎯</span>
          </IconWrapper>
          <StatTitle>距離下一級所需</StatTitle>
        </StatHeader>
        <StatValue>{stats.nextLevelNeeded}</StatValue>
        <StatFooter>完成任務即可提升等級獲得優惠</StatFooter>
      </StatCard>
    </StatsContainer>
  );
};

export default AchievementStats;