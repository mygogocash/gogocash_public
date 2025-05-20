'use client';

import useCrossmintLogin from '@/hooks/useCrossmintLogin';
import { createContext, ReactNode, useContext } from 'react';

type MyContextType = ReturnType<typeof useCrossmintLogin> | undefined;

const MyContext = createContext<MyContextType>(undefined);

export const CrossmintLoginContext = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useCrossmintLogin();
  return (
    <MyContext.Provider value={{ ...value }}>{children}</MyContext.Provider>
  );
};

export const useCrossmintLoginContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error('useMyContext must be used within MyProvider');
  return context;
};
