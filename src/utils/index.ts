import { Transaction, User } from '@/types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const getFullName = (user: User): string => {
  return `${user.name.first} ${user.name.last}`;
};

export const getInitials = (user: User): string => {
  return `${user.name.first[0]}${user.name.last[0]}`.toUpperCase();
};

export const getUserId = (user: User): string => {
  return user.login.uuid;
};

export const generateMockTransactions = (users: User[]): Transaction[] => {
  const transactions: Transaction[] = [];
  const now = new Date();

  users.forEach((user) => {
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const transactionDate = new Date(now);
      transactionDate.setDate(now.getDate() - daysAgo);

      transactions.push({
        id: `tx-${getUserId(user)}-${i}`,
        reference: `#${Math.floor(100000 + Math.random() * 900000)}`,
        recipientId: getUserId(user),
        recipient: user,
        amount: Math.floor(Math.random() * 500) + 10,
        date: transactionDate,
        type: 'sent'
      });
    }
  });

  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};