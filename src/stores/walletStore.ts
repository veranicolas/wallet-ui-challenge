import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { WalletState, User, Transaction } from '@/types';

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      balance: 250000.50, // Initial balance
      frequentContacts: [],
      transactions: [],
      
      setCurrentUser: (user: User) => set({ currentUser: user }),
      
      setBalance: (balance: number) => set({ balance }),
      
      addTransaction: (transaction: Transaction) => {
        set((state) => ({
          transactions: [transaction, ...state.transactions].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        }));
      },
      
      setFrequentContacts: (contacts: User[]) => set({ frequentContacts: contacts }),
      
      updateBalance: (amount: number) => {
        const currentBalance = get().balance;
        set({ balance: currentBalance - Math.abs(amount) });
      }
    }),
    {
      name: 'wayniwallet-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
        balance: state.balance,
        frequentContacts: state.frequentContacts,
        transactions: state.transactions
      })
    }
  )
);