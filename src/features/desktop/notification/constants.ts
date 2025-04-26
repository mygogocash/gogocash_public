import {
  CoinsIcon,
  ComponentIcon,
  MessageSquare,
  TagsIcon,
  Wallet2Icon,
} from 'lucide-react';

export const NOTIFICATION_TYPE = [
  { label: 'All', icon: ComponentIcon },
  { label: 'Cashback', icon: CoinsIcon },
  { label: 'Withdraw', icon: Wallet2Icon },
  { label: 'Promotion', icon: TagsIcon },
  { label: 'Message', icon: MessageSquare },
];

export const NOTIFICATION_LIST = [
  {
    type: 'cashback',
    title: 'Cashback transfer is incomplete',
    description:
      'Transaction no. *000 is incomplete, due to a return, change, or cancellation as outlined in our terms and conditions.',
    time: '00:00',
    read: true,
  },
  {
    type: 'withdraw',
    title: 'Cashback transfer is incomplete',
    description:
      'Transaction no. *000 is incomplete, due to a return, change, or cancellation as outlined in our terms and conditions.',
    time: '00:00',
    read: false,
  },
  {
    type: 'promotion',
    title: 'Cashback transfer is incomplete',
    description:
      'Transaction no. *000 is incomplete, due to a return, change, or cancellation as outlined in our terms and conditions.',
    time: '00:00',
    read: false,
  },
  {
    type: 'message',
    title: 'Cashback transfer is incomplete',
    description:
      'Transaction no. *000 is incomplete, due to a return, change, or cancellation as outlined in our terms and conditions.',
    time: '00:00',
    read: true,
  },
];
