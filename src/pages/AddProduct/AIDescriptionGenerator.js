import React, { useState } from 'react';
import styled from 'styled-components';

// 導入 AI 服務
import aiService from '../../services/ai';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  flex: 1;
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
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
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
  min-height: 100px;
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

const ChatContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  max-height: 300px;
  overflow-y: auto;
`;

const MessageBubble = styled.div`
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  max-width: 80%;
  
  background-color: ${props => props.type === 'user' ? '#f3f4f6' : '#e9f5ff'};
  color: ${props => props.type === 'user' ? '#374151' : '#1e40af'};
  align-self: ${props => props.type === 'user' ? 'flex-end' : 'flex-start'};
  
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const LoadingIndicator = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  margin-right: 8px;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Tag = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background-color: #e5e7eb;
  color: #374151;
  border-radius: 16px;
  font-size: 0.75rem;
  margin-right: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: #d1d5db;
  }
  
  &.selected {
    background-color: #dbeafe;
    color: #1e40af;
    border: 1px solid #bfdbfe;
  }
`;

const TagsContainer = styled.div`
  margin: 12px 0;
  display: flex;
  flex-wrap: wrap;
`;

const DescriptionPreview = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 16px;
  background-color: #f9fafb;
  margin-top: 16px;
  white-space: pre-line;
`;

const AIDescriptionGenerator = ({ productInfo, onClose, onGenerate }) => {
  const [prompts, setPrompts] = useState({
    category: productInfo.category || '',
    name: productInfo.name || '',
    keywords: '',
    tone: 'professional',
    customPrompt: '',
  });
  
  const [messages, setMessages] = useState([
    { type: 'ai', content: '您好！我是您的 AI 文案助手，可以協助您生成有吸引力的商品描述。請告訴我您的商品特點，我會為您生成專業的商品描述文案。' }
  ]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  
  const toneOptions = [
    { value: 'professional', label: '專業正式', description: '適合正式的商業情境' },
    { value: 'casual', label: '輕鬆友善', description: '使用日常用語，親切自然' },
    { value: 'enthusiastic', label: '熱情活潑', description: '充滿活力，激發購買慾望' },
    { value: 'elegant', label: '優雅精緻', description: '適合高檔商品與服務' }
  ];
  
  const keywordSuggestions = {
    '咖啡豆': ['濃郁', '香醇', '風味', '烘焙', '產地', '有機', '手工', '精選', '平衡'],
    '咖啡器具': ['耐用', '精準', '設計', '便攜', '簡易', '專業', '創新', '品質', '工藝'],
    '課程': ['專業', '實用', '學習', '技巧', '知識', '體驗', '互動', '證書', '小班制'],
    '禮盒': ['精美', '驚喜', '豪華', '典雅', '獨特', '收藏', '限量', '紀念', '心意']
  };
  
  const getSuggestedKeywords = () => {
    return keywordSuggestions[prompts.category] || [];
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrompts({
      ...prompts,
      [name]: value
    });
  };
  
  const handleKeywordClick = (keyword) => {
    // 檢查是否已經包含這個關鍵字
    const currentKeywords = prompts.keywords.split(',').map(k => k.trim()).filter(k => k);
    
    if (currentKeywords.includes(keyword)) {
      // 如果已包含，則移除
      const newKeywords = currentKeywords.filter(k => k !== keyword).join(', ');
      setPrompts({
        ...prompts,
        keywords: newKeywords
      });
    } else {
      // 如果未包含，則添加
      const newKeywords = [...currentKeywords, keyword].join(', ');
      setPrompts({
        ...prompts,
        keywords: newKeywords
      });
    }
  };
  
  const handleAddMessage = () => {
    if (!prompts.customPrompt.trim()) return;
    
    setMessages([
      ...messages,
      { type: 'user', content: prompts.customPrompt }
    ]);
    
    setPrompts({
      ...prompts,
      customPrompt: ''
    });
    
    // 模擬 AI 回應
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { type: 'ai', content: '感謝您的提供更多信息！我會將這些納入商品描述中。您可以點擊「生成文案」看看效果，或繼續告訴我更多關於商品的特點。' }
      ]);
    }, 1000);
  };
  
  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      // 添加生成提示到對話中
      setMessages(prev => [
        ...prev,
        { type: 'user', content: '請幫我生成商品描述文案' },
        { type: 'ai', content: '正在為您生成文案，請稍候...' }
      ]);
      
      // 調用 AI 生成函數
      const description = await aiService.generateProductDescription(prompts);
      
      // 更新對話並顯示生成結果
      setMessages(prev => [
        ...prev.slice(0, -1), // 移除「正在生成」的訊息
        { type: 'ai', content: '已為您生成以下商品描述：' }
      ]);
      
      setGeneratedDescription(description);
      setCurrentStep(2);
    } catch (error) {
      console.error('生成描述時出錯:', error);
      setMessages(prev => [
        ...prev,
        { type: 'ai', content: '生成過程中遇到錯誤，請稍後再試。' }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleUseDescription = () => {
    onGenerate(generatedDescription);
  };
  
  const handleReset = () => {
    setGeneratedDescription('');
    setCurrentStep(1);
    
    // 清空對話，只保留初始訊息
    setMessages([
      { type: 'ai', content: '您好！我是您的 AI 文案助手，可以協助您生成有吸引力的商品描述。請告訴我您的商品特點，我會為您生成專業的商品描述文案。' }
    ]);
  };
  
  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Modal>
        <ModalHeader>
          <ModalTitle>AI 文案生成器</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          {currentStep === 1 && (
            <>
              <FormGroup>
                <Label htmlFor="name">商品名稱</Label>
                <Input
                  id="name"
                  name="name"
                  value={prompts.name}
                  onChange={handleInputChange}
                  placeholder="請輸入商品名稱"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="category">商品分類</Label>
                <Select
                  id="category"
                  name="category"
                  value={prompts.category}
                  onChange={handleInputChange}
                >
                  <option value="">請選擇分類</option>
                  <option value="咖啡豆">咖啡豆</option>
                  <option value="咖啡器具">咖啡器具</option>
                  <option value="課程">課程</option>
                  <option value="禮盒">禮盒</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="tone">文案風格</Label>
                <Select
                  id="tone"
                  name="tone"
                  value={prompts.tone}
                  onChange={handleInputChange}
                >
                  {toneOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} - {option.description}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>建議關鍵字</Label>
                <TagsContainer>
                  {getSuggestedKeywords().map(keyword => (
                    <Tag 
                      key={keyword}
                      className={prompts.keywords.includes(keyword) ? 'selected' : ''}
                      onClick={() => handleKeywordClick(keyword)}
                    >
                      {keyword}
                    </Tag>
                  ))}
                </TagsContainer>
              </FormGroup>
              
              <ChatContainer>
                <ChatMessages>
                  {messages.map((message, index) => (
                    <MessageBubble key={index} type={message.type}>
                      {message.content}
                    </MessageBubble>
                  ))}
                </ChatMessages>
              </ChatContainer>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <TextArea
                  placeholder="輸入更多商品特點或您想要強調的賣點..."
                  value={prompts.customPrompt}
                  name="customPrompt"
                  onChange={handleInputChange}
                />
                <Button 
                  type="button" 
                  onClick={handleAddMessage}
                  style={{ flexShrink: 0, alignSelf: 'flex-end' }}
                >
                  發送
                </Button>
              </div>
            </>
          )}
          
          {currentStep === 2 && (
            <>
              <h4 style={{ marginTop: 0 }}>生成的商品描述</h4>
              <DescriptionPreview>
                {generatedDescription}
              </DescriptionPreview>
              
              <div style={{ marginTop: '24px' }}>
                <Button 
                  type="button" 
                  onClick={handleReset}
                  style={{ marginRight: '12px' }}
                >
                  重新生成
                </Button>
              </div>
            </>
          )}
        </ModalBody>
        
        <ModalFooter>
          <Button onClick={onClose}>
            取消
          </Button>
          
          {currentStep === 1 ? (
            <Button 
              variant="primary" 
              onClick={handleGenerate}
              disabled={isGenerating || !prompts.name || !prompts.category}
            >
              {isGenerating && <LoadingIndicator />}
              {isGenerating ? '生成中...' : '生成文案'}
            </Button>
          ) : (
            <Button 
              variant="primary" 
              onClick={handleUseDescription}
            >
              使用此描述
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </Overlay>
  );
};

export default AIDescriptionGenerator;