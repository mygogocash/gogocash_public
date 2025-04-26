import Select from '@/components/common/select';
import Search from '@/features/desktop/search';
import * as Form from '@radix-ui/react-form';
import { memo, useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import Pagination from '@/components/common/pagination';
import Badge from '@/components/common/badge';
import { Status } from '@/components/common/badge/interface';

const data = [
  { name: 'Alice', age: 25, country: 'USA', status: 'info' },
  { name: 'Bob', age: 30, country: 'UK', status: 'warning' },
  { name: 'Charlie', age: 28, country: 'Canada', status: 'success' },
  { name: 'David', age: 35, country: 'Germany', status: 'error' },
  { name: 'Alice', age: 25, country: 'USA', status: 'info' },
  { name: 'Bob', age: 30, country: 'UK', status: 'warning' },
  { name: 'Charlie', age: 28, country: 'Canada', status: 'success' },
  { name: 'David', age: 35, country: 'Germany', status: 'error' },
  { name: 'Alice', age: 25, country: 'USA', status: 'info' },
  { name: 'Bob', age: 30, country: 'UK', status: 'warning' },
  { name: 'Charlie', age: 28, country: 'Canada', status: 'success' },
  { name: 'David', age: 35, country: 'Germany', status: 'error' },
  { name: 'Alice', age: 25, country: 'USA', status: 'info' },
  { name: 'Bob', age: 30, country: 'UK', status: 'warning' },
  { name: 'Charlie', age: 28, country: 'Canada', status: 'success' },
  { name: 'David', age: 35, country: 'Germany', status: 'error' },
];

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'country', header: 'Country' },
];
const Component = () => {
  const [openOption, setOpenOption] = useState(false);
  const [openCurrency, setOpenCurrency] = useState(false);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = useMemo(
    () => data.slice(startIndex, startIndex + itemsPerPage),
    [startIndex]
  );

  // 🔹 use React Table
  const table = useReactTable({
    data: currentData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  // console.log('table', table.getRowModel());

  return (
    <div
      className="text-[var(--black-3)] text-[12px] 
    font-semibold shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)] rounded-[16px] p-5 md:p-[40px] space-y-10"
    >
      <h1 className="text-[var(--black-5)] text-[36px] font-medium">
        Financial History
      </h1>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="w-[260px] h-[123px] rounded-[8px] bg-[#E8F7FF] flex items-center justify-center flex-col">
          <h1 className="text-[24px] text-[#5D87FF] font-medium">0</h1>
          <p className="text-[16px] text-[#5D87FF] font-normal">
            Total Transactions
          </p>
        </div>

        <div className="w-[260px] h-[123px] rounded-[8px] bg-[#FFFBE8] flex items-center justify-center flex-col">
          <h1 className="text-[24px] text-[#FBD300] font-medium">0</h1>
          <p className="text-[16px] text-[#FBD300] font-normal">
            Earn Cashback Transactions
          </p>
        </div>

        <div className="w-[260px] h-[123px] rounded-[8px] bg-[#E7F9EF] flex items-center justify-center flex-col">
          <h1 className="text-[24px] text-[#00B14F] font-medium">0</h1>
          <p className="text-[16px] text-[#00B14F] font-normal">
            Earn Cashback Transactions
          </p>
        </div>

        <div className="w-[260px] h-[123px] rounded-[8px] bg-[#FFEDED] flex items-center justify-center flex-col">
          <h1 className="text-[24px] text-[#E60E0E] font-medium">0</h1>
          <p className="text-[16px] text-[#E60E0E] font-normal">
            Withdraw Transactions
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 md:flex-row flex-col ">
        <Form.Root
          className="w-full flex items-center justify-end gap-3 md:flex-row flex-col "
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const data = Object.fromEntries(formData);

            console.log('Submitted:', data);
          }}
          onChange={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const data = Object.fromEntries(formData);

            console.log('Submitted:', data);
          }}
        >
          <div className="max-w-[300px] w-full">
            <Select
              name={'date'}
              open={openOption}
              onOpenChange={setOpenOption}
              options={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
              ]}
            />
          </div>
          <div className="max-w-[300px] w-full">
            <Select
              name={'currency'}
              open={openCurrency}
              onOpenChange={setOpenCurrency}
              options={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
              ]}
            />
          </div>
        </Form.Root>
        <div className="max-w-[300px] w-full">
          <Search />
        </div>
      </div>
      {/* Table */}
      <div>
        <table className="w-full  ">
          <thead className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="h-[66px] border-b border-[var(--grey-1)]"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4  text-left text-[--black-5] text-[14px] font-bold"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table &&
              table?.getRowModel()?.rows?.map?.((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-[var(--grey-1)] border-b border-[var(--grey-1)] h-[66px]`}
                >
                  {row.getVisibleCells().map((cell) =>
                    cell.column.id === 'status' ? (
                      <td
                        key={cell.id}
                        className="px-4 text-[--black-5] text-[14px] font-medium"
                      >
                        <Badge
                          status={cell.getValue() as Status}
                          text={cell.getValue() as string}
                        />
                      </td>
                    ) : (
                      <td
                        key={cell.id}
                        className="px-4 text-[--black-5] text-[14px] font-medium"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={function (page: number): void {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default memo(Component);
