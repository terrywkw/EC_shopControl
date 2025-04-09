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
`;

const CardContent = styled.div`
  padding: 20px;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
  min-height: 80px;
  resize: vertical;
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
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #2563eb;
  }
`;

const CardFooter = styled.div`
  padding: 15px 20px;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
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

const MerchantSettings = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [storeOpen, setStoreOpen] = useState(true);
  const [storeInfo, setStoreInfo] = useState({
    name: '好咖啡小舖',
    description: '提供精選咖啡豆、咖啡器具和咖啡相關課程的專業咖啡店',
    email: 'coffee@example.com',
    phone: '0912-345-678',
    address: '台北市中正區咖啡路123號'
  });

  const handleInfoChange = (field, value) => {
    setStoreInfo({
      ...storeInfo,
      [field]: value
    });
  };

  const handleSaveSettings = () => {
    alert('設定已儲存');
  };

  return (
    <Container>
      <PageHeader>
        <PageTitle>店舖設定</PageTitle>
        <PageDescription>管理您的店舖基本資訊和設定</PageDescription>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>店舖基本設定</CardTitle>
        </CardHeader>

        <Tabs>
          <Tab active={activeTab === 'basic'} onClick={() => setActiveTab('basic')}>
            基本資訊
          </Tab>
          <Tab active={activeTab === 'appearance'} onClick={() => setActiveTab('appearance')}>
            外觀設定
          </Tab>
          <Tab active={activeTab === 'seo'} onClick={() => setActiveTab('seo')}>
            SEO設定
          </Tab>
        </Tabs>

        <CardContent>
          {activeTab === 'basic' && (
            <>
              <SwitchContainer>
                <SwitchText>
                  <SwitchTitle>店舖營業狀態</SwitchTitle>
                  <SwitchDescription>控制您的店舖是否開放瀏覽與購買</SwitchDescription>
                </SwitchText>
                <Switch>
                  <SwitchInput
                    type="checkbox"
                    checked={storeOpen}
                    onChange={() => setStoreOpen(!storeOpen)}
                  />
                  <SwitchSlider checked={storeOpen} />
                </Switch>
              </SwitchContainer>

              <FormGroup>
                <Label htmlFor="storeName">店舖名稱</Label>
                <Input
                  id="storeName"
                  value={storeInfo.name}
                  onChange={(e) => handleInfoChange('name', e.target.value)}
                />
                <Description>此名稱將顯示在店舖頁面和收據上</Description>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="storeDescription">店舖簡介</Label>
                <TextArea
                  id="storeDescription"
                  value={storeInfo.description}
                  onChange={(e) => handleInfoChange('description', e.target.value)}
                />
                <Description>簡單描述您的店舖特色和商品</Description>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="storeEmail">聯絡電子郵件</Label>
                <Input
                  id="storeEmail"
                  type="email"
                  value={storeInfo.email}
                  onChange={(e) => handleInfoChange('email', e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="storePhone">聯絡電話</Label>
                <Input
                  id="storePhone"
                  value={storeInfo.phone}
                  onChange={(e) => handleInfoChange('phone', e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="storeAddress">店舖地址</Label>
                <Input
                  id="storeAddress"
                  value={storeInfo.address}
                  onChange={(e) => handleInfoChange('address', e.target.value)}
                />
              </FormGroup>
            </>
          )}

          {activeTab === 'appearance' && (
            <div>
              <p>在此設定店舖外觀，包括佈景主題、顏色、Logo等</p>
              <p>功能開發中...</p>
            </div>
          )}

          {activeTab === 'seo' && (
            <div>
              <p>在此設定SEO相關設定，提升店舖在搜尋引擎的曝光度</p>
              <p>功能開發中...</p>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button onClick={handleSaveSettings}>儲存設定</Button>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default MerchantSettings;