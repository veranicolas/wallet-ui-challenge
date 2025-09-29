'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HomeIcon from '@/assets/icon-home.svg';
import HistoryIcon from '@/assets/icon-history.svg';
import ProfileIcon from '@/assets/icon-profile.svg';

const NavigationBar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '/transfers', icon: HistoryIcon, label: 'Transfers' },
    { href: '/profile', icon: ProfileIcon, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 max-w-xl mx-auto w-full">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                isActive
                  ? 'text-[color:#662AB2] bg-blue-50'
                  : 'text-gray-600 hover:text-[color:#662AB2]'
              }`}
            >
              <Icon fill={isActive ? '#662AB2' : '#999999'} />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavigationBar;