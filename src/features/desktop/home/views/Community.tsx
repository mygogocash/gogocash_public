import Button from '@/components/common/button';

const Community = () => {
  return (
    <div className="pb-[88px] flex items-center justify-center flex-col gap-3">
      <h1 className="text-[var(--black-4)] text-[40px] md:text-[96px] font-extrabold text-center md:leading-[100px]">
        Love GoGoCash?
      </h1>

      <h3 className="text-[var(--black-4)] text-[24px]">
        Become a part of the GoGoCash Gang
      </h3>
      <Button
        backgroundColor="bg-[var(--primary-4)] text-white"
        text="Join our Community"
        onClick={function (): void {
          // throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
};

export default Community;
