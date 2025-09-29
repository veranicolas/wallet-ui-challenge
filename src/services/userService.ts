import { User, RandomUserResponse } from '@/types';

const API_BASE_URL = 'https://randomuser.me/api';

export const userService = {
  // Get a single user for the main user
  async getCurrentUser(): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/?results=1&seed=mainuser`);
      if (!response.ok) {
        throw new Error('Failed to fetch current user');
      }
      const data: RandomUserResponse = await response.json();
      return data.results[0];
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  // Get frequent contacts (10 users)
  async getFrequentContacts(): Promise<User[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/?results=10&seed=contacts`);
      if (!response.ok) {
        throw new Error('Failed to fetch frequent contacts');
      }
      const data: RandomUserResponse = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching frequent contacts:', error);
      throw error;
    }
  },

  // Get additional users for transaction history
  async getRandomUsers(count: number = 5): Promise<User[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/?results=${count}`);
      if (!response.ok) {
        throw new Error('Failed to fetch random users');
      }
      const data: RandomUserResponse = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching random users:', error);
      throw error;
    }
  }
};