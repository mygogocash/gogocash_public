import { ArrowDown } from 'lucide-react';
import React from 'react';
import useSWR from 'swr';
import { ResponseWithdrawHistory } from './interface';
import { fetcher } from '@/lib/client';
import { formatAddress } from '@/lib/utils';
import { format } from 'date-fns';

const Component = () => {
  // const router = useRouter();

  const [query] = React.useState({ search: '', limit: 10, page: 1 });
  const data = [
    `/withdraw?search=${query.search}&limit=${query.limit}&page=${query.page}`,
  ];
  const { data: dataWithdrawHistory } = useSWR<ResponseWithdrawHistory>(
    data,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      // use cache
    }
  );
  return (
    <div className="p-5 space-y-5 md:max-w-[600px] mx-auto">
      <p className="text-[20px] font-medium text-black-6">Withdraw History</p>
      {dataWithdrawHistory?.data && dataWithdrawHistory?.data?.length > 0 ? (
        dataWithdrawHistory?.data?.map((item) => {
          return (
            <div
              key={item._id}
              className="shadow-[0px_1px_10px_0px_rgba(0,0,0,0.25)] rounded-[8px] flex items-center gap-3 p-[16px]"
            >
              <ArrowDown color="#E60E0E" size={20} />
              <div className="w-full">
                <div className="flex items-center justify-between w-full">
                  <p className="text-[16px] font-medium text-black-6">
                    {item.address
                      ? formatAddress(item.address)
                      : item.account_name}
                  </p>
                  <p className="text-[20px] font-medium text-[#E60E0E]">
                    -{item.amount_net} {item.currency}
                  </p>
                </div>
                <p className="text-gray-400 text-[10px]">Earn Cashback</p>
                <p className="text-gray-400 text-[10px] mt-3">
                  Added to your wallet:{' '}
                  {format(new Date(item.createdAt), 'd MMM yyyy hh:mm a')}
                </p>
                <p className="text-black-6 text-[10px] capitalize">
                  {item.status}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="shadow-[0px_1px_10px_0px_rgba(0,0,0,0.25)] rounded-[8px] flex items-center gap-3 p-[16px]">
          <p className="text-center text-[14px]">Transaction not found</p>
        </div>
      )}
    </div>
  );
};

export default Component;
