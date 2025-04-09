import React, { useState } from 'react';
import styled from 'styled-components';
import { taskData } from '../data/achievementTasks';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PageHeader = styled.div`
  margin-bottom: 12px;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const PageDescription = styled.p`
  color: #6b7280;
  margin: 4px 0 0 0;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 180px;
`;

const FilterLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterChip = styled.div`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.875rem;
  background-color: ${props => props.selected ? '#3b82f6' : '#f3f4f6'};
  color: ${props => props.selected ? 'white' : '#4b5563'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.selected ? '#2563eb' : '#e5e7eb'};
  }
`;

const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

const TaskCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  border-top: 4px solid ${props => {
    switch(props.difficulty) {
      case '入門': return '#10b981';
      case '基礎': return '#3b82f6';
      case '進階': return '#8b5cf6';
      case '精英': return '#f59e0b';
      default: return '#3b82f6';
    }
  }};
`;

const TaskHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
`;

const TaskCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TaskCategoryIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
`;

const TaskTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
`;

const TaskContent = styled.div`
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const TaskDescription = styled.p`
  margin: 0 0 16px 0;
  font-size: 0.875rem;
  color: #4b5563;
  flex-grow: 1;
`;

const TaskMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

const MetaTag = styled.div`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  background-color: ${props => props.color || '#f3f4f6'};
  color: ${props => props.textColor || '#4b5563'};
`;

const TaskFooter = styled.div`
  padding: 12px 16px;
  background-color: #f9fafb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f3f4f6;
`;

const ExpReward = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TaskButton = styled.button`
  padding: 6px 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  
  &:hover {
    background-color: #2563eb;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const EmptyStateText = styled.p`
  color: #6b7280;
  margin: 8px 0 0 0;
`;

// 任務類型圖標映射
const categoryIcons = {
  '開店基礎任務': '🏪',
  '日常營運任務': '📆',
  '成長里程碑任務': '🚩',
  '技能養成任務': '🧠',
  '精英挑戰任務': '🏅',
  '雜貨/快消品類任務': '🛒',
  '家電/耐用品類任務': '📱'
};

// 難度對應顏色
const difficultyColors = {
  '入門': { bg: '#dcfce7', text: '#166534' },
  '基礎': { bg: '#dbeafe', text: '#1e40af' },
  '進階': { bg: '#ede9fe', text: '#5b21b6' },
  '精英': { bg: '#fef3c7', text: '#92400e' }
};

// 時間投入對應
const timeCommitmentColors = {
  '低': { bg: '#e0f2fe', text: '#0c4a6e' },
  '中': { bg: '#fef9c3', text: '#854d0e' },
  '高': { bg: '#fee2e2', text: '#991b1b' }
};

const AllTasksPage = () => {
  // 過濾狀態
  const [filters, setFilters] = useState({
    category: '全部',
    difficulty: '全部',
    timeCommitment: '全部'
  });
  
  // 處理過濾器選擇
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  // 應用過濾器
  const filteredTasks = taskData.filter(task => {
    return (filters.category === '全部' || task.category === filters.category) &&
           (filters.difficulty === '全部' || task.difficulty === filters.difficulty) &&
           (filters.timeCommitment === '全部' || task.timeCommitment === filters.timeCommitment);
  });
  
  // 獲取類別列表
  const categories = ['全部', ...new Set(taskData.map(task => task.category))];
  
  // 獲取難度列表
  const difficulties = ['全部', ...new Set(taskData.map(task => task.difficulty))];
  
  // 獲取時間投入列表
  const timeCommitments = ['全部', ...new Set(taskData.map(task => task.timeCommitment))];
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>全部任務</PageTitle>
        <PageDescription>探索所有可用的任務，提升賣家等級並獲取優惠</PageDescription>
      </PageHeader>
      
      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>任務類型</FilterLabel>
          <FilterOptions>
            {categories.map(category => (
              <FilterChip 
                key={category}
                selected={filters.category === category}
                onClick={() => handleFilterChange('category', category)}
              >
                {category === '全部' ? '全部' : (
                  <>
                    {categoryIcons[category] || ''} {category}
                  </>
                )}
              </FilterChip>
            ))}
          </FilterOptions>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>難度等級</FilterLabel>
          <FilterOptions>
            {difficulties.map(difficulty => (
              <FilterChip 
                key={difficulty}
                selected={filters.difficulty === difficulty}
                onClick={() => handleFilterChange('difficulty', difficulty)}
              >
                {difficulty}
              </FilterChip>
            ))}
          </FilterOptions>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>時間投入</FilterLabel>
          <FilterOptions>
            {timeCommitments.map(time => (
              <FilterChip 
                key={time}
                selected={filters.timeCommitment === time}
                onClick={() => handleFilterChange('timeCommitment', time)}
              >
                {time}
              </FilterChip>
            ))}
          </FilterOptions>
        </FilterGroup>
      </FiltersContainer>
      
      {filteredTasks.length > 0 ? (
        <TasksGrid>
          {filteredTasks.map(task => (
            <TaskCard key={task.id} difficulty={task.difficulty}>
              <TaskHeader>
                <TaskCategory>
                  <TaskCategoryIcon>{categoryIcons[task.category] || '🔍'}</TaskCategoryIcon>
                  {task.category}
                </TaskCategory>
                <TaskTitle>{task.title}</TaskTitle>
              </TaskHeader>
              
              <TaskContent>
                <TaskDescription>{task.description}</TaskDescription>
                
                <TaskMeta>
                  <MetaTag 
                    color={difficultyColors[task.difficulty]?.bg} 
                    textColor={difficultyColors[task.difficulty]?.text}
                  >
                    難度: {task.difficulty}
                  </MetaTag>
                  
                  <MetaTag 
                    color={timeCommitmentColors[task.timeCommitment]?.bg}
                    textColor={timeCommitmentColors[task.timeCommitment]?.text}
                  >
                    時間: {task.timeCommitment}
                  </MetaTag>
                  
                  {task.frequency && (
                    <MetaTag>頻率: {task.frequency}</MetaTag>
                  )}
                </TaskMeta>
              </TaskContent>
              
              <TaskFooter>
                <ExpReward>
                  <span>🏆</span> {task.expReward} 經驗值
                </ExpReward>
                
                <TaskButton>開始任務</TaskButton>
              </TaskFooter>
            </TaskCard>
          ))}
        </TasksGrid>
      ) : (
        <EmptyState>
          <span style={{ fontSize: '3rem' }}>🔍</span>
          <EmptyStateText>沒有符合篩選條件的任務</EmptyStateText>
        </EmptyState>
      )}
    </PageContainer>
  );
};

export default AllTasksPage;