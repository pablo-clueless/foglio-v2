"use client";

import { useReactToPrint, type UseReactToPrintFn } from "react-to-print";
import React from "react";

type PrintErrorLocation = "onBeforePrint" | "print";

interface UsePrintOptions {
  contentRef: React.RefObject<HTMLElement | null>;
  documentTitle?: string;
  onAfterPrint?: () => void;
  onBeforePrint?: () => void | Promise<void>;
  onPrintError?: (errorLocation: PrintErrorLocation, error: Error) => void;
  pageStyle?: string;
  preserveAfterPrint?: boolean;
  suppressErrors?: boolean;
  nonce?: string;
}

interface UsePrintReturn {
  handlePrint: UseReactToPrintFn;
  isPrinting: boolean;
}

const DEFAULT_PAGE_STYLE = `
  @page {
    size: auto;
    margin: 20mm;
  }
  @media print {
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;

export const usePrint = (options: UsePrintOptions): UsePrintReturn => {
  const {
    contentRef,
    documentTitle,
    onAfterPrint,
    onBeforePrint,
    onPrintError,
    pageStyle = DEFAULT_PAGE_STYLE,
    preserveAfterPrint = true,
    suppressErrors = false,
    nonce,
  } = options;

  const [isPrinting, setIsPrinting] = React.useState(false);

  const handleAfterPrint = React.useCallback(() => {
    setIsPrinting(false);
    onAfterPrint?.();
  }, [onAfterPrint]);

  const handleBeforePrint = React.useCallback(async () => {
    setIsPrinting(true);
    await onBeforePrint?.();
  }, [onBeforePrint]);

  const handlePrintError = React.useCallback(
    (errorLocation: PrintErrorLocation, error: Error) => {
      setIsPrinting(false);
      if (!suppressErrors) {
        onPrintError?.(errorLocation, error);
      }
    },
    [onPrintError, suppressErrors],
  );

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle,
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
    onPrintError: handlePrintError,
    pageStyle,
    preserveAfterPrint,
    nonce,
  });

  return { handlePrint, isPrinting };
};
