import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconWrapper = styled.div`
  color: #3b82f6;
`;

const LevelDisplay = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
`;

const CurrentLevel = styled.div`
  text-align: center;
  flex: 0 0 140px;
`;

const LevelBadge = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #edf5ff;
  color: #3b82f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  border: 2px solid #3b82f6;
`;

const LevelNumber = styled.div`
  font-size: 2.5rem;
  line-height: 1;
  font-weight: 700;
`;

const LevelLabel = styled.div`
  font-size: 0.75rem;
`;

const LevelName = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
`;

const ProgressSection = styled.div`
  flex: 1;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const ProgressText = styled.div`
  font-size: 0.875rem;
  color: #4b5563;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background-color: #3b82f6;
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const BenefitSection = styled.div`
  background-color: #f3f4f6;
  border-radius: 6px;
  padding: 16px;
  margin-top: 24px;
`;

const BenefitTitle = styled.div`
  font-weight: 500;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BenefitsList = styled.div`
  display: flex;
  gap: 24px;
`;

const BenefitItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const BenefitValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.highlight ? '#3b82f6' : 'inherit'};
`;

const BenefitLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const LevelProgressCard = ({ merchantLevel }) => {
  const { currentLevel, currentExp, nextLevelExp, discountPercentage, nextLevelDiscount } = merchantLevel;
  
  // 計算進度百分比
  const progress = Math.round((currentExp / nextLevelExp) * 100);
  
  // 定義等級區間
  const getLevelCategory = (level) => {
    if (level <= 5) return '入門成長期';
    if (level <= 10) return '基礎發展期';
    if (level <= 15) return '進階提升期';
    return '精英挑戰期';
  };
  
  const expNeeded = nextLevelExp - currentExp;

  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>
          <IconWrapper>
            <span>🏆</span>
          </IconWrapper>
          賣家等級與成就
        </CardTitle>
      </CardHeader>
      
      <LevelDisplay>
        <CurrentLevel>
          <LevelBadge>
            <LevelNumber>{currentLevel}</LevelNumber>
            <LevelLabel>等級</LevelLabel>
          </LevelBadge>
          <LevelName>{getLevelCategory(currentLevel)}</LevelName>
        </CurrentLevel>
        
        <ProgressSection>
          <ProgressInfo>
            <ProgressText>等級 {currentLevel} → {currentLevel + 1}</ProgressText>
            <ProgressText>{currentExp} / {nextLevelExp} 經驗值</ProgressText>
          </ProgressInfo>
          <ProgressBar>
            <ProgressFill percentage={progress} />
          </ProgressBar>
          <ProgressText style={{ marginTop: '6px' }}>
            再獲得 {expNeeded} 經驗值可升至 {currentLevel + 1} 級
          </ProgressText>
        </ProgressSection>
      </LevelDisplay>
      
      <BenefitSection>
        <BenefitTitle>
          <IconWrapper>
            <span>⭐️</span>
          </IconWrapper>
          年費抵扣優惠
        </BenefitTitle>
        <BenefitsList>
          <BenefitItem>
            <BenefitValue>{discountPercentage}%</BenefitValue>
            <BenefitLabel>目前等級優惠</BenefitLabel>
          </BenefitItem>
          <BenefitItem>
            <BenefitValue highlight>{nextLevelDiscount}%</BenefitValue>
            <BenefitLabel>下一等級優惠</BenefitLabel>
          </BenefitItem>
          <BenefitItem>
            <BenefitValue>18%</BenefitValue>
            <BenefitLabel>最高可達優惠</BenefitLabel>
          </BenefitItem>
        </BenefitsList>
      </BenefitSection>
    </CardContainer>
  );
};

export default LevelProgressCard;