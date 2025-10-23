import ListenNetworkProvider from '@/providers/listen-network-provider';
import React from 'react';

const template = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ListenNetworkProvider>{children}</ListenNetworkProvider>;
};

export default template;
