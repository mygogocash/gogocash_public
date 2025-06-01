/* eslint-disable @next/next/no-img-element */
// import ImageNext from 'next/image';
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
    const img = new Image();
    img.onload = () => setIsValid(true); // Image exists
    img.onerror = () => setIsValid(false); // 404 or other error
    img.src = src;
  }, [src]);

  if (isValid === null)
    return (
      <img
        src={'/no_image.jpg'}
        alt={'preview image'}
        width={width}
        height={height}
        className={className}
      />
    );
  if (!isValid)
    return (
      <img
        src={'/no_image.jpg'}
        alt={'preview image'}
        width={width}
        height={height}
        className={`w-full object-contain ${className}`}
      />
    );
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`w-full ${className}`}
    />
  );
};

export default ImageComponent;
