import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi, User } from '@/service/api';

export const USER_QUERY_KEY = ['user'];

export const useUser = () => {
  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: authApi.getMe,
    retry: false,
    staleTime: Infinity, // User data doesn't change often
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(USER_QUERY_KEY, null);
      queryClient.invalidateQueries();
      // Optionally redirect to home or login page
      window.location.href = '/';
    },
  });
};
