import ImageNext from 'next/image';
import { useEffect, useState } from 'react';

interface IProp {
  src: string;
  alt: string;
  width: number;
  height: number;
}
const ImageComponent = ({ src, alt, width, height }: IProp) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsValid(true); // Image exists
    img.onerror = () => setIsValid(false); // 404 or other error
    img.src = src;
  }, [src]);

  if (isValid === null)
    return (
      <ImageNext
        src={'/no_image.jpg'}
        alt={'preview image'}
        width={width}
        height={height}
      />
    );
  if (!isValid)
    return (
      <ImageNext
        src={'/no_image.jpg'}
        alt={'preview image'}
        width={width}
        height={height}
        className="w-full h-[inherit]"
      />
    );
  return (
    <ImageNext
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="w-full h-[inherit]"
    />
  );
};

export default ImageComponent;
