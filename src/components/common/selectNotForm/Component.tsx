import { ChevronDownIcon } from '@radix-ui/react-icons';
import { IProp } from './interface';

export default function Component({ name, options, onClick }: IProp) {
  return (
    <>
      <div className="relative">
        <select
          onChange={(e) => {
            onClick?.(e.target.value);
          }}
          name={name}
          className="w-full h-[56px] px-3 py-2 pr-10 border border-grey-2 rounded-[8px] text-black-500 text-[16px] appearance-none bg-white cursor-pointer"
        >
          {options.map((option) => (
            <option className="" key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </>
  );
}
