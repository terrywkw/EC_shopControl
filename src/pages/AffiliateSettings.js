import React, { useState } from 'react';
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
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
`;

const CardTitle = styled.h2`
  font-size: 1.125rem;
  margin: 0;
  display: flex;
  align-items: center;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardFooter = styled.div`
  padding: 15px 20px;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const Description = styled.p`
  margin-top: 4px;
  font-size: 0.75rem;
  color: #6b7280;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f9ff;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const SwitchText = styled.div`
  display: flex;
  flex-direction: column;
`;

const SwitchTitle = styled.span`
  font-weight: 500;
`;

const SwitchDescription = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
`;

const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
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
  background-color: ${(props) => (props.checked ? '#3b82f6' : '#cbd5e1')};
  transition: 0.4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${(props) => (props.checked ? 'translateX(26px)' : 'translateX(0)')};
  }
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

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
`;

const Tab = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? '500' : 'normal')};
  color: ${(props) => (props.active ? '#3b82f6' : '#4b5563')};
  border-bottom: ${(props) => (props.active ? '2px solid #3b82f6' : '2px solid transparent')};
  
  &:hover {
    color: #3b82f6;
  }
`;

const InfoBox = styled.div`
  background-color: #fffbeb;
  border-left: 4px solid #f59e0b;
  padding: 12px 16px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 20px;
  border-radius: 0 4px 4px 0;
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #92400e;
  flex: 1;
`;

const AffiliateSettings = () => {
  const [activeTab, setActiveTab] = useState('global');
  const [isEnabled, setIsEnabled] = useState(true);
  const [defaultRate, setDefaultRate] = useState(5);
  const [minRate, setMinRate] = useState(1);
  const [newCustomerBonus, setNewCustomerBonus] = useState(3);
  
  const handleSaveSettings = () => {
    alert('設定已儲存');
  };

  return (
    <Container>
      <PageHeader>
        <PageTitle>分潤導購設定</PageTitle>
        <PageDescription>管理您的分潤導購機制，讓更多會員幫您推廣商品</PageDescription>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>分潤導購設定</CardTitle>
        </CardHeader>

        <Tabs>
          <Tab active={activeTab === 'global'} onClick={() => setActiveTab('global')}>
            全域設定
          </Tab>
          <Tab active={activeTab === 'products'} onClick={() => setActiveTab('products')}>
            商品設定
          </Tab>
        </Tabs>

        <CardContent>
          {activeTab === 'global' && (
            <>
              <SwitchContainer>
                <SwitchText>
                  <SwitchTitle>開啟分潤導購功能</SwitchTitle>
                  <SwitchDescription>啟用後，會員可分享您的商品並獲得佣金</SwitchDescription>
                </SwitchText>
                <Switch>
                  <SwitchInput
                    type="checkbox"
                    checked={isEnabled}
                    onChange={() => setIsEnabled(!isEnabled)}
                  />
                  <SwitchSlider checked={isEnabled} />
                </Switch>
              </SwitchContainer>

              <FormGroup>
                <Label htmlFor="defaultRate">預設分潤比例 (%)</Label>
                <Input
                  id="defaultRate"
                  type="number"
                  min={minRate}
                  max={50}
                  value={defaultRate}
                  onChange={(e) => setDefaultRate(Number(e.target.value))}
                />
                <Description>建議設定 5-15% 可有效激勵導購</Description>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="minRate">最低分潤比例 (%)</Label>
                <Input
                  id="minRate"
                  type="number"
                  min={1}
                  max={10}
                  value={minRate}
                  onChange={(e) => setMinRate(Number(e.target.value))}
                />
                <Description>平台允許最低設定為 1%</Description>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="newCustomerBonus">新客戶加成 (%)</Label>
                <Input
                  id="newCustomerBonus"
                  type="number"
                  min={0}
                  max={20}
                  value={newCustomerBonus}
                  onChange={(e) => setNewCustomerBonus(Number(e.target.value))}
                />
                <Description>導購引入新客戶的額外獎勵</Description>
              </FormGroup>
            </>
          )}

          {activeTab === 'products' && (
            <div>
              <p>在此設定各商品的個別分潤比例</p>
              <p>功能開發中...</p>
            </div>
          )}
          
          <InfoBox>
            <InfoText>
              提高分潤比例有助於增加導購意願，但也會影響您的利潤。建議結合產品利潤率來設定合理的分潤比例。
            </InfoText>
          </InfoBox>
        </CardContent>

        <CardFooter>
          <Button variant="primary" onClick={handleSaveSettings}>
            儲存設定
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default AffiliateSettings;