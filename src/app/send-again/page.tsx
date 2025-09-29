'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, LoaderCircle, Send } from 'lucide-react';
import { useWalletStore } from '@/stores/walletStore';
import { formatCurrency, getFullName, getUserId } from '@/utils';
import UserAvatar from '@/components/UserAvatar';
import { User } from '@/types';

import './styles.css';

const SendAgainPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  
  const { frequentContacts, balance, updateBalance, addTransaction } = useWalletStore();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userId && frequentContacts.length > 0) {
      const user = frequentContacts.find(contact => getUserId(contact) === userId);
      setSelectedUser(user || null);
    }
  }, [userId, frequentContacts]);

  const handleSendMoney = async () => {
    if (!selectedUser || !amount || parseFloat(amount) <= 0) return;
    
    const transferAmount = parseFloat(amount);
    // this scenario should not happen but added it just in case
    if (transferAmount > balance) {
      alert('Insufficient balance');
      return;
    }

    setIsLoading(true);
    
    const transaction = {
      id: `${crypto.randomUUID()}`,
      reference: `#${Math.floor(100000 + Math.random() * 900000)}`,
      recipientId: getUserId(selectedUser),
      recipient: selectedUser,
      amount: transferAmount,
      date: new Date(),
      type: 'sent' as const,
      notes: note,
    };

    updateBalance(transferAmount);
    addTransaction(transaction);

    // In this mock, we simulate a network request for creating a transaction using a timeout
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/send-again/success?transactionId=${transaction.id}`);
    }, 1500);
  };

  if (!selectedUser) {
    return (
      <div className="loader">
        <LoaderCircle className="loader-icon" />
      </div>
    )
  }

  return (
    <div className="send-again-page">
      {/* Header */}
      <div className="send-again-header">
        <div className="header-content">
          <button 
            onClick={() => router.back()}
          >
            <ArrowLeft size={20} className="arrow-icon" />
          </button>
          <h1>Send Money</h1>
        </div>
      </div>
      {/* Balance Display */}
      <div className="balance-display">
        <h2>Your Balance</h2>
        <p>{formatCurrency(balance)}</p>
      </div>
      
      <div className="main-content">
        {/* Recipient Info */}
        <div className="recipient-section">
          <div className="recipient-info">
            <UserAvatar user={selectedUser} size="xl" className="recipient-avatar" />
            <h2>
              {getFullName(selectedUser)}
            </h2>
            <p>{selectedUser.email}</p>
          </div>
        </div>

        {/* Amount Input */}
        <div className="amount-section">
          <h3 className="section-title">Amount to Send</h3>
          <div className="amount-input-container">
            <span className="currency-symbol">
              $
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                  setAmount(value);
                }
              }}
              placeholder="0.00"
              className="amount-input"
              min="0"
              max={balance}
              step="0.01"
            />
          </div>
          <div className="balance-info">
            <span className="balance-label">Available balance:</span>
            <span className="balance-amount">{formatCurrency(balance)}</span>
          </div>
          
          {/* Quick amount buttons */}
          <div className="quick-amounts">
            {[balance * 0.10, balance * 0.25, balance * 0.50, balance * 0.75].map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toFixed(2))}
                className="quick-amount-btn"
              >
                {formatCurrency(quickAmount)}
              </button>
            ))}
          </div>

          <div className="notes-section">
            <h3 className="notes-title">Notes</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="For food, rent, etc."
              className="notes-textarea"
              rows={3}
            />
          </div>

        </div>
        {/* Send Button */}
        <div className="send-button-section">
          <button
            onClick={handleSendMoney}
            disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance || isLoading}
            className="send-button"
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <Send size={20} />
                <span>Send {amount ? formatCurrency(parseFloat(amount)) : formatCurrency(0)}</span>
              </>
            )}
          </button>

          {parseFloat(amount) > balance && !isLoading && (
            <p className="error-message">
              Insufficient balance.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendAgainPage;