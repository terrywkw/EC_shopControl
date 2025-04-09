import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
  max-height: calc(100vh - 40px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #6b7280;
  
  &:hover {
    color: #1f2937;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
  
  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`;

const SectionTitle = styled.h4`
  font-size: 1rem;
  margin: 32px 0 20px 0;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RadioInput = styled.input`
  margin: 0;
`;

const RadioLabel = styled.label`
  font-size: 0.875rem;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const InputSymbol = styled.span`
  margin-left: 12px;
  font-size: 0.875rem;
`;

const CurrencySymbol = styled.span`
  background-color: #f9fafb;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-right: none;
  border-radius: 4px 0 0 4px;
  font-size: 0.875rem;
  color: #6b7280;
`;

const CurrencyField = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 0 4px 4px 0;
  font-size: 0.875rem;
  
  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`;

// 推廣連結區塊
const LinkSection = styled.div`
  margin-top: 32px;
  border-top: 1px solid #e5e7eb;
  padding-top: 24px;
`;

const LinkBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const LinkLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  width: 80px;
  flex-shrink: 0;
`;

const LinkContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LinkInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: #f9fafb;
  color: #4b5563;
  cursor: text;
  
  &:focus {
    outline: none;
  }
`;

const CopyButton = styled.button`
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    background-color: #f9fafb;
  }
`;

// 佣金資訊區塊
const CommissionInfo = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 32px;
  border-top: 1px solid #e5e7eb;
  padding-top: 24px;
`;

const InfoCard = styled.div`
  flex: 1;
  background-color: #f9fafb;
  border-radius: 6px;
  padding: 20px;
`;

const InfoTitle = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 8px;
`;

const InfoValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.highlight ? '#f59e0b' : '#111827'};
`;

// 底部按鈕區
const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 24px;
  border-top: 1px solid #e5e7eb;
  background-color: white;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#3b82f6' : 'white'};
  color: ${props => props.primary ? 'white' : props.danger ? '#ef4444' : '#6b7280'};
  border: 1px solid ${props => props.primary ? '#3b82f6' : props.danger ? '#ef4444' : '#d1d5db'};
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.primary ? '#2563eb' : props.danger ? '#fee2e2' : '#f9fafb'};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const AffiliateDetailModal = ({ affiliate, onClose, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    surname: '',
    email: '',
    commissionType: 'percentage',
    commissionRate: 0,
    commissionAmount: 0,
    waitingPeriod: 0
  });
  
  useEffect(() => {
    if (affiliate) {
      setFormData({
        id: affiliate.id || '',
        name: affiliate.name || '',
        surname: affiliate.surname || '',
        email: affiliate.email || '',
        commissionType: affiliate.commissionType || 'percentage',
        commissionRate: affiliate.commissionRate || 0,
        commissionAmount: affiliate.commissionAmount || 0,
        waitingPeriod: affiliate.waitingPeriod || 0
      });
    }
  }, [affiliate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCommissionTypeChange = (e) => {
    setFormData({
      ...formData,
      commissionType: e.target.value
    });
  };
  
  const handleSave = () => {
    if (onUpdate) {
      // 驗證必填欄位
      if (!formData.name || !formData.surname) {
        alert('請填寫名稱和姓氏');
        return;
      }
      
      // 驗證佣金設定
      if (formData.commissionType === 'percentage' && (formData.commissionRate <= 0 || formData.commissionRate > 100)) {
        alert('請設定有效的百分比（1-100）');
        return;
      }
      
      if (formData.commissionType === 'fixed' && formData.commissionAmount < 0) {
        alert('請設定有效的金額');
        return;
      }
      
      onUpdate({
        ...affiliate,
        ...formData,
        status: affiliate.status // 保留原始狀態
      });
    }
  };
  
  const handleDelete = () => {
    if (onDelete && window.confirm('確定要刪除此推薦人嗎？此操作無法恢復。')) {
      onDelete(affiliate.id);
    }
  };
  
  const handleCopyLink = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('連結已複製到剪貼簿');
      })
      .catch(err => {
        console.error('複製失敗: ', err);
      });
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{`${affiliate.name || ''} ${affiliate.surname || ''}`}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <FormGroup>
            <Label htmlFor="id">推薦碼</Label>
            <Input 
              id="id"
              value={formData.id}
              readOnly
              disabled
            />
          </FormGroup>
          
          <div style={{ display: 'flex', gap: '24px' }}>
            <FormGroup style={{ flex: 1 }}>
              <Label htmlFor="name">名</Label>
              <Input 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup style={{ flex: 1 }}>
              <Label htmlFor="surname">姓</Label>
              <Input 
                id="surname" 
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
              />
            </FormGroup>
          </div>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <SectionTitle>抽成設定</SectionTitle>
          
          <RadioGroup>
            <RadioOption>
              <RadioInput 
                type="radio" 
                id="percentage" 
                name="commissionType" 
                value="percentage"
                checked={formData.commissionType === 'percentage'}
                onChange={handleCommissionTypeChange}
              />
              <RadioLabel htmlFor="percentage">依百分比發送</RadioLabel>
            </RadioOption>
            
            <RadioOption>
              <RadioInput 
                type="radio" 
                id="fixed" 
                name="commissionType" 
                value="fixed"
                checked={formData.commissionType === 'fixed'}
                onChange={handleCommissionTypeChange}
              />
              <RadioLabel htmlFor="fixed">依固定金額發送</RadioLabel>
            </RadioOption>
          </RadioGroup>
          
          {formData.commissionType === 'percentage' && (
            <InputGroup>
              <Input 
                name="commissionRate"
                type="number"
                value={formData.commissionRate}
                onChange={handleInputChange}
              />
              <InputSymbol>%</InputSymbol>
            </InputGroup>
          )}
          
          {formData.commissionType === 'fixed' && (
            <InputGroup>
              <CurrencySymbol>TWD</CurrencySymbol>
              <CurrencyField 
                name="commissionAmount"
                type="number"
                value={formData.commissionAmount}
                onChange={handleInputChange}
              />
            </InputGroup>
          )}
          
          <FormGroup style={{ marginTop: '16px' }}>
            <Label htmlFor="waitingPeriod">佇金等待期</Label>
            <InputGroup>
              <Input 
                id="waitingPeriod" 
                name="waitingPeriod"
                type="number"
                value={formData.waitingPeriod}
                onChange={handleInputChange}
              />
              <InputSymbol>天</InputSymbol>
            </InputGroup>
          </FormGroup>
          
          <LinkSection>
            <Label>推薦連結</Label>
            <LinkBox>
              <LinkLabel>品牌官網</LinkLabel>
              <LinkContent>
                <LinkInput 
                  readOnly 
                  value={`https://prosumer.easy.co?ref=${formData.id}`} 
                />
                <CopyButton onClick={() => handleCopyLink(`https://prosumer.easy.co?ref=${formData.id}`)}>
                  複製連結
                </CopyButton>
              </LinkContent>
            </LinkBox>
            
            <LinkBox>
              <LinkLabel>LINE</LinkLabel>
              <LinkContent>
                <LinkInput 
                  readOnly 
                  value={`https://easy.co/4zc61xe?ref=${formData.id}`} 
                />
                <CopyButton onClick={() => handleCopyLink(`https://easy.co/4zc61xe?ref=${formData.id}`)}>
                  複製連結
                </CopyButton>
              </LinkContent>
            </LinkBox>
          </LinkSection>
          
          <CommissionInfo>
            <InfoCard>
              <InfoTitle>已確認佣金總額</InfoTitle>
              <InfoValue>0 TWD</InfoValue>
            </InfoCard>
            
            <InfoCard>
              <InfoTitle>未付佣金</InfoTitle>
              <InfoValue highlight>0 TWD</InfoValue>
            </InfoCard>
          </CommissionInfo>
        </ModalBody>
        
        <ModalFooter>
          <Button danger onClick={handleDelete}>
            刪除推薦人
          </Button>
          
          <ActionButtons>
            <Button onClick={onClose}>取消</Button>
            <Button primary onClick={handleSave}>儲存</Button>
          </ActionButtons>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AffiliateDetailModal;