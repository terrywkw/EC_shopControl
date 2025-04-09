import React, { useState } from 'react';
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
  max-width: 600px;
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
  display: flex;
  align-items: center;
  gap: 10px;
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

const CommissionSection = styled.div`
  margin-top: 32px;
  border-top: 1px solid #e5e7eb;
  padding-top: 24px;
`;

const CommissionTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 20px;
  font-weight: 500;
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

const PercentageInput = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const PercentageSymbol = styled.span`
  margin-left: 12px;
  font-size: 0.875rem;
`;

const CurrencyInput = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
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

const WaitingPeriodInput = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const WaitingUnit = styled.span`
  margin-left: 12px;
  font-size: 0.875rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 24px;
  border-top: 1px solid #e5e7eb;
  gap: 12px;
  background-color: white;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#3b82f6' : 'white'};
  color: ${props => props.primary ? 'white' : '#6b7280'};
  border: 1px solid ${props => props.primary ? '#3b82f6' : '#d1d5db'};
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.primary ? '#2563eb' : '#f9fafb'};
  }
`;

const AddAffiliateModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    commissionType: 'percentage',
    commissionRate: '',
    commissionAmount: '',
    waitingPeriod: ''
  });
  
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
  
  const handleSubmit = () => {
    // 表單驗證
    if (!formData.name || !formData.surname || !formData.email) {
      alert('請填寫所有必填欄位');
      return;
    }
    
    // 檢查佣金設定
    if (formData.commissionType === 'percentage' && !formData.commissionRate) {
      alert('請設定抽成百分比');
      return;
    }
    
    if (formData.commissionType === 'fixed' && !formData.commissionAmount) {
      alert('請設定固定金額');
      return;
    }
    
    // 建立新的推薦人資料
    const newAffiliate = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      commissionType: formData.commissionType,
      commissionRate: formData.commissionRate || 0,
      commissionAmount: formData.commissionAmount || 0,
      waitingPeriod: formData.waitingPeriod || 0
    };
    
    // 呼叫新增函數
    onAdd(newAffiliate);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>新增推薦人</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <FormGroup>
            <Label htmlFor="name">名</Label>
            <Input 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="請輸入名稱"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="surname">姓</Label>
            <Input 
              id="surname" 
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              placeholder="請輸入姓氏"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="請輸入Email"
            />
          </FormGroup>
          
          <CommissionSection>
            <CommissionTitle>抽成設定</CommissionTitle>
            
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
              <PercentageInput>
                <Input 
                  name="commissionRate"
                  type="number"
                  value={formData.commissionRate}
                  onChange={handleInputChange}
                  placeholder="請輸入百分比"
                />
                <PercentageSymbol>%</PercentageSymbol>
              </PercentageInput>
            )}
            
            {formData.commissionType === 'fixed' && (
              <CurrencyInput>
                <CurrencySymbol>TWD</CurrencySymbol>
                <CurrencyField 
                  name="commissionAmount"
                  type="number"
                  value={formData.commissionAmount}
                  onChange={handleInputChange}
                  placeholder="請輸入金額"
                />
              </CurrencyInput>
            )}
            
            <FormGroup style={{ marginTop: '24px' }}>
              <Label htmlFor="waitingPeriod">佇金等待期</Label>
              <WaitingPeriodInput>
                <Input 
                  id="waitingPeriod" 
                  name="waitingPeriod"
                  type="number"
                  value={formData.waitingPeriod}
                  onChange={handleInputChange}
                  placeholder="0"
                />
                <WaitingUnit>天</WaitingUnit>
              </WaitingPeriodInput>
            </FormGroup>
          </CommissionSection>
        </ModalBody>
        
        <ModalFooter>
          <Button onClick={onClose}>取消</Button>
          <Button primary onClick={handleSubmit}>儲存</Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AddAffiliateModal;