import Image from 'next/image';
import { Content, FooterList1, Payment, Socail } from './constant';
import { useRouter } from 'next/navigation';
import IconButton from '@/components/common/IconButton';

const Component = () => {
  const router = useRouter();
  return (
    <footer className="bg-[var(--black-1)] py-[40px] w-full md:block hidden">
      <div className="container-inner">
        <div className="flex flex-wrap mb-[64px]">
          <div className="flex-none w-1/3">
            <Image src="/logoBlack.svg" alt="logo" width={150} height={93} />
          </div>
          <div className="grow">
            <div className="flex items-center justify-between flex-wrap md:mt-0 mt-5 space-y-[24px] md:space-y-0">
              {FooterList1.map((item, index) => (
                <div key={index}>
                  <p className="font-bold text-[20px] text-[var(--black-5)] mb-[16px]">
                    {item.title}
                  </p>
                  <ul>
                    {item.list.map((item, index) => (
                      <li
                        key={index}
                        className="cursor-pointer "
                        onClick={function (): void {
                          router.push(item.link);
                        }}
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between flex-wrap space-y-[24px] md:space-y-0">
          <div className="social-group flex gap-[16px] flex-wrap">
            {Socail.map((item, index) => (
              <IconButton
                border
                key={index}
                icon={<item.icon />}
                onClick={function (): void {
                  //
                }}
                radius="rounded-full"
              />
            ))}
          </div>
          <div className="social-group flex gap-[16px] flex-wrap">
            {Payment.map((item, index) => (
              <IconButton
                border
                key={index}
                icon={<item.icon />}
                onClick={function (): void {
                  //
                }}
                radius="rounded-[8px]"
              />
            ))}
          </div>
        </div>
        <hr className="border-b-[0.5px] border-[var(--grey-1)] w-full my-[24px]" />
        <div className="flex justify-between flex-wrap my-[24px]">
          <p className="text-[var(--black-5)] text-normal text-[12px]">
            © 2024 GoGoCash
          </p>
          <div className="flex gap-[32px] flex-wrap">
            {Content.map((item, index) => (
              <p
                key={index}
                className="text-[var(--black-5)] font-bold text-[12px]"
              >
                {item.title}
              </p>
            ))}
          </div>
        </div>
        <p className="text-[var(--black-5)] text-normal text-[12px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </footer>
  );
};

export default Component;
