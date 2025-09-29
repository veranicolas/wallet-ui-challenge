'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Filter } from 'lucide-react';
import { useWalletStore } from '@/stores/walletStore';
import { formatCurrency, getFullName } from '@/utils';
import UserAvatar from '@/components/UserAvatar';
import NavigationBar from '@/components/NavigationBar';
import { TransactionSkeleton } from '@/components/Skeletons';
import dayjs from 'dayjs';

import './styles.css';

const TransfersPage = () => {
  const router = useRouter();
  const { transactions } = useWalletStore();
  const [selectedDate, setSelectedDate] = useState<string>('');

  const filteredTransactions = transactions
    .filter(transaction => {
      if (!selectedDate) return true;
      
      const transactionDate = dayjs(transaction.date).format('YYYY-MM-DD');
      return transactionDate === selectedDate;
    })
    .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());

  const handleBack = () => {
    router.back();
  }

  return (
    <div className="transfers-page">
      {/* Header */}
      <div className="transfers-header">
        <div className="header">
          <div className="header-user">
            <ArrowLeft className="back-button" onClick={handleBack} />
            <h1 className="header-title">Transfers</h1>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="transactions-container">
        <div className="filter-section">
          {/* Date Filter */}
          <div className="filter-controls">
            <Calendar size={20} className="calendar-icon" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-picker"
              placeholder="Select date"
            />
            {selectedDate && (
              <button
                onClick={() => setSelectedDate('')}
                className="clear-filter"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <div className="transactions-list">
          {transactions.length === 0 ? (
            Array.from({ length: 3 }).map((_, i) => <TransactionSkeleton key={i} />)
          ) : filteredTransactions.length === 0 ? (
            <div className="no-transactions">
              <Filter size={48} className="no-transactions-icon" />
              <h3 className="no-transactions-title">No transactions found</h3>
              <p className="no-transactions-text">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-content">
                  <div className="transaction-left">
                    <UserAvatar user={transaction.recipient} size="md" />
                    <div className="transaction-details">
                      <h3 className="transaction-name">
                        {getFullName(transaction.recipient)}
                      </h3>
                      <p className="transaction-date">
                        {dayjs(transaction.date).format('MMM D, YYYY')} • {dayjs(transaction.date).format('h:mm A')}
                      </p>
                    </div>
                  </div>
                  <div className="transaction-right">
                    <p className={`transaction-amount ${transaction.type === 'sent' ? 'sent' : 'received'}`}>
                      {transaction.type === 'sent' ? '-' : '+'}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <NavigationBar />
    </div>
  );
};

export default TransfersPage;