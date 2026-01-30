import React from "react";

import { cn } from "@/lib";

interface Props {
  current: number;
  limit: number;
  onPageChange: (page: number) => void;
  total: number;
  className?: string;
  buttonClassName?: string;
}

export const Pagination = ({ current, limit, onPageChange, total, buttonClassName, className }: Props) => {
  const totalPages = Math.ceil(total / limit);

  const goToPrevious = () => {
    if (current > 1) {
      return onPageChange(current - 1);
    }
  };
  const goToNext = () => {
    if (current < totalPages) {
      onPageChange(current + 1);
    }
  };

  const renderPageButton = (index: number) => (
    <button
      key={index}
      onClick={() => onPageChange(index)}
      disabled={current === index}
      className={cn(
        "grid size-8 place-items-center text-sm font-medium",
        current === index && "bg-primary-400 text-black",
        buttonClassName,
      )}
    >
      {index}
    </button>
  );

  const renderButtons = () => {
    const numbers = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(renderPageButton(i));
      }
    } else {
      numbers.push(renderPageButton(1));

      if (current <= 3) {
        for (let i = 2; i <= 4; i++) {
          numbers.push(renderPageButton(i));
        }
        numbers.push(
          <span key="ellipsis" className="px-2">
            ...
          </span>,
        );
      } else if (current >= totalPages - 2) {
        numbers.push(
          <span key="ellipsis" className="px-2">
            ...
          </span>,
        );
        for (let i = totalPages - 3; i < totalPages; i++) {
          numbers.push(renderPageButton(i));
        }
      } else {
        numbers.push(
          <span key="ellipsis-start" className="px-2">
            ...
          </span>,
        );
        for (let i = current - 1; i <= current + 1; i++) {
          numbers.push(renderPageButton(i));
        }
        numbers.push(
          <span key="ellipsis-end" className="px-2">
            ...
          </span>,
        );
      }

      numbers.push(renderPageButton(totalPages));
    }

    return numbers;
  };

  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      <div className="text-sm text-neutral-500">
        <p>
          Showing {current} of {totalPages} pages
        </p>
      </div>
      <div className="flex items-center gap-x-4">{renderButtons()}</div>
      <div className="flex items-center gap-x-4">
        <button
          className="flex h-8 items-center gap-x-1 border px-3 text-sm text-neutral-500 transition-colors duration-300 hover:bg-neutral-300 hover:text-neutral-500 disabled:bg-neutral-100"
          disabled={totalPages === 0 || current === 1}
          onClick={goToPrevious}
        >
          Previous
        </button>
        <button
          className="flex h-8 items-center gap-x-1 border px-3 text-sm text-neutral-500 transition-colors duration-300 hover:bg-neutral-300 hover:text-neutral-500 disabled:bg-neutral-100"
          disabled={totalPages === 0 || current === totalPages}
          onClick={goToNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
