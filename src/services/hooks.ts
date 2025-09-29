import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: userService.getCurrentUser,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useFrequentContacts = () => {
  return useQuery({
    queryKey: ['frequentContacts'],
    queryFn: userService.getFrequentContacts,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useRandomUsers = (count: number) => {
  return useQuery({
    queryKey: ['randomUsers', count],
    queryFn: () => userService.getRandomUsers(count),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};