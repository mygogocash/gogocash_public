import Image from 'next/image';
import React from 'react';

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  image: string;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, image } = props;

  return (
    <div
      className={'carousel-thumbs__slide'.concat(
        selected ? ' carousel-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="carousel-thumbs__slide__number"
      >
        <Image
          key={index}
          src={image || ''}
          alt="pot_ex_1"
          width={100}
          height={100}
          className="max-w-[100px] max-h-[100px] h-full w-full"
        />
      </button>
    </div>
  );
};
