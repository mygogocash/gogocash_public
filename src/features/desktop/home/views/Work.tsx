import BadgeList from '@/components/common/badgeList';
import WalletIcon from '@/components/icons/NotificationIcon';

const Work = () => {
  return (
    <div>
      <h1 className="text-[var(--black-4)] text-[40px] font-semibold mb-[20px] text-center">
        How GoGoCash Works?
      </h1>

      <BadgeList
        list={[
          {
            icon: <WalletIcon />,
            title: 'Earn',
            subTitle: 'Earn your cashback on every spend up to 30%',
          },
          {
            icon: <WalletIcon />,
            title: 'Redeem',
            subTitle: 'Redeem your cashback on every spend up to 30%',
          },
          {
            icon: <WalletIcon />,
            title: 'Wallet',
            subTitle: 'Wallet',
          },
        ]}
      />
    </div>
  );
};

export default Work;
