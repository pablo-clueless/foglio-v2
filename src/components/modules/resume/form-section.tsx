"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import {
  RiAddLine,
  RiArrowDownLine,
  RiArrowUpLine,
  RiDeleteBinLine,
  RiEditLine,
  RiCloseLine,
  RiCheckLine,
} from "@remixicon/react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStackComponent } from "@/hooks";
import { toISODate, toInputDate, cn } from "@/lib";

type FieldType = "text" | "textarea" | "date" | "number" | "email" | "url" | "select" | "tags" | "checkbox";

interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  options?: { label: string; value: string }[];
  helperText?: string;
}

interface FormSectionProps<T extends { id: string }> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  items: T[];
  fields: FieldConfig[];
  emptyState?: {
    title: string;
    description: string;
  };
  getItemTitle: (item: T) => string;
  getItemSubtitle?: (item: T) => string;
  createEmptyItem: () => Omit<T, "id" | "user_id" | "created_at" | "updated_at">;
  validationSchema?: Yup.ObjectSchema<any>;
  onAdd?: (item: Omit<T, "id" | "user_id" | "created_at" | "updated_at">) => void | Promise<void>;
  onUpdate?: (item: T) => void | Promise<void>;
  onDelete?: (id: string) => void | Promise<void>;
  onReorder?: (items: T[]) => void;
  maxItems?: number;
  isLoading?: boolean;
  className?: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -20 },
};

export const FormSection = <T extends { id: string }>({
  title,
  description,
  icon,
  items: initialItems,
  fields,
  emptyState,
  getItemTitle,
  getItemSubtitle,
  createEmptyItem,
  validationSchema,
  onAdd,
  onUpdate,
  onDelete,
  onReorder,
  maxItems,
  isLoading,
  className,
}: FormSectionProps<T>) => {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [isAdding, setIsAdding] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const { items, moveUp, moveDown, remove, update, canMoveUp, canMoveDown, setItems } = useStackComponent<T>({
    initialItems,
    onChange: onReorder,
    getItemId: (item) => item.id,
  });

  React.useEffect(() => {
    setItems(initialItems);
  }, [initialItems, setItems]);

  const canAddMore = maxItems ? items.length < maxItems : true;

  const handleStartAdd = () => {
    setIsAdding(true);
    setEditingId(null);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleStartEdit = (id: string) => {
    setEditingId(id);
    setIsAdding(false);
    if (!expandedItems.includes(id)) {
      setExpandedItems([...expandedItems, id]);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    await onDelete?.(id);
    remove(items.findIndex((item) => item.id === id));
  };

  const handleSaveNew = async (values: Omit<T, "id" | "user_id" | "created_at" | "updated_at">) => {
    await onAdd?.(values);
    setIsAdding(false);
  };

  const handleSaveEdit = async (values: T) => {
    await onUpdate?.(values);
    const index = items.findIndex((item) => item.id === values.id);
    if (index !== -1) {
      update(index, values);
    }
    setEditingId(null);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && <div className="flex size-10 items-center justify-center rounded-lg bg-white/5">{icon}</div>}
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {description && <p className="text-sm text-gray-400">{description}</p>}
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleStartAdd}
          disabled={!canAddMore || isAdding || isLoading}
          className="gap-1.5"
        >
          <RiAddLine className="size-4" />
          Add
        </Button>
      </div>

      {/* Add New Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <ItemForm<T>
              fields={fields}
              initialValues={createEmptyItem() as any}
              validationSchema={validationSchema}
              onSubmit={handleSaveNew}
              onCancel={handleCancelAdd}
              submitLabel="Add"
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Items List */}
      {items.length > 0 ? (
        <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems} className="space-y-2">
          <AnimatePresence initial={false}>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
                layout
              >
                <AccordionItem value={item.id} className="rounded-lg border border-white/10 bg-white/5 px-4">
                  <div className="flex items-center gap-2">
                    {/* Drag Handle & Reorder Buttons */}
                    <div className="flex flex-col gap-0.5 py-2">
                      <button
                        type="button"
                        onClick={() => moveUp(index)}
                        disabled={!canMoveUp(index)}
                        className="rounded p-0.5 text-gray-500 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30"
                      >
                        <RiArrowUpLine className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveDown(index)}
                        disabled={!canMoveDown(index)}
                        className="rounded p-0.5 text-gray-500 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30"
                      >
                        <RiArrowDownLine className="size-3.5" />
                      </button>
                    </div>

                    {/* Item Header */}
                    <AccordionTrigger className="flex-1 hover:no-underline">
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-white">{getItemTitle(item)}</span>
                        {getItemSubtitle && <span className="text-sm text-gray-400">{getItemSubtitle(item)}</span>}
                      </div>
                    </AccordionTrigger>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartEdit(item.id);
                        }}
                        className="rounded p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <RiEditLine className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="rounded p-1.5 text-gray-400 transition-colors hover:bg-red-500/20 hover:text-red-400"
                      >
                        <RiDeleteBinLine className="size-4" />
                      </button>
                    </div>
                  </div>

                  <AccordionContent>
                    {editingId === item.id ? (
                      <ItemForm<T>
                        fields={fields}
                        initialValues={item}
                        validationSchema={validationSchema}
                        onSubmit={handleSaveEdit as any}
                        onCancel={handleCancelEdit}
                        submitLabel="Save"
                        isLoading={isLoading}
                      />
                    ) : (
                      <ItemPreview item={item} fields={fields} />
                    )}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </Accordion>
      ) : (
        !isAdding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-lg border border-dashed border-white/10 py-12 text-center"
          >
            {icon && <div className="mx-auto mb-4 w-fit text-gray-600">{icon}</div>}
            <p className="text-gray-400">{emptyState?.title || `No ${title.toLowerCase()} added yet`}</p>
            <p className="mt-1 text-sm text-gray-500">
              {emptyState?.description || `Click "Add" to add your first ${title.toLowerCase().slice(0, -1)}`}
            </p>
          </motion.div>
        )
      )}

      {maxItems && (
        <p className="text-xs text-gray-500">
          {items.length} / {maxItems} items
        </p>
      )}
    </div>
  );
};

interface ItemFormProps<T> {
  fields: FieldConfig[];
  initialValues: T;
  validationSchema?: Yup.ObjectSchema<any>;
  onSubmit: (values: T) => void | Promise<void>;
  onCancel: () => void;
  submitLabel: string;
  isLoading?: boolean;
}

const ItemForm = <T extends object>({
  fields,
  initialValues,
  validationSchema,
  onSubmit,
  onCancel,
  submitLabel,
  isLoading,
}: ItemFormProps<T>) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // Convert date fields to ISO format before submitting
      const processedValues = { ...values } as Record<string, unknown>;
      fields.forEach((field) => {
        if (field.type === "date" && processedValues[field.name]) {
          processedValues[field.name] = toISODate(processedValues[field.name] as string | Date);
        }
      });
      await onSubmit(processedValues as T);
    },
  });

  const getError = (name: string) => {
    const touched = formik.touched as Record<string, boolean>;
    const errors = formik.errors as Record<string, string>;
    return touched[name] && errors[name] ? { touched: true, message: errors[name] } : undefined;
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={cn(field.fullWidth && "sm:col-span-2")}>
            {field.type === "textarea" ? (
              <div className="space-y-0.5">
                <label className="text-sm font-medium text-gray-400">
                  {field.label}
                  {field.required && <span className="ml-1 text-red-500">*</span>}
                </label>
                <Textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  value={(formik.values as any)[field.name] || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="min-h-[100px] border-white/10 bg-transparent"
                />
                {getError(field.name) && <span className="text-xs text-red-500">{getError(field.name)?.message}</span>}
              </div>
            ) : field.type === "tags" ? (
              <TagsInput
                label={field.label}
                name={field.name}
                value={(formik.values as any)[field.name] || []}
                onChange={(tags) => formik.setFieldValue(field.name, tags)}
                placeholder={field.placeholder}
                required={field.required}
                error={getError(field.name)}
              />
            ) : (
              <Input
                name={field.name}
                label={field.label}
                type={field.type === "select" ? "text" : field.type}
                placeholder={field.placeholder}
                required={field.required}
                value={
                  field.type === "date"
                    ? toInputDate((formik.values as any)[field.name])
                    : (formik.values as any)[field.name] || ""
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={getError(field.name)}
                helperText={field.helperText}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={isLoading}>
          <RiCloseLine className="mr-1 size-4" />
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={isLoading || !formik.isValid}>
          <RiCheckLine className="mr-1 size-4" />
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

interface TagsInputProps {
  label: string;
  name: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  required?: boolean;
  error?: { touched?: boolean; message?: string };
}

const TagsInput = ({ label, value, onChange, placeholder, required, error }: TagsInputProps) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = inputValue.trim();
      if (tag && !value.includes(tag)) {
        onChange([...value, tag]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-0.5">
      <label className="text-sm font-medium text-gray-400">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <div className="focus-within:border-primary-400 flex min-h-9 flex-wrap items-center gap-1.5 border border-white/10 bg-transparent px-3 py-1.5 transition-colors">
        {value.map((tag) => (
          <span key={tag} className="flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-sm text-white">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="text-gray-400 hover:text-white">
              <RiCloseLine className="size-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          className="min-w-[100px] flex-1 border-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
        />
      </div>
      {error?.touched && error?.message && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
};

interface ItemPreviewProps<T> {
  item: T;
  fields: FieldConfig[];
}

const ItemPreview = <T extends object>({ item, fields }: ItemPreviewProps<T>) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {fields.map((field) => {
        const value = (item as any)[field.name];
        if (!value || (Array.isArray(value) && value.length === 0)) return null;

        return (
          <div key={field.name} className={cn(field.fullWidth && "sm:col-span-2")}>
            <p className="text-xs font-medium text-gray-500">{field.label}</p>
            {field.type === "tags" && Array.isArray(value) ? (
              <div className="mt-1 flex flex-wrap gap-1">
                {value.map((tag: string) => (
                  <span key={tag} className="rounded bg-white/10 px-2 py-0.5 text-xs text-white">
                    {tag}
                  </span>
                ))}
              </div>
            ) : field.type === "date" ? (
              <p className="text-sm text-white">
                {new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            ) : (
              <p className="text-sm text-white">{value}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};
