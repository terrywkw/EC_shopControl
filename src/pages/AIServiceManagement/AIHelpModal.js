import React from 'react';
import styled from 'styled-components';

// Styled components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  overflow-y: auto;
`;

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 1rem;
  text-align: center;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(107, 114, 128, 0.75);
  transition: opacity 0.3s ease;
`;

const ModalContent = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 48rem;
  margin: 2rem 0;
  overflow: hidden;
  text-align: left;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(0);
  transition: all 0.3s ease;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.25rem;
  border-radius: 9999px;
  transition: background-color 0.3s ease;
  
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

const ModalSubtitle = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  max-height: 70vh;
  overflow-y: auto;
`;

const SectionContainer = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Card = styled.div`
  border: 1px solid ${props => props.borderColor || '#e5e7eb'};
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: ${props => props.bgColor || 'white'};
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const CardTitle = styled.h4`
  font-weight: 500;
`;

const CardText = styled.p`
  font-size: 0.875rem;
  color: #374151;
`;

const TableContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const TableHeader = styled.div`
  background-color: #f9fafb;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const TableTitle = styled.h4`
  font-weight: 500;
`;

const Table = styled.table`
  min-width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const TableHead = styled.thead`
  background-color: #f9fafb;
`;

const TableHeadCell = styled.th`
  padding: 0.5rem 0.75rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableBody = styled.tbody`
  background-color: white;
  
  & > tr {
    border-bottom: 1px solid #e5e7eb;
  }
`;

const TableCell = styled.td`
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  white-space: nowrap;
`;

const TipContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background-color: #dbeafe;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TipContent = styled.div``;

const TipTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
`;

const TipText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const FAQCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const FAQTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const FAQText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ContactSection = styled.div`
  background-color: #eff6ff;
  border: 1px solid #dbeafe;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const ContactContent = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ContactTitle = styled.h4`
  font-weight: 500;
  color: #1e40af;
  margin-bottom: 0.25rem;
`;

const ContactText = styled.p`
  font-size: 0.875rem;
  color: #1e3a8a;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #1d4ed8;
  }
`;

const AIHelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <ModalOverlay aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <ModalContainer>
        {/* 背景遮罩 */}
        <ModalBackdrop onClick={onClose} />
        
        {/* 模態對話框 */}
        <ModalContent>
          {/* 關閉按鈕 */}
          <CloseButton onClick={onClose}>
            <span className="material-icons" style={{ fontSize: '20px', color: '#6b7280' }}>close</span>
          </CloseButton>
          
          <ModalHeader>
            <ModalTitle>AI 服務使用說明</ModalTitle>
            <ModalSubtitle>了解如何有效利用 AI 服務提升您的商品管理效率</ModalSubtitle>
          </ModalHeader>
          
          <ModalBody>
            <div>
              {/* 服務總覽 */}
              <SectionContainer>
                <SectionTitle>服務總覽</SectionTitle>
                <CardGrid>
                  <Card bgColor="#eff6ff" borderColor="#dbeafe">
                    <CardHeader>
                      <span className="material-icons" style={{ fontSize: '20px', color: '#2563eb' }}>chat</span>
                      <CardTitle>文字生成</CardTitle>
                    </CardHeader>
                    <CardText>
                      自動生成商品描述、行銷文案等文字內容，節省寫作時間。
                    </CardText>
                  </Card>
                  
                  <Card bgColor="#f5f3ff" borderColor="#e9d5ff">
                    <CardHeader>
                      <span className="material-icons" style={{ fontSize: '20px', color: '#7c3aed' }}>image</span>
                      <CardTitle>圖像生成</CardTitle>
                    </CardHeader>
                    <CardText>
                      根據文字描述生成商品展示圖、行銷素材等圖像內容。
                    </CardText>
                  </Card>
                </CardGrid>
              </SectionContainer>
              
              {/* Token消耗指南 */}
              <SectionContainer>
                <SectionTitle>Token 消耗指南</SectionTitle>
                <div>
                  <TableContainer>
                    <TableHeader>
                      <TableTitle>文字生成 Token 消耗</TableTitle>
                    </TableHeader>
                    <div style={{ padding: '1rem' }}>
                      <Table>
                        <TableHead>
                          <tr>
                            <TableHeadCell>生成類型</TableHeadCell>
                            <TableHeadCell>平均消耗</TableHeadCell>
                            <TableHeadCell>適用情境</TableHeadCell>
                          </tr>
                        </TableHead>
                        <TableBody>
                          <tr>
                            <TableCell>短商品描述</TableCell>
                            <TableCell>150-200</TableCell>
                            <TableCell>簡短的商品特點描述</TableCell>
                          </tr>
                          <tr>
                            <TableCell>詳細商品描述</TableCell>
                            <TableCell>250-350</TableCell>
                            <TableCell>包含細節、規格的完整描述</TableCell>
                          </tr>
                          <tr>
                            <TableCell>行銷文案</TableCell>
                            <TableCell>200-300</TableCell>
                            <TableCell>促銷活動、節日行銷等文案</TableCell>
                          </tr>
                        </TableBody>
                      </Table>
                    </div>
                  </TableContainer>
                  
                  <TableContainer>
                    <TableHeader>
                      <TableTitle>圖像生成 Token 消耗</TableTitle>
                    </TableHeader>
                    <div style={{ padding: '1rem' }}>
                      <Table>
                        <TableHead>
                          <tr>
                            <TableHeadCell>圖像類型</TableHeadCell>
                            <TableHeadCell>平均消耗</TableHeadCell>
                            <TableHeadCell>建議用途</TableHeadCell>
                          </tr>
                        </TableHead>
                        <TableBody>
                          <tr>
                            <TableCell>標準品質</TableCell>
                            <TableCell>300-500</TableCell>
                            <TableCell>社群貼文、一般展示</TableCell>
                          </tr>
                          <tr>
                            <TableCell>高品質</TableCell>
                            <TableCell>600-800</TableCell>
                            <TableCell>商品主圖、重要宣傳</TableCell>
                          </tr>
                        </TableBody>
                      </Table>
                    </div>
                  </TableContainer>
                </div>
              </SectionContainer>
              
              {/* 使用技巧 */}
              <SectionContainer>
                <SectionTitle>使用技巧與最佳實踐</SectionTitle>
                
                <div>
                  <TipContainer>
                    <IconContainer>
                      <span className="material-icons" style={{ fontSize: '16px', color: '#2563eb' }}>check</span>
                    </IconContainer>
                    <TipContent>
                      <TipTitle>提供明確、詳細的指示</TipTitle>
                      <TipText>
                        越具體的指示會產生越符合預期的結果，包含風格、用途等細節。
                      </TipText>
                    </TipContent>
                  </TipContainer>
                  
                  <TipContainer>
                    <IconContainer>
                      <span className="material-icons" style={{ fontSize: '16px', color: '#2563eb' }}>check</span>
                    </IconContainer>
                    <TipContent>
                      <TipTitle>按批次處理類似任務</TipTitle>
                      <TipText>
                        將類似商品的描述生成或圖像生成集中處理，提高效率並確保一致性。
                      </TipText>
                    </TipContent>
                  </TipContainer>
                  
                  <TipContainer>
                    <IconContainer>
                      <span className="material-icons" style={{ fontSize: '16px', color: '#2563eb' }}>check</span>
                    </IconContainer>
                    <TipContent>
                      <TipTitle>生成後適當調整</TipTitle>
                      <TipText>
                        AI 生成的內容通常需要人工審閱和微調，確保品質並添加個人風格。
                      </TipText>
                    </TipContent>
                  </TipContainer>
                </div>
              </SectionContainer>
              
              {/* 常見問題 */}
              <SectionContainer>
                <SectionTitle>常見問題</SectionTitle>
                
                <div>
                  <FAQCard>
                    <FAQTitle>購買的 Token 有使用期限嗎？</FAQTitle>
                    <FAQText>
                      購買的 Token 自購買日起一年內有效。系統會優先使用即將到期的 Token。
                    </FAQText>
                  </FAQCard>
                  
                  <FAQCard>
                    <FAQTitle>生成的內容有版權限制嗎？</FAQTitle>
                    <FAQText>
                      通過我們的 AI 服務生成的內容歸您所有，您可以自由使用於商業用途。但請確保輸入內容不侵犯他人智慧財產權。
                    </FAQText>
                  </FAQCard>
                </div>
              </SectionContainer>
              
              {/* 聯絡支援 */}
              <SectionContainer>
                <ContactSection>
                  <ContactContent>
                    <span className="material-icons" style={{ fontSize: '20px', color: '#3b82f6', marginTop: '2px', flexShrink: 0 }}>warning</span>
                    <div>
                      <ContactTitle>需要更多協助？</ContactTitle>
                      <ContactText>
                        如有任何使用問題或建議，請聯繫我們的客服團隊：<br />
                        客服信箱：support@hishops.com.tw<br />
                        客服專線：(02) 2345-6789 (週一至週五 9:00-18:00)
                      </ContactText>
                    </div>
                  </ContactContent>
                </ContactSection>
              </SectionContainer>
            </div>
          </ModalBody>
          
          <ModalFooter>
            <Button onClick={onClose}>
              了解了
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AIHelpModal;