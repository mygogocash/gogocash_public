'use client';

import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';

import { IProp } from './interface';
import { memo } from 'react';
const Component = ({ totalPages = 10, currentPage, setCurrentPage }: IProp) => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPages = () => {
    const pages = [];
    const maxVisiblePages = 5; // จำนวนเลขหน้าที่แสดงก่อนจุดไข่ปลา

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // หน้าแรก
        i === totalPages || // หน้าสุดท้าย
        (i >= currentPage - 1 && i <= currentPage + 1) // หน้าที่ใกล้กับปัจจุบัน
      ) {
        pages.push(
          <button
            key={i}
            className={`w-[24px] h-[24px] rounded-full ${
              i === currentPage ? 'bg-gray-500 text-white' : 'text-gray-700'
            }`}
            onClick={() => goToPage(i)}
          >
            {i}
          </button>
        );
      } else if (
        (i === 2 && currentPage > maxVisiblePages) ||
        (i === totalPages - 1 &&
          currentPage < totalPages - (maxVisiblePages - 1))
      ) {
        pages.push(
          <span key={i} className="px-2">
            ...
          </span>
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 p-4 ">
      {/* Prev Button */}
      <button
        className="px-3 py-1"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon />
      </button>

      {/* Page Numbers */}
      {renderPages()}

      {/* Next Button */}
      <button
        className="px-3 py-1"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default memo(Component);
