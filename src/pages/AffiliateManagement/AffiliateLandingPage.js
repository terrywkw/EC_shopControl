import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
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

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 20px;
`;

const CardHeading = styled.h2`
  font-size: 1.25rem;
  margin: 0 0 16px 0;
  color: #1f2937;
`;

const CardContent = styled.div`
  color: #4b5563;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin: 20px 0;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: #dbeafe;
  color: #3b82f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const FeatureTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
  color: #1f2937;
`;

const FeatureDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
`;

const CTA = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled(Link)`
  background-color: ${props => props.primary ? '#3b82f6' : 'white'};
  color: ${props => props.primary ? 'white' : '#3b82f6'};
  border: 1px solid ${props => props.primary ? '#3b82f6' : '#d1d5db'};
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  
  &:hover {
    background-color: ${props => props.primary ? '#2563eb' : '#f0f9ff'};
  }
`;

const StepCard = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  background-color: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 16px;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 8px 0;
  color: #1f2937;
`;

const StepDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
`;

const AffiliateLandingPage = () => {
  return (
    <Container>
      <PageHeader>
        <PageTitle>推薦分潤導購</PageTitle>
        <PageDescription>透過推薦分潤機制，讓更多人幫您推廣商品，提升銷售</PageDescription>
      </PageHeader>
      
      <Card>
        <CardHeading>什麼是推薦分潤？</CardHeading>
        <CardContent>
          推薦分潤是一種讓推薦人（會員、KOL、部落客等）透過分享您的商品，賺取佣金的機制。當買家通過推薦人的專屬連結購買商品時，系統會自動記錄並依設定比例分潤給推薦人，有助於擴大商品曝光度和提高銷售量。
        </CardContent>
      </Card>
      
      <FeatureGrid>
        <FeatureCard>
          <FeatureIcon>💰</FeatureIcon>
          <FeatureTitle>靈活分潤設定</FeatureTitle>
          <FeatureDescription>
            自訂每位推薦人的分潤方式與比例，可依銷售量、分潤比例或固定金額計算佣金。
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>🔗</FeatureIcon>
          <FeatureTitle>專屬追蹤連結</FeatureTitle>
          <FeatureDescription>
            自動為每位推薦人生成獨特的專屬連結，準確追蹤銷售來源和計算分潤。
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>📊</FeatureIcon>
          <FeatureTitle>銷售轉換統計</FeatureTitle>
          <FeatureDescription>
            提供推薦人銷售數據分析，掌握每位推薦人的貢獻度與成效。
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>⚙️</FeatureIcon>
          <FeatureTitle>多層級推薦管理</FeatureTitle>
          <FeatureDescription>
            設置不同等級的推薦人，依據業績表現給予不同的分潤比例與獎勵。
          </FeatureDescription>
        </FeatureCard>
      </FeatureGrid>
      
      <Card>
        <CardHeading>快速開始使用推薦分潤</CardHeading>
        
        <StepCard>
          <StepNumber>1</StepNumber>
          <StepContent>
            <StepTitle>基本設定</StepTitle>
            <StepDescription>
              前往「分潤導購設定」頁面，設定全域分潤規則，包括預設佣金比例、最低金額、結算週期等。
            </StepDescription>
          </StepContent>
        </StepCard>
        
        <StepCard>
          <StepNumber>2</StepNumber>
          <StepContent>
            <StepTitle>新增推薦人</StepTitle>
            <StepDescription>
              在「推薦人管理」頁面新增推薦人，填寫基本資料並設定專屬的分潤規則。
            </StepDescription>
          </StepContent>
        </StepCard>
        
        <StepCard>
          <StepNumber>3</StepNumber>
          <StepContent>
            <StepTitle>分享推薦連結</StepTitle>
            <StepDescription>
              將專屬推薦連結分享給推薦人，讓他們開始推廣您的商品並賺取佣金。
            </StepDescription>
          </StepContent>
        </StepCard>
        
        <StepCard>
          <StepNumber>4</StepNumber>
          <StepContent>
            <StepTitle>追蹤與管理</StepTitle>
            <StepDescription>
              監控推薦成效，審核佣金申請，並根據表現調整分潤策略。
            </StepDescription>
          </StepContent>
        </StepCard>
        
        <CTA>
          <Button to="/affiliate" primary>
            前往分潤設定
          </Button>
          <Button to="/affiliates">
            管理推薦人
          </Button>
        </CTA>
      </Card>
    </Container>
  );
};

export default AffiliateLandingPage;