'use client';

import useHome from '@/hooks/useHome';
import { createContext, ReactNode, useContext } from 'react';

type MyContextType = ReturnType<typeof useHome> | undefined;

const MyContext = createContext<MyContextType>(undefined);

export const HomeContext = ({ children }: { children: ReactNode }) => {
  const value = useHome();
  return (
    <MyContext.Provider value={{ ...value }}>{children}</MyContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(MyContext);
  if (!context)
    throw new Error('useHomeContext must be used within MyProvider');
  return context;
};
