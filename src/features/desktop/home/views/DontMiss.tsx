import Image from 'next/image';

const DontMiss = () => {
  return (
    <Image
      src={'/dontMiss.png'}
      alt={'dontMiss'}
      width={'1160'}
      className="w-full"
      height={455}
    />
  );
};

export { DontMiss };
