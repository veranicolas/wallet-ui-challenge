import Image from 'next/image';
import { User } from '@/types';
import { getInitials } from '@/utils';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-24 h-24 text-lg'
};

const UserAvatar = ({ user, size = 'md', className = '' }: UserAvatarProps) => {
  const sizeClass = sizeClasses[size];

  return (
    <div className={`relative ${sizeClass} ${className}`}>
      {user.picture?.thumbnail ? (
        <Image
          src={user.picture.thumbnail}
          alt={getInitials(user)}
          width={size === 'xl' ? 96 : size === 'lg' ? 64 : size === 'md' ? 48 : 32}
          height={size === 'xl' ? 96 : size === 'lg' ? 64 : size === 'md' ? 48 : 32}
          className="rounded-full object-cover w-full h-full"
        />
      ) : (
        <div className={`${sizeClass} rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold`}>
          {getInitials(user)}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;