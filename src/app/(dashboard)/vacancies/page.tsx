"use client";

import { motion } from "framer-motion";
import { useFormik } from "formik";
import { toast } from "sonner";
import Link from "next/link";
import * as Yup from "yup";
import React from "react";
import {
  RiBriefcaseLine,
  RiAddLine,
  RiMapPinLine,
  RiTimeLine,
  RiUserLine,
  RiDeleteBin6Line,
  RiEditLine,
  RiEyeLine,
  RiCloseLine,
} from "@remixicon/react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetJobsByUserQuery, useCreateJobMutation, useDeleteJobMutation } from "@/api/job";
import { Pagination, ScrollArea } from "@/components/shared";
import type { CreateJobDto, EmploymentType } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/user";
import { CURRENCIES } from "@/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const schema = Yup.object({
  title: Yup.string().required("Title is required"),
  company: Yup.string().required("Company is required"),
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const PAGE_SIZE = 10;

const employmentTypes: { value: EmploymentType; label: string }[] = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "TEMPORARY", label: "Temporary" },
  { value: "INTERNSHIP", label: "Internship" },
];

const formatEmploymentType = (type: string) => {
  return type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const Page = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [deleteJobId, setDeleteJobId] = React.useState<string | null>(null);
  const [requirementInput, setRequirementInput] = React.useState("");
  const [page, setPage] = React.useState(1);
  const { user } = useUserStore();

  const { data, isLoading, refetch } = useGetJobsByUserQuery(
    { page, size: PAGE_SIZE },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true },
  );

  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

  const jobs = React.useMemo(() => data?.data.data || [], [data]);
  const total = data?.data.total_items || 0;

  const { handleChange, handleSubmit, resetForm, setFieldValue, values } = useFormik<CreateJobDto>({
    initialValues: {
      title: "",
      company: user?.company?.name || "",
      location: "",
      description: "",
      requirements: [],
      salary: {
        min: 0,
        max: 0,
        currency: "",
      },
      deadline: "",
      is_remote: false,
      employment_type: "FULL_TIME",
    },
    onSubmit: async (values) => {
      try {
        const payload: CreateJobDto = {
          ...values,
          deadline: new Date(values.deadline).toISOString(),
          requirements: values.requirements.filter((r) => r.trim() !== ""),
        };
        await createJob(payload).unwrap();
        toast.success("Job posted successfully");
        setIsCreateDialogOpen(false);
        setRequirementInput("");
        refetch();
      } catch {
        toast.error("Failed to create job");
      }
    },
    validationSchema: schema,
  });

  const handleDeleteJob = async () => {
    if (!deleteJobId) return;
    try {
      await deleteJob(deleteJobId).unwrap();
      toast.success("Job deleted successfully");
      setDeleteJobId(null);
      refetch();
    } catch {
      toast.error("Failed to delete job");
    }
  };

  React.useEffect(() => {
    if (!isCreateDialogOpen) {
      resetForm({
        values: {
          title: "",
          company: user?.company?.name || "",
          location: "",
          description: "",
          requirements: [],
          salary: {
            min: 0,
            max: 0,
            currency: "",
          },
          deadline: "",
          is_remote: false,
          employment_type: "FULL_TIME",
        },
      });
    }
  }, [isCreateDialogOpen]);

  const handleCreateDialogOpen = (open: boolean) => {
    if (!user?.company) {
      toast.error("Please create a company profile first");
      return;
    }
    if (!isCreating) {
      setIsCreateDialogOpen(open);
    }
  };

  return (
    <ScrollArea>
      <motion.div className="w-full space-y-6 pb-10" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">My Job Postings</h1>
            <p className="text-gray-400">Manage your job listings and view applications</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={handleCreateDialogOpen}>
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
                  <Input
                    label="Company Name"
                    name="company"
                    onChange={handleChange}
                    placeholder={user?.company?.name || "Your company name"}
                    readOnly
                    value={values.company}
                  />
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
                          {employmentTypes.map((type) => (
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
                      type="number"
                      placeholder="50000"
                      name="salary.min"
                      value={values.salary.min}
                      onChange={handleChange}
                    />
                    <Input
                      label="Max Salary"
                      type="number"
                      placeholder="80000"
                      name="salary.max"
                      value={values.salary.max}
                      onChange={handleChange}
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
                  <Button disabled={isCreating || !values.title || !values.description} type="submit">
                    {isCreating ? "Creating..." : "Create Job"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-48 animate-pulse bg-white/5" />
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <>
            <motion.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  className="group border border-white/10 bg-white/5 p-5 transition-all hover:border-white/20 hover:bg-white/10"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="line-clamp-1 font-semibold text-white">{job.title}</h3>
                    <Badge className="shrink-0">{formatEmploymentType(job.employment_type)}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <RiMapPinLine className="size-4 shrink-0" />
                      <span className="line-clamp-1">{job.is_remote ? "Remote" : job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RiUserLine className="size-4 shrink-0" />
                      <span>{job.applications?.length || 0} applications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RiTimeLine className="size-4 shrink-0" />
                      <span>Posted {new Date(job.posted_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {job.salary && (
                    <div className="mt-3 border-t border-white/10 pt-3">
                      <p className="text-primary-400 text-sm font-medium">
                        {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                      </p>
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={`/vacancies/${job.id}`}>
                        <RiEyeLine className="mr-1 size-3" />
                        View
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={`/vacancies/${job.id}?edit=true`}>
                        <RiEditLine className="mr-1 size-3" />
                        Edit
                      </Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setDeleteJobId(job.id)}>
                      <RiDeleteBin6Line className="size-3" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {total > PAGE_SIZE && (
              <motion.div variants={itemVariants}>
                <Pagination current={page} limit={PAGE_SIZE} total={total} onPageChange={setPage} className="mt-6" />
              </motion.div>
            )}
          </>
        ) : (
          <motion.div variants={itemVariants} className="py-16 text-center">
            <RiBriefcaseLine className="mx-auto size-16 text-gray-600" />
            <h3 className="mt-4 text-lg font-semibold text-white">No job postings yet</h3>
            <p className="mt-2 text-gray-400">Create your first job posting to start receiving applications</p>
            <Button className="mt-6" onClick={() => handleCreateDialogOpen(true)}>
              <RiAddLine className="mr-2 size-4" />
              Post Your First Job
            </Button>
          </motion.div>
        )}
        <Dialog open={!!deleteJobId} onOpenChange={() => setDeleteJobId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Job Posting</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this job posting? This action cannot be undone and all applications will
                be lost.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDeleteJob} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete Job"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
