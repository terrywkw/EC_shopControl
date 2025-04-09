import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AffiliateList from '../../components/affiliate/AffiliateList';
import AffiliateEmptyState from '../../components/affiliate/AffiliateEmptyState';
import AddAffiliateModal from '../../components/affiliate/AddAffiliateModal';
import AffiliateDetailModal from '../../components/affiliate/AffiliateDetailModal';

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

const PageDescription = styled.p`
  color: #6b7280;
  margin: 4px 0 0 0;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#3b82f6' : 'white'};
  color: ${props => props.primary ? 'white' : '#3b82f6'};
  border: 1px solid ${props => props.primary ? '#3b82f6' : '#d1d5db'};
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: ${props => props.primary ? '#2563eb' : '#f0f9ff'};
  }
`;

const AffiliateListPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);
  
  // 示範用的推薦人資料
  const [affiliates, setAffiliates] = useState([
    {
      id: '78913951',
      name: 'A5310',
      surname: '林寶琴',
      type: '推薦人',
      commission: 0,
      status: '啟用'
    },
    {
      id: '66053166',
      name: 'A5309',
      surname: '林寶琴',
      type: '推薦人',
      commission: 0,
      status: '啟用'
    },
    {
      id: '13577213',
      name: 'A5308',
      surname: '林寶琴',
      type: '推薦人',
      commission: 0,
      status: '啟用'
    },
    {
      id: '53717038',
      name: 'A5307',
      surname: '林寶琴',
      type: '推薦人',
      commission: 0,
      status: '啟用'
    },
    {
      id: '57081080',
      name: 'A5306',
      surname: '林寶琴',
      type: '推薦人',
      commission: 0,
      status: '啟用'
    }
  ]);

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleAddAffiliate = (newAffiliate) => {
    setAffiliates([...affiliates, {
      ...newAffiliate,
      id: Math.floor(Math.random() * 90000000) + 10000000,
      type: '推薦人',
      commission: 0,
      status: '啟用'
    }]);
    setShowAddModal(false);
  };

  const handleOpenDetailModal = (affiliate) => {
    // 確保有效的推薦人數據
    if (affiliate && affiliate.id) {
      setSelectedAffiliate({...affiliate});
      setShowDetailModal(true);
    }
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedAffiliate(null);
  };

  const handleUpdateAffiliate = (updatedAffiliate) => {
    // 確保有效的更新數據
    if (updatedAffiliate && updatedAffiliate.id) {
      setAffiliates(affiliates.map(a => 
        a.id === updatedAffiliate.id ? {...a, ...updatedAffiliate} : a
      ));
      setShowDetailModal(false);
      setSelectedAffiliate(null);
    }
  };

  const handleToggleStatus = (id) => {
    setAffiliates(affiliates.map(a => 
      a.id === id 
        ? { ...a, status: a.status === '啟用' ? '停用' : '啟用' } 
        : a
    ));
  };

  const handleDeleteAffiliate = (id) => {
    if (id) {
      setAffiliates(affiliates.filter(a => a.id !== id));
      setShowDetailModal(false);
      setSelectedAffiliate(null);
    }
  };

  return (
    <Container>
      <PageHeader>
        <div>
          <PageTitle>推薦人管理</PageTitle>
          <PageDescription>管理與追蹤所有推薦人</PageDescription>
        </div>
        <Button primary onClick={handleOpenAddModal}>
          + 新增推薦人
        </Button>
      </PageHeader>

      {affiliates.length > 0 ? (
        <AffiliateList 
          affiliates={affiliates} 
          onAffiliateClick={handleOpenDetailModal}
          onToggleStatus={handleToggleStatus}
        />
      ) : (
        <AffiliateEmptyState onAddClick={handleOpenAddModal} />
      )}

      {showAddModal && (
        <AddAffiliateModal 
          onClose={handleCloseAddModal}
          onAdd={handleAddAffiliate}
        />
      )}

      {showDetailModal && selectedAffiliate && (
        <AffiliateDetailModal 
          affiliate={selectedAffiliate}
          onClose={handleCloseDetailModal}
          onUpdate={handleUpdateAffiliate}
          onDelete={handleDeleteAffiliate}
        />
      )}
    </Container>
  );
};

export default AffiliateListPage;