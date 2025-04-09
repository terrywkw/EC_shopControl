import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AIDescriptionGenerator from './AIDescriptionGenerator';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.variant === 'primary' ? '#3b82f6' : 'white')};
  color: ${(props) => (props.variant === 'primary' ? 'white' : '#3b82f6')};
  border: ${(props) => (props.variant === 'primary' ? 'none' : '1px solid #3b82f6')};
  padding: 10px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background-color: ${(props) => (props.variant === 'primary' ? '#2563eb' : '#f0f9ff')};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const DescriptionContainer = styled.div`
  position: relative;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '1fr 1fr 1fr'};
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 24px;
  background-color: #f9fafb;
  height: 200px;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const UploadIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 16V17H17V16" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 7V14" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 10L12 7L15 10" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AddProduct = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    status: 'draft',
    images: []
  });
  
  // 打開 AI 描述生成器對話框
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  
  const handleAIGenerateClick = () => {
    setShowAIGenerator(true);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };
  
  const handleAIGenerated = (generatedDescription) => {
    setProductData({
      ...productData,
      description: generatedDescription
    });
    setShowAIGenerator(false);
  };
  
  const handleCancel = () => {
    navigate('/products');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模擬 API 調用
    setTimeout(() => {
      console.log('商品資料:', productData);
      setIsSubmitting(false);
      alert('商品已成功儲存！');
      navigate('/products');
    }, 1000);
  };
  
  const handleImageUpload = (e) => {
    // 處理圖片上傳邏輯
    alert('圖片上傳功能待實現');
  };
  
  return (
    <Container>
      <PageHeader>
        <PageTitle>新增商品</PageTitle>
      </PageHeader>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <h2 style={{ marginTop: 0, fontSize: '1.25rem', fontWeight: 500 }}>商品基本資訊</h2>
          
          <FormGroup>
            <Label htmlFor="name">商品名稱</Label>
            <Input
              id="name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              placeholder="請輸入商品名稱"
              required
            />
          </FormGroup>
          
          <GridRow>
            <FormGroup>
              <Label htmlFor="category">商品分類</Label>
              <Select
                id="category"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">請選擇分類</option>
                <option value="咖啡豆">咖啡豆</option>
                <option value="咖啡器具">咖啡器具</option>
                <option value="課程">課程</option>
                <option value="禮盒">禮盒</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="price">售價</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                value={productData.price}
                onChange={handleInputChange}
                placeholder="NT$"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="stock">庫存數量</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={productData.stock}
                onChange={handleInputChange}
                placeholder="請輸入庫存數量"
              />
            </FormGroup>
          </GridRow>
          
          <FormGroup>
            <Label htmlFor="status">商品狀態</Label>
            <Select
              id="status"
              name="status"
              value={productData.status}
              onChange={handleInputChange}
            >
              <option value="draft">草稿 - 不公開</option>
              <option value="active">立即上架</option>
              <option value="scheduled">排程上架</option>
            </Select>
          </FormGroup>
        </Card>
        
        <Card style={{ marginTop: '24px' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.25rem', fontWeight: 500 }}>商品圖片</h2>
          
          <ImageUploadArea onClick={handleImageUpload}>
            <UploadIcon />
            <p style={{ marginTop: '16px', color: '#6B7280' }}>點擊或拖曳圖片至此區域上傳</p>
            <p style={{ marginTop: '8px', fontSize: '0.75rem', color: '#9CA3AF' }}>
              建議尺寸: 1200 x 1200px, 檔案大小: 最大 5MB
            </p>
          </ImageUploadArea>
        </Card>
        
        <Card style={{ marginTop: '24px' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.25rem', fontWeight: 500 }}>商品描述</h2>
          
          <DescriptionContainer>
            <FormGroup>
              <Label htmlFor="description">商品描述</Label>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <TextArea
                  id="description"
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  placeholder="請詳細描述您的商品...&#10;&#10;* 特色&#10;* 規格&#10;* 使用方式"
                />
                <Button 
                  type="button" 
                  onClick={handleAIGenerateClick}
                  style={{ flexShrink: 0 }}
                >
                  AI 幫你產生文案
                </Button>
              </div>
            </FormGroup>
          </DescriptionContainer>
        </Card>
        
        <ButtonGroup>
          <Button type="button" onClick={handleCancel}>
            取消
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? '儲存中...' : '儲存商品'}
          </Button>
        </ButtonGroup>
      </form>
      
      {showAIGenerator && (
        <AIDescriptionGenerator
          productInfo={productData}
          onClose={() => setShowAIGenerator(false)}
          onGenerate={handleAIGenerated}
        />
      )}
    </Container>
  );
};

export default AddProduct;