import * as React from 'react';
import { IProp } from './interface';
import { Separator } from '@radix-ui/react-separator';

const Component = ({ text, bgText }: IProp) => {
  return (
    <div className="relative w-full">
      {text && (
        <p
          className={`px-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] text-black-5 font-normal ${
            bgText || 'bg-white'
          }`}
        >
          {text}
        </p>
      )}
      <Separator
        className="my-4 w-full border-[0.5px] border-grey-2"
        decorative
      />
    </div>
  );
};

export { Component };
