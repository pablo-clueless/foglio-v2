"use client";

import { RiAddLine, RiCloseLine } from "@remixicon/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CreateJobDto, EmploymentType } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/user";
import { formatCurrencyValue } from "@/lib";
import { CURRENCIES } from "@/constants";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  isLoading: boolean;
  onCreateJob: (payload: CreateJobDto) => Promise<void>;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  refetch: () => void;
}

const schema = Yup.object({
  title: Yup.string().required("Title is required"),
  company_id: Yup.string().required("Company is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
  requirements: Yup.array().of(Yup.string().required("Requirement is required")),
  salary: Yup.object({
    min: Yup.number().required("Minimum salary is required"),
    max: Yup.number().required("Maximum salary is required"),
    currency: Yup.string().required("Currency is required"),
  }),
  deadline: Yup.date().required("Deadline is required"),
  is_remote: Yup.boolean().required("Remote is required"),
  employment_type: Yup.string().required("Employment type is required"),
});

const EMPLOYMENT_TYPES: { value: EmploymentType; label: string }[] = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "TEMPORARY", label: "Temporary" },
  { value: "INTERNSHIP", label: "Internship" },
];

export const CreateJob = ({ isLoading, onCreateJob, onOpenChange, open, refetch }: Props) => {
  const [requirementInput, setRequirementInput] = React.useState("");
  const { user } = useUserStore();

  const { handleChange, handleSubmit, setFieldValue, values } = useFormik<CreateJobDto>({
    initialValues: {
      title: "",
      company_id: user?.company?.id || "",
      location: "",
      description: "",
      requirements: [],
      salary: {
        min: 0,
        max: 0,
        currency: "NGN",
      },
      deadline: "",
      is_remote: false,
      employment_type: "FULL_TIME",
    },
    onSubmit: (values) => {
      const payload: CreateJobDto = {
        ...values,
        deadline: new Date(values.deadline).toISOString(),
      };
      onCreateJob(payload);
      setRequirementInput("");
      refetch();
    },
    validationSchema: schema,
  });

  return (
    <Dialog onOpenChange={(open) => !isLoading && onOpenChange(open)} open={open}>
      <DialogTrigger asChild>
        <Button>
          <RiAddLine className="mr-2 size-4" />
          Post New Job
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto text-black sm:max-w-2xl">
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Job Posting</DialogTitle>
            <DialogDescription>Fill in the details to create a new job listing</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              label="Job Title"
              placeholder="e.g. Senior Frontend Developer"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
            <Input label="Company Name" name="company" readOnly value={user?.company?.name || ""} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Location"
                placeholder="e.g. San Francisco, CA"
                name="location"
                value={values.location}
                onChange={handleChange}
              />
              <div className="space-y-2">
                <Label>Employment Type</Label>
                <Select
                  value={values.employment_type}
                  onValueChange={(value) => setFieldValue("employment_type", value as EmploymentType)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="text-black">
                    {EMPLOYMENT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Textarea
              label="Job Description"
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              name="description"
              value={values.description}
              onChange={handleChange}
              className="min-h-[120px]"
            />
            <div className="space-y-2">
              <Label>Requirements</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. 5+ years of experience with React"
                  value={requirementInput}
                  onChange={(e) => setRequirementInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && requirementInput.trim()) {
                      e.preventDefault();
                      setFieldValue("requirements", [...values.requirements, requirementInput.trim()]);
                      setRequirementInput("");
                    }
                  }}
                  wrapperClassName="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (requirementInput.trim()) {
                      setFieldValue("requirements", [...values.requirements, requirementInput.trim()]);
                      setRequirementInput("");
                    }
                  }}
                >
                  <RiAddLine className="size-4" />
                </Button>
              </div>
              {values.requirements.length > 0 && (
                <div className="mt-2 space-y-2">
                  {values.requirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 rounded border border-gray-200 bg-gray-50 px-3 py-2"
                    >
                      <span className="text-sm">{req}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newReqs = values.requirements.filter((_, i) => i !== index);
                          setFieldValue("requirements", newReqs);
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <RiCloseLine className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Input
                label="Min Salary"
                type="text"
                inputMode="numeric"
                placeholder="50,000"
                name="salary.min"
                value={formatCurrencyValue(values.salary.min)}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/,/g, "");
                  const numValue = rawValue === "" ? 0 : Number(rawValue);
                  if (!isNaN(numValue)) {
                    setFieldValue("salary.min", numValue);
                  }
                }}
              />
              <Input
                label="Max Salary"
                type="text"
                inputMode="numeric"
                placeholder="80,000"
                name="salary.max"
                value={formatCurrencyValue(values.salary.max)}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/,/g, "");
                  const numValue = rawValue === "" ? 0 : Number(rawValue);
                  if (!isNaN(numValue)) {
                    setFieldValue("salary.max", numValue);
                  }
                }}
              />
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select
                  value={values.salary.currency}
                  onValueChange={(value) => setFieldValue("salary.currency", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="text-black">
                    {CURRENCIES.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Input
              label="Application Deadline"
              type="date"
              name="deadline"
              value={values.deadline}
              onChange={handleChange}
            />
            <div className="flex items-center gap-3">
              <Switch
                id="is_remote"
                checked={values.is_remote}
                onCheckedChange={(checked) => setFieldValue("is_remote", checked)}
              />
              <Label htmlFor="is_remote">Remote position</Label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isLoading || !values.title || !values.description} type="submit">
              {isLoading ? "Creating..." : "Create Job"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
