'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useCurrentUser, useFrequentContacts, useRandomUsers } from '@/services/hooks';
import { useWalletStore } from '@/stores/walletStore';
import { formatCurrency, getFullName, generateMockTransactions, getUserId } from '@/utils';
import UserAvatar from '@/components/UserAvatar';
import NavigationBar from '@/components/NavigationBar';
import { UserSkeleton, TransactionSkeleton, BalanceSkeleton, ContactSkeleton } from '@/components/Skeletons';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import './styles.css';

export default function Home() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);
  const {
    currentUser,
    balance,
    frequentContacts,
    transactions,
    setCurrentUser,
    setFrequentContacts,
    addTransaction
  } = useWalletStore();

  const { data: fetchedUser, isLoading: userLoading } = useCurrentUser();
  const { data: fetchedContacts, isLoading: contactsLoading } = useFrequentContacts();
  const { data: randomUsers, isLoading: randomUsersLoading } = useRandomUsers(5);

  useEffect(() => {
    if (fetchedUser && !currentUser) {
      setCurrentUser(fetchedUser);
    }
  }, [fetchedUser, currentUser, setCurrentUser]);

  useEffect(() => {
    if (fetchedContacts && fetchedContacts.length > 0) {
      setFrequentContacts(fetchedContacts);
    }
  }, [fetchedContacts, setFrequentContacts]);

  useEffect(() => {
    if (randomUsers && transactions.length === 0) {
      const mockTransactions = generateMockTransactions(randomUsers);
      mockTransactions.forEach(transaction => addTransaction(transaction));
    }
  }, [randomUsers, transactions.length, addTransaction]);

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const handleNavigateUserProfile = () => {
    router.push(`/profile`);
  };

  return (
    <div className="home-page">
      <div className="home-bg-color">
        {/* Header */}
        <div className="header">
          <div className="header-user">
            <div className="user-info" onClick={handleNavigateUserProfile}>
              {userLoading ? (
                <>
                  <UserSkeleton />
                </>
              ) : currentUser ? (
                <>
                  <UserAvatar user={currentUser} size="md" />
                  <div className="user-greeting">
                    <p className="greeting">Good morning</p>
                    <h1 className="user-name">{getFullName(currentUser)}</h1>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {/* Balance Card */}
          <div className="balance-card">
            <div className="balance-header">
              <p className="balance-label">Total Balance</p>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="balance-toggle"
              >
                {showBalance ? <Eye size={24} /> : <EyeOff size={24} />}
              </button>
            </div>
            {userLoading ? (
              <BalanceSkeleton />
            ) : (
              <h2 className="balance-amount">
                {showBalance ? formatCurrency(balance) : '********'}
              </h2>
            )}
          </div>
        </div>

        {/* Frequent Contacts */}
        <div className="contacts-section">
          <div className="section-header">
            <h3 className="section-title">Send Again</h3>
          </div>
          <div className="contacts-list">
            {contactsLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <ContactSkeleton key={i} />
              ))
            ) : (
              frequentContacts.slice(0, 10).map((contact) => (
                <Link
                  key={getUserId(contact)}
                  href={`/send-again?userId=${getUserId(contact)}`}
                  className="contact-item"
                >
                  <UserAvatar user={contact} size="lg" className="mx-auto mb-2" />
                  <p className="contact-name">
                    {contact.name.first}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="transactions-section">
          <div className="section-header">
            <h3 className="section-title">Latest Transactions</h3>
          </div>
          <div className="overflow-y-auto max-h-[50vh]">
            {randomUsersLoading || transactions.length === 0 ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TransactionSkeleton key={i} />
              ))
            ) : (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-content">
                    <div className="transaction-user">
                      <UserAvatar user={transaction.recipient} size="sm" />
                      <div className="transaction-details">
                        <p className="transaction-name">
                          {getFullName(transaction.recipient)}
                        </p>
                        <p className="transaction-date">
                          {transaction.date ? dayjs(transaction.date).format('MMM D, YYYY') : 'Unknown date'} • {transaction.date ? dayjs(transaction.date).format('h:mm A') : 'Unknown time'}
                        </p>
                      </div>
                    </div>
                    <div className="transaction-amount">
                      <p className="amount-value">
                        -{formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <NavigationBar />
    </div>
  );
}
