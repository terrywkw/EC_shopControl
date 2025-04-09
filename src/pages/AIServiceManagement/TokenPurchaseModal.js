import React, { useState } from 'react';
import styled from 'styled-components';

// Token方案數據
const tokenPlans = [
  {
    id: 1,
    name: '基本方案',
    tokens: 5000,
    price: 500,
    description: '適合小規模使用，商品描述生成約25件',
    isMostPopular: false
  },
  {
    id: 2,
    name: '標準方案',
    tokens: 15000,
    price: 1200,
    description: '最受歡迎的方案，商品描述生成約75件',
    isMostPopular: true
  },
  {
    id: 3,
    name: '專業方案',
    tokens: 50000,
    price: 3500,
    description: '適合大型商店，商品描述生成約250件',
    isMostPopular: false
  },
  {
    id: 4,
    name: '企業方案',
    tokens: 200000,
    price: 12000,
    description: '企業級需求，包含優先客服支援',
    isMostPopular: false
  }
];

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  text-align: center;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
`;

const ModalDialog = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 36rem;
  margin: 2rem 0;
  overflow: hidden;
  text-align: left;
  vertical-align: middle;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  transition: transform 0.3s;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.25rem;
  border-radius: 9999px;
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
`;

const ModalDescription = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: ${props => props.center ? 'center' : 'space-between'};
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
`;

const PlanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PlanCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid ${props => props.selected ? '#3b82f6' : '#e5e7eb'};
  border-radius: 0.5rem;
  background-color: ${props => props.selected ? '#eff6ff' : 'white'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${props => props.selected ? '#3b82f6' : '#bfdbfe'};
  }
`;

const PlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const PlanInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlanTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PlanName = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
`;

const PlanPrice = styled.div`
  text-align: right;
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
`;

const TokenCount = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const PlanDescription = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const PlanSelection = styled.div`
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #dbeafe;
  font-size: 0.875rem;
  color: #1e40af;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PopularBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: #dbeafe;
  color: #1e40af;
`;

const InfoBox = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  display: flex;
  gap: 0.75rem;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h4`
  font-weight: 500;
  color: #1e40af;
  margin-bottom: 0.25rem;
`;

const InfoText = styled.p`
  font-size: 0.875rem;
  color: #1e40af;
  margin-top: 0.25rem;
`;

const InfoList = styled.ul`
  margin-top: 0.5rem;
  margin-left: 1.25rem;
  list-style-type: disc;
  font-size: 0.875rem;
  color: #1e40af;
  
  & > li {
    margin-top: 0.25rem;
  }
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
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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

const OrderSummary = styled.div`
  margin-bottom: 1.5rem;
`;

const SummaryTitle = styled.h3`
  font-weight: 500;
  margin-bottom: 0.75rem;
`;

const SummaryCard = styled.div`
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PaymentOptions = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid ${props => props.selected ? '#3b82f6' : '#e5e7eb'};
  border-radius: 0.5rem;
  background-color: ${props => props.selected ? '#eff6ff' : 'white'};
  cursor: pointer;
`;

const RadioCircle = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 2px solid #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioDot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: #3b82f6;
`;

const FormGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const BankInfo = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
`;

const BankInfoTitle = styled.h4`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const BankInfoRow = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  
  & > span {
    font-weight: 500;
  }
`;

const BankInfoNote = styled.p`
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #dc2626;
`;

const SuccessIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 9999px;
  background-color: #ecfdf5;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const SuccessDescription = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const OrderDetailsCard = styled.div`
  background-color: #f9fafb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: left;
`;

const OrderDetailsTitle = styled.h3`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const OrderDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  font-size: 0.875rem;
`;

const OrderLabel = styled.div`
  color: #6b7280;
`;

const OrderValue = styled.div`
  text-align: right;
`;

const TokenPurchaseModal = ({ isOpen, onClose }) => {
  const [selectedPlanId, setSelectedPlanId] = useState(2); // 預設選擇標準方案
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (!isOpen) return null;
  
  const selectedPlan = tokenPlans.find(plan => plan.id === selectedPlanId);
  
  const handlePlanSelect = (planId) => {
    setSelectedPlanId(planId);
  };
  
  const handleNextStep = () => {
    setCurrentStep(2);
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(1);
  };
  
  const handleSubmit = () => {
    setIsProcessing(true);
    
    // 模擬付款處理
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(3); // 進入完成步驟
    }, 2000);
  };
  
  const handleClose = () => {
    if (currentStep === 3) {
      // 重置狀態
      setCurrentStep(1);
      setSelectedPlanId(2);
      setPaymentMethod('credit_card');
    }
    onClose();
  };
  
  return (
    <ModalOverlay>
      <Backdrop onClick={handleClose} />
      
      <ModalDialog>
        <CloseButton onClick={handleClose}>
          <span className="material-icons" style={{ fontSize: '1.25rem', color: '#6b7280' }}>close</span>
        </CloseButton>
        
        {/* 步驟 1: 選擇方案 */}
        {currentStep === 1 && (
          <>
            <ModalHeader>
              <ModalTitle>購買AI服務Token</ModalTitle>
              <ModalDescription>選擇適合您需求的Token方案</ModalDescription>
            </ModalHeader>
            
            <ModalBody>
              <PlanList>
                {tokenPlans.map((plan) => (
                  <PlanCard 
                    key={plan.id}
                    selected={selectedPlanId === plan.id}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    <PlanHeader>
                      <PlanInfo>
                        <PlanTitle>
                          <PlanName>{plan.name}</PlanName>
                          {plan.isMostPopular && (
                            <PopularBadge>最受歡迎</PopularBadge>
                          )}
                        </PlanTitle>
                        <PlanDescription>{plan.description}</PlanDescription>
                      </PlanInfo>
                      
                      <PlanPrice>
                        <Price>NT$ {plan.price}</Price>
                        <TokenCount>{plan.tokens.toLocaleString()} Tokens</TokenCount>
                      </PlanPrice>
                    </PlanHeader>
                    
                    {selectedPlanId === plan.id && (
                      <PlanSelection>
                        <span className="material-icons" style={{ fontSize: '1rem' }}>check_circle</span>
                        <span>您已選擇此方案</span>
                      </PlanSelection>
                    )}
                  </PlanCard>
                ))}
              </PlanList>
              
              <InfoBox>
                <span className="material-icons" style={{ fontSize: '1.25rem', color: '#3b82f6', marginTop: '0.125rem' }}>info</span>
                <InfoContent>
                  <InfoTitle>Token使用說明</InfoTitle>
                  <InfoText>Token是使用AI服務的計算單位，不同AI服務消耗的Token數量各不相同：</InfoText>
                  <InfoList>
                    <li>商品描述生成：約150-200 Tokens/件</li>
                    <li>行銷文案生成：約200-300 Tokens/篇</li>
                    <li>商品圖片生成：約300-500 Tokens/張</li>
                  </InfoList>
                </InfoContent>
              </InfoBox>
            </ModalBody>
            
            <ModalFooter>
              <PrimaryButton onClick={handleNextStep}>
                下一步：付款
              </PrimaryButton>
            </ModalFooter>
          </>
        )}
        
        {/* 步驟 2: 付款 */}
        {currentStep === 2 && (
          <>
            <ModalHeader>
              <ModalTitle>付款資訊</ModalTitle>
              <ModalDescription>請選擇付款方式並填寫資訊</ModalDescription>
            </ModalHeader>
            
            <ModalBody>
              <OrderSummary>
                <SummaryTitle>已選擇方案</SummaryTitle>
                <SummaryCard>
                  <SummaryRow>
                    <span style={{ fontWeight: '500' }}>{selectedPlan.name}</span>
                    <span style={{ fontWeight: '700' }}>NT$ {selectedPlan.price}</span>
                  </SummaryRow>
                  <SummaryRow style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    <span>{selectedPlan.tokens.toLocaleString()} Tokens</span>
                  </SummaryRow>
                </SummaryCard>
              </OrderSummary>
              
              <SummaryTitle>選擇付款方式</SummaryTitle>
              
              <PaymentOptions>
                <PaymentOption 
                  selected={paymentMethod === 'credit_card'}
                  onClick={() => setPaymentMethod('credit_card')}
                >
                  <RadioCircle>
                    {paymentMethod === 'credit_card' && <RadioDot />}
                  </RadioCircle>
                  <span className="material-icons" style={{ fontSize: '1.25rem', color: '#6b7280' }}>credit_card</span>
                  <span style={{ fontWeight: '500' }}>信用卡付款</span>
                </PaymentOption>
                
                <PaymentOption 
                  selected={paymentMethod === 'transfer'}
                  onClick={() => setPaymentMethod('transfer')}
                >
                  <RadioCircle>
                    {paymentMethod === 'transfer' && <RadioDot />}
                  </RadioCircle>
                  <span className="material-icons" style={{ fontSize: '1.25rem', color: '#6b7280' }}>account_balance</span>
                  <span style={{ fontWeight: '500' }}>銀行轉帳</span>
                </PaymentOption>
              </PaymentOptions>
              
              {paymentMethod === 'credit_card' && (
                <FormGroup>
                  <InputGroup>
                    <InputLabel htmlFor="card-number">卡號</InputLabel>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                    />
                  </InputGroup>
                  
                  <InputGrid>
                    <InputGroup>
                      <InputLabel htmlFor="expiry-date">到期日</InputLabel>
                      <Input
                        id="expiry-date"
                        placeholder="MM/YY"
                      />
                    </InputGroup>
                    
                    <InputGroup>
                      <InputLabel htmlFor="cvv">安全碼</InputLabel>
                      <Input
                        id="cvv"
                        placeholder="123"
                      />
                    </InputGroup>
                  </InputGrid>
                  
                  <InputGroup>
                    <InputLabel htmlFor="cardholder-name">持卡人姓名</InputLabel>
                    <Input
                      id="cardholder-name"
                      placeholder="王小明"
                    />
                  </InputGroup>
                </FormGroup>
              )}
              
              {paymentMethod === 'transfer' && (
                <BankInfo>
                  <BankInfoTitle>銀行轉帳資訊</BankInfoTitle>
                  <BankInfoRow><span>銀行：</span>國泰世華銀行</BankInfoRow>
                  <BankInfoRow><span>帳戶：</span>888-88888-888888</BankInfoRow>
                  <BankInfoRow><span>戶名：</span>好嗨!商 電子商務有限公司</BankInfoRow>
                  <BankInfoNote>請於轉帳後保留收據，系統將於確認款項後立即為您開通服務</BankInfoNote>
                </BankInfo>
              )}
            </ModalBody>
            
            <ModalFooter>
              <SecondaryButton onClick={handlePreviousStep}>
                上一步
              </SecondaryButton>
              
              <PrimaryButton
                onClick={handleSubmit}
                disabled={isProcessing}
              >
                {isProcessing && (
                  <svg style={{ animation: 'spin 1s linear infinite', marginRight: '0.5rem', height: '1rem', width: '1rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: '0.25' }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{ opacity: '0.75' }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isProcessing ? '處理中...' : '確認付款'}
              </PrimaryButton>
            </ModalFooter>
          </>
        )}
        
        {/* 步驟 3: 完成 */}
        {currentStep === 3 && (
          <>
            <ModalBody>
              <SuccessIcon>
                <span className="material-icons" style={{ fontSize: '2rem', color: '#059669' }}>check_circle</span>
              </SuccessIcon>
              
              <SuccessTitle>購買成功！</SuccessTitle>
              <SuccessDescription>您已成功購買 {selectedPlan.tokens.toLocaleString()} Tokens</SuccessDescription>
              
              <OrderDetailsCard>
                <OrderDetailsTitle>訂單詳情</OrderDetailsTitle>
                <OrderDetailsGrid>
                  <OrderLabel>方案名稱：</OrderLabel>
                  <OrderValue>{selectedPlan.name}</OrderValue>
                  
                  <OrderLabel>購買數量：</OrderLabel>
                  <OrderValue>{selectedPlan.tokens.toLocaleString()} Tokens</OrderValue>
                  
                  <OrderLabel>支付金額：</OrderLabel>
                  <OrderValue>NT$ {selectedPlan.price}</OrderValue>
                  
                  <OrderLabel>訂單編號：</OrderLabel>
                  <OrderValue>TK-{Math.floor(Math.random() * 10000000)}</OrderValue>
                  
                  <OrderLabel>購買時間：</OrderLabel>
                  <OrderValue>{new Date().toLocaleString()}</OrderValue>
                </OrderDetailsGrid>
              </OrderDetailsCard>
              
              <InfoBox>
                <span className="material-icons" style={{ fontSize: '1.25rem', color: '#3b82f6', marginTop: '0.125rem' }}>info</span>
                <InfoContent>
                  <InfoText>您的Token已即時生效，可立即使用所有AI服務功能。如有任何問題，請隨時聯繫我們的客服團隊。</InfoText>
                </InfoContent>
              </InfoBox>
            </ModalBody>
            
            <ModalFooter center>
              <PrimaryButton onClick={handleClose}>
                完成
              </PrimaryButton>
            </ModalFooter>
          </>
        )}
      </ModalDialog>
    </ModalOverlay>
  );
};

export default TokenPurchaseModal;