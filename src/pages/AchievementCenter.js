import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LevelProgressCard from '../components/achievement/LevelProgressCard';
import TaskList from '../components/achievement/TaskList';
import AchievementStats from '../components/achievement/AchievementStats';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const PageDescription = styled.p`
  color: #6b7280;
  margin: 4px 0 0 0;
`;

const PageActions = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled(Link)`
  display: flex;
  align-items: center;
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.875rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2563eb;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 16px;
`;

const Tab = styled.button`
  padding: 12px 16px;
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#3b82f6' : 'transparent'};
  color: ${props => props.active ? '#3b82f6' : '#6b7280'};
  font-weight: ${props => props.active ? '600' : '400'};
  
  &:hover {
    color: #3b82f6;
  }
`;

const AchievementCenter = () => {
  const [activeTab, setActiveTab] = useState('daily');
  
  // 商家當前等級資訊
  const merchantLevel = {
    currentLevel: 6,
    currentExp: 1350,
    nextLevelExp: 1750,
    discountPercentage: 6,
    nextLevelDiscount: 7
  };
  
  // 不同類型的任務
  const taskCategories = {
    daily: [
      { id: 1, title: '回覆顧客評價', description: '回覆10則評價', exp: 20, completed: false, progress: 4, total: 10 },
      { id: 2, title: '商品資訊更新', description: '更新10件商品資訊', exp: 30, completed: false, progress: 7, total: 10 },
      { id: 3, title: '庫存管理', description: '更新並確認所有商品庫存', exp: 25, completed: true, progress: 1, total: 1 },
      { id: 4, title: '社群互動', description: '在賣家論壇參與討論或回覆問題', exp: 15, completed: false, progress: 0, total: 1 },
    ],
    growth: [
      { id: 5, title: '完成首次促銷活動', description: '設定至少一項折扣或優惠活動', exp: 100, completed: false, progress: 0, total: 1 },
      { id: 6, title: '增加商品數量', description: '新增5件商品到您的商店', exp: 75, completed: false, progress: 2, total: 5 },
      { id: 7, title: '優化商品描述', description: '使用AI助手優化10件商品描述', exp: 50, completed: false, progress: 3, total: 10 },
    ],
    milestone: [
      { id: 8, title: '首月營運達標', description: '完成首月銷售目標NT$50,000', exp: 200, completed: false, progress: 38000, total: 50000 },
      { id: 9, title: '高評分達標', description: '店舖平均評分達4.5星以上', exp: 300, completed: false, progress: 4.2, total: 4.5 },
      { id: 10, title: '連續營運', description: '連續營運3個月', exp: 300, completed: false, progress: 2, total: 3 },
    ],
    expert: [
      { id: 11, title: 'SEO優化實踐', description: '完成10件商品的SEO優化', exp: 150, completed: false, progress: 2, total: 10 },
      { id: 12, title: '數據追蹤設定', description: '設定Google Analytics或FB像素追蹤', exp: 250, completed: false, progress: 0, total: 1 },
      { id: 13, title: '會員計畫設計', description: '設計並實施會員忠誠度計畫', exp: 400, completed: false, progress: 0, total: 1 },
    ]
  };

  // 統計資料
  const stats = {
    totalCompletedTasks: 42,
    totalEarnedExp: 3450,
    thisMonthEarnedExp: 480,
    nextLevelNeeded: 400,
  };

  return (
    <PageContainer>
      <PageHeader>
        <HeaderContent>
          <PageTitle>成就與任務中心</PageTitle>
          <PageDescription>完成任務，提升店舖等級，獲取年費折扣</PageDescription>
        </HeaderContent>
        
        <PageActions>
          <ActionButton to="/achievements/all-tasks">
            <span style={{ marginRight: '6px' }}>🔍</span>
            查看全部任務
          </ActionButton>
        </PageActions>
      </PageHeader>

      <LevelProgressCard merchantLevel={merchantLevel} />
      
      <AchievementStats stats={stats} />
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'daily'} 
          onClick={() => setActiveTab('daily')}
        >
          日常任務
        </Tab>
        <Tab 
          active={activeTab === 'growth'} 
          onClick={() => setActiveTab('growth')}
        >
          成長任務
        </Tab>
        <Tab 
          active={activeTab === 'milestone'} 
          onClick={() => setActiveTab('milestone')}
        >
          里程碑任務
        </Tab>
        <Tab 
          active={activeTab === 'expert'} 
          onClick={() => setActiveTab('expert')}
        >
          專業技能任務
        </Tab>
      </TabsContainer>
      
      <TaskList tasks={taskCategories[activeTab]} />
    </PageContainer>
  );
};

export default AchievementCenter;