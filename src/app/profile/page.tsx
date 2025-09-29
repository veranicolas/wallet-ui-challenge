'use client';
import { ArrowLeft } from 'lucide-react';
import { useWalletStore } from '@/stores/walletStore';
import { getFullName } from '@/utils';
import UserAvatar from '@/components/UserAvatar';

import './styles.css';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();
  const { currentUser } = useWalletStore();

  const userDetails = [
    { field: "City", value: currentUser?.location?.city },
    { field: "State", value: currentUser?.location?.state },
    { field: "Street", value: currentUser ? `${currentUser.location?.street?.number} ${currentUser.location?.street?.name}` : '' },
    { field: "Email", value: currentUser?.email },
    { field: "Phone", value: currentUser?.phone },
  ]

  if (!currentUser) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-avatar"></div>
          <div className="loading-text"></div>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    router.back();
  }

  return (
    <div className="profile-page">
      <div className="profile-bg-color">
        {/* Header */}
        <div className="header">
          <div className="header-user">
            <ArrowLeft className="back-button" onClick={handleBack} />
            <h1 className="header-title">Profile</h1>
          </div>
        </div>
        {/* Profile Content */}
        <div className="profile-content">
          <div className="user-info-section">
            <UserAvatar user={currentUser} size="xl" className="user-avatar" />
            <h2 className="user-name">
              {getFullName(currentUser)}
            </h2>
          </div>
          <div className="user-details-section">
            {userDetails.map((detail) => (
              detail.value && (
                <div key={detail.field} className="detail-row">
                  <span className="detail-label">{detail.field}</span>
                  <span className="detail-value">{detail.value}</span>
                </div>
              )
            ))}
          </div>
          <div className="user-id-section">
            <p className="id-label">ID</p>
            <span className="id-value">{currentUser.id.value}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;