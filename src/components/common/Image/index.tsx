// import ImageNext from 'next/image';
import Images from 'next/image';
import { useEffect, useState } from 'react';

interface IProp {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}
const ImageComponent = ({ src, alt, width, height, className }: IProp) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const imgs = new Image();
    imgs.onload = () => setIsValid(true); // Image exists
    imgs.onerror = () => setIsValid(false); // 404 or other error
    imgs.src = src;
  }, [src]);

  if (isValid === null)
    return (
      <Images
        src={'/no_image.jpg'}
        alt={'preview image'}
        width={width}
        height={height}
        className={className}
      />
    );
  if (!isValid)
    return (
      <Images
        src={'/no_image.jpg'}
        alt={'preview image'}
        width={width}
        height={height}
        className={`w-full object-contain ${className}`}
      />
    );
  return (
    <Images
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`w-full ${className}`}
    />
  );
};

export default ImageComponent;
