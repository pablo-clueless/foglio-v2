"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CaretDownIcon } from "@phosphor-icons/react";
import React from "react";

import { cn } from "@/lib";

interface AccordionContextProps {
  activeItems: Set<string>;
  toggleItem: (id: string) => void;
  single?: boolean;
}

const AccordionContext = React.createContext<AccordionContextProps | undefined>(undefined);
AccordionContext.displayName = "Accordion";

interface AccordionProviderProps {
  children: React.ReactNode;
  single?: boolean;
}

export const AccordionProvider: React.FC<AccordionProviderProps> = ({ children, single }) => {
  const [activeItems, setActiveItems] = React.useState<Set<string>>(new Set());

  const toggleItem = React.useCallback(
    (id: string) => {
      setActiveItems((prev) => {
        if (single) {
          if (prev.has(id)) {
            return new Set();
          } else {
            return new Set([id]);
          }
        } else {
          const next = new Set(prev);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return next;
        }
      });
    },
    [single],
  );
  const value = React.useMemo(() => ({ activeItems, toggleItem, single }), [activeItems, toggleItem, single]);

  return <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>;
};

const useAccordion = () => {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("useAccordion must be used within an AccordionProvider");
  return ctx;
};

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  single?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ children, className, single }) => (
  <AccordionProvider single={single}>
    <div className={cn("space-y-2", className)}>{children}</div>
  </AccordionProvider>
);

interface AccordionItemProps {
  children: React.ReactNode;
  id: string;
  keepMounted?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ children }) => {
  return <div className="w-full overflow-hidden">{children}</div>;
};

interface AccordionTriggerProps {
  children: React.ReactNode;
  id: string;
  disabled?: boolean;
  onToggle?: (isActive: boolean) => void;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, id, disabled, onToggle }) => {
  const { activeItems, toggleItem } = useAccordion();
  const isActive = activeItems.has(id);

  const handleToggle = React.useCallback(() => {
    if (disabled) return;
    toggleItem(id);
    onToggle?.(!isActive);
  }, [disabled, id, isActive, onToggle, toggleItem]);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleToggle}
      className={cn(
        "flex w-full items-center justify-between border px-3 py-3 text-sm",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
      )}
    >
      {children}
      <CaretDownIcon className={cn("size-3 transition-transform duration-300", isActive && "rotate-180")} />
    </button>
  );
};

interface AccordionContentProps {
  children: React.ReactNode;
  id: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ children, id }) => {
  const { activeItems } = useAccordion();
  const isActive = activeItems.has(id);

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          key={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-3 py-2 text-sm">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
