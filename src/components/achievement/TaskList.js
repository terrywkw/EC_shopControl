import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TaskCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-left: 4px solid ${props => props.completed ? '#10b981' : '#3b82f6'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const TaskInfo = styled.div`
  flex: 1;
`;

const TaskTitle = styled.h4`
  margin: 0 0 6px 0;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.completed ? '#6b7280' : 'inherit'};
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

const TaskDescription = styled.p`
  margin: 0 0 12px 0;
  font-size: 0.875rem;
  color: ${props => props.completed ? '#9ca3af' : '#6b7280'};
`;

const TaskProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.75rem;
  color: #6b7280;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background-color: ${props => props.completed ? '#10b981' : '#3b82f6'};
  border-radius: 3px;
  transition: width 0.3s ease;
`;

const ExpReward = styled.div`
  background-color: ${props => props.completed ? '#dcfce7' : '#edf5ff'};
  color: ${props => props.completed ? '#10b981' : '#3b82f6'};
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
`;

const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: white;
  background-color: ${props => props.completed ? '#10b981' : '#3b82f6'};
`;

const TaskList = ({ tasks }) => {
  // 計算進度百分比的輔助函數
  const calculateProgress = (progress, total) => {
    return Math.min(Math.round((progress / total) * 100), 100);
  };
  
  // 格式化進度顯示的輔助函數
  const formatProgress = (progress, total) => {
    // 如果是評分類型的任務 (例如 4.2/5.0)
    if (progress < 5 && total <= 5 && progress % 1 !== 0) {
      return `${progress.toFixed(1)}/${total.toFixed(1)}`;
    }
    // 如果是金額類型的任務
    if (progress >= 1000 || total >= 1000) {
      return `$${(progress/1000).toFixed(1)}k/$${(total/1000).toFixed(1)}k`;
    }
    // 一般情況
    return `${progress}/${total}`;
  };

  return (
    <ListContainer>
      {tasks.map(task => {
        const progressPercentage = calculateProgress(task.progress, task.total);
        const formattedProgress = formatProgress(task.progress, task.total);
        
        return (
          <TaskCard key={task.id} completed={task.completed}>
            <TaskInfo>
              <TaskTitle completed={task.completed}>{task.title}</TaskTitle>
              <TaskDescription completed={task.completed}>{task.description}</TaskDescription>
              
              <TaskProgress>
                <span>{formattedProgress}</span>
                <ProgressBar>
                  <ProgressFill percentage={progressPercentage} completed={task.completed} />
                </ProgressBar>
                <span>{progressPercentage}%</span>
              </TaskProgress>
            </TaskInfo>
            
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <ExpReward completed={task.completed}>
                <span style={{ marginRight: '4px' }}>🏆</span>
                {task.exp} 經驗值
              </ExpReward>
              
              <StatusIcon completed={task.completed}>
                {task.completed ? <span>✓</span> : <span>›</span>}
              </StatusIcon>
            </div>
          </TaskCard>
        );
      })}
    </ListContainer>
  );
};

export default TaskList;