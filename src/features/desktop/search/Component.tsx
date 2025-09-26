import TextField from '@/components/common/textField';
import { SearchIcon, Store } from 'lucide-react';
import * as Form from '@radix-ui/react-form';
import { memo, useState } from 'react';
const list = [
  {
    group: { label: 'product', value: 'product', icon: Store },
    list: [
      { label: 'aa', value: 'aa' },
      { label: 'bb', value: 'bb' },
    ],
  },
  {
    group: { label: 'shop', value: 'shop', icon: Store },
    list: [
      { label: 'aa1', value: 'aa1' },
      { label: 'bb1', value: 'bb1' },
    ],
  },
  {
    group: { label: 'promotions', value: 'promotions', icon: Store },
    list: [
      { label: 'aa2', value: 'aa2' },
      { label: 'bb2', value: 'bb2' },
    ],
  },
];
const Component = () => {
  const [select, setSelect] = useState('');
  const [search, setSearch] = useState('');

  return (
    <div className=" w-full">
      <Form.Root
        className="w-full space-y-8"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          console.log('Submitted:', Object.fromEntries(formData));
          const data = Object.fromEntries(formData);
          setSearch(data?.search as string);
        }}
        onChange={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          console.log('Submitted:', Object.fromEntries(formData));
          const data = Object.fromEntries(formData);
          setSearch(data?.search as string);
        }}
      >
        <TextField
          name="search"
          type={'text'}
          placeholder="Search"
          startIcon={<SearchIcon />}
        />
      </Form.Root>
      {search && (
        <div className="relative">
          <div className="z-[99] absolute top-[10px] w-full h-[300px] overflow-auto bg-white rounded-[8px] shadow-2xl py-4 px-[8px]">
            {list.map((item, index) => {
              return (
                <div key={index}>
                  <div className="flex items-center gap-2 px-1">
                    <item.group.icon />
                    <p>{item.group.label}</p>
                  </div>
                  <div className="flex flex-col gap-[3px] my-2 ">
                    {item.list.map((ele, ind) => {
                      return (
                        <p
                          key={ind}
                          onClick={() => {
                            setSelect(ele.value);
                          }}
                          className={`${
                            select === ele.value
                              ? 'bg-primary-1 text-primary-4'
                              : 'text-black'
                          }  p-2 rounded-[8px]`}
                        >
                          {ele.label}
                        </p>
                      );
                    })}

                    {/* <p className={` p-2 text-black`}>sssss</p> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* <div className="relative">
        <div className="absolute top-[10px] w-full h-[70px] bg-white rounded-[8px] shadow-2xl py-4 px-[8px]">
          <p className="p-2 rounded-[8px] text-center">No data</p>
        </div>
      </div> */}
    </div>
  );
};

export default memo(Component);
