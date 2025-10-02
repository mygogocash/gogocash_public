'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import { ResponseConversion } from '@/features/desktop/profile/interface';
import { DetailHistoryMobile } from '@/features/mobile/history/detail';
import { fetcherPost } from '@/lib/client';
import { CircleHelp } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';

const Index = () => {
  const router = useRouter();
  const params = useParams();
  const data = [`/involve/conversion/${params.id}`, { limit: 100, page: 1 }];
  const { data: dataConversion } = useSWR<ResponseConversion[]>(
    data,
    fetcherPost,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      // use cache
    }
  );

  return (
    <>
      <HeaderMobile
        color="black"
        iconRight={
          <CircleHelp
            stroke="black"
            width={24}
            height={24}
            color="black"
            onClick={() => router.push(`/help-center`)}
          />
        }
      />
      <DetailHistoryMobile
        dataConversion={dataConversion as unknown as ResponseConversion}
      />
    </>
  );
};

export default Index;
