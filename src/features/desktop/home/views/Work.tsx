import BadgeList from '@/components/common/badgeList';
import CartIcon from '@/components/icons/CartIcon';
import CoinIcon from '@/components/icons/CoinIcon';
import WalletIcon from '@/components/icons/WalletIcon';

const Work = () => {
  return (
    <div>
      <h1 className="text-[var(--black-4)] text-[40px] font-semibold mb-[20px] text-center">
        How GoGoCash Works?
      </h1>

      <BadgeList
        list={[
          {
            icon: <CartIcon />,
            title: 'Shop',
            subTitle:
              'Shop with you favorite merchants and complete the purchases',
          },
          {
            icon: <CoinIcon />,
            title: 'Earn',
            subTitle: 'Earn your cashback on every spend up to  30%',
          },
          {
            icon: <WalletIcon width={51} height={52} strokeWidth={2} />,
            title: 'Claim',
            subTitle: 'Claim earning anytime to your wallet',
          },
        ]}
      />
    </div>
  );
};

export default Work;
