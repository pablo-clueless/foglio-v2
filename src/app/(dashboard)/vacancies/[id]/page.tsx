"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import React from "react";
import {
  RiArrowLeftLine,
  RiBriefcaseLine,
  RiMapPinLine,
  RiTimeLine,
  RiUserLine,
  RiCheckLine,
  RiCloseLine,
  RiCalendarLine,
  RiMoneyDollarCircleLine,
  RiEditLine,
  RiFileTextLine,
  RiMailLine,
} from "@remixicon/react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { EmploymentType, JobApplicationProps } from "@/types";
import { Pagination, ScrollArea } from "@/components/shared";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetApplicationsForJobQuery,
  useGetJobQuery,
  useUpdateJobMutation,
  useAcceptApplicationMutation,
  useRejectApplicationMutation,
} from "@/api/job";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

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

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "accepted":
      return (
        <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
          <RiCheckLine className="size-3" />
          Accepted
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="destructive" className="border-red-500/30 bg-red-500/20 text-red-400">
          <RiCloseLine className="size-3" />
          Rejected
        </Badge>
      );
    default:
      return (
        <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">
          <RiTimeLine className="size-3" />
          Pending
        </Badge>
      );
  }
};

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const isEditMode = searchParams.get("edit") === "true";

  const [page, setPage] = React.useState(1);
  const [isEditing, setIsEditing] = React.useState(isEditMode);
  const [actionDialog, setActionDialog] = React.useState<{
    type: "accept" | "reject";
    application: JobApplicationProps;
  } | null>(null);
  const [actionReason, setActionReason] = React.useState("");

  const {
    data: jobData,
    isLoading: isLoadingJob,
    refetch: refetchJob,
  } = useGetJobQuery(id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  const {
    data: applicationsData,
    isLoading: isLoadingApplications,
    refetch: refetchApplications,
  } = useGetApplicationsForJobQuery(
    { id, params: { page, size: PAGE_SIZE } },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true, skip: !id },
  );

  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const [acceptApplication, { isLoading: isAccepting }] = useAcceptApplicationMutation();
  const [rejectApplication, { isLoading: isRejecting }] = useRejectApplicationMutation();

  const job = jobData?.data;
  const applications = React.useMemo(() => applicationsData?.data.data || [], [applicationsData]);
  const totalApplications = applicationsData?.data.total_items || 0;

  const [editForm, setEditForm] = React.useState({
    title: "",
    description: "",
    requirements: "",
    salary_min: "",
    salary_max: "",
    deadline: "",
    is_remote: false,
    employment_type: "FULL_TIME" as EmploymentType,
  });

  React.useEffect(() => {
    if (job) {
      setEditForm({
        title: job.title,
        description: job.description,
        requirements: job.requirements?.join("\n") || "",
        salary_min: job.salary?.min?.toString() || "",
        salary_max: job.salary?.max?.toString() || "",
        deadline: job.deadline ? new Date(job.deadline).toISOString().split("T")[0] : "",
        is_remote: job.is_remote,
        employment_type: job.employment_type,
      });
    }
  }, [job]);

  const handleUpdateJob = async () => {
    if (!job) return;
    try {
      await updateJob({
        id: job.id,
        payload: {
          title: editForm.title,
          description: editForm.description,
          requirements: editForm.requirements.split("\n").filter((r) => r.trim()),
          salary: editForm.salary_min ? Number(editForm.salary_min) : undefined,
          deadline: editForm.deadline || undefined,
          is_remote: editForm.is_remote,
          employment_type: editForm.employment_type,
        },
      }).unwrap();
      toast.success("Job updated successfully");
      setIsEditing(false);
      router.replace(`/vacancies/${id}`);
      refetchJob();
    } catch {
      toast.error("Failed to update job");
    }
  };

  const handleApplicationAction = async () => {
    if (!actionDialog) return;
    try {
      if (actionDialog.type === "accept") {
        await acceptApplication({ id: actionDialog.application.id, reason: actionReason }).unwrap();
        toast.success("Application accepted");
      } else {
        await rejectApplication({ id: actionDialog.application.id, reason: actionReason }).unwrap();
        toast.success("Application rejected");
      }
      setActionDialog(null);
      setActionReason("");
      refetchApplications();
    } catch {
      toast.error(`Failed to ${actionDialog.type} application`);
    }
  };

  if (isLoadingJob) {
    return (
      <ScrollArea>
        <div className="space-y-6 pb-10">
          <div className="h-8 w-48 animate-pulse bg-white/5" />
          <div className="h-64 animate-pulse bg-white/5" />
          <div className="h-96 animate-pulse bg-white/5" />
        </div>
      </ScrollArea>
    );
  }

  if (!job) {
    return (
      <ScrollArea>
        <div className="py-16 text-center">
          <RiBriefcaseLine className="mx-auto size-16 text-gray-600" />
          <h3 className="mt-4 text-lg font-semibold text-white">Job not found</h3>
          <p className="mt-2 text-gray-400">This job posting may have been deleted or does not exist</p>
          <Button asChild className="mt-6">
            <Link href="/vacancies">Back to My Jobs</Link>
          </Button>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea>
      <motion.div className="w-full space-y-6 pb-10" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/vacancies">
              <RiArrowLeftLine className="mr-2 size-4" />
              Back to Jobs
            </Link>
          </Button>
        </motion.div>

        {isEditing ? (
          <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Edit Job Posting</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
            <div className="grid gap-4">
              <Input
                label="Job Title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Employment Type</Label>
                  <Select
                    value={editForm.employment_type}
                    onValueChange={(value) => setEditForm({ ...editForm, employment_type: value as EmploymentType })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {employmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  label="Application Deadline"
                  type="date"
                  value={editForm.deadline}
                  onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}
                />
              </div>
              <Textarea
                label="Job Description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="min-h-[150px]"
              />
              <Textarea
                label="Requirements (one per line)"
                value={editForm.requirements}
                onChange={(e) => setEditForm({ ...editForm, requirements: e.target.value })}
                className="min-h-[100px]"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Min Salary"
                  type="number"
                  value={editForm.salary_min}
                  onChange={(e) => setEditForm({ ...editForm, salary_min: e.target.value })}
                />
                <Input
                  label="Max Salary"
                  type="number"
                  value={editForm.salary_max}
                  onChange={(e) => setEditForm({ ...editForm, salary_max: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  id="edit_is_remote"
                  checked={editForm.is_remote}
                  onCheckedChange={(checked) => setEditForm({ ...editForm, is_remote: checked })}
                />
                <Label htmlFor="edit_is_remote">Remote position</Label>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateJob} disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-white">{job.title}</h1>
                  <Badge>{formatEmploymentType(job.employment_type)}</Badge>
                </div>
                <p className="text-lg text-gray-400">{job.company}</p>
              </div>
              <Button onClick={() => setIsEditing(true)}>
                <RiEditLine className="mr-2 size-4" />
                Edit Job
              </Button>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3 text-gray-400">
                <RiMapPinLine className="size-5" />
                <span>{job.is_remote ? "Remote" : job.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <RiUserLine className="size-5" />
                <span>{applications.length} applications</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <RiCalendarLine className="size-5" />
                <span>Posted {new Date(job.posted_date).toLocaleDateString()}</span>
              </div>
              {job.salary && (
                <div className="text-primary-400 flex items-center gap-3">
                  <RiMoneyDollarCircleLine className="size-5" />
                  <span>
                    {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-white">Description</h3>
                <p className="whitespace-pre-wrap text-gray-400">{job.description}</p>
              </div>
              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <h3 className="mb-2 font-semibold text-white">Requirements</h3>
                  <ul className="list-inside list-disc space-y-1 text-gray-400">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
              {job.deadline && (
                <div className="flex items-center gap-2 text-gray-400">
                  <RiTimeLine className="size-4" />
                  <span>Application deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <h2 className="mb-4 text-xl font-semibold text-white">Applications ({totalApplications})</h2>

          {isLoadingApplications ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 animate-pulse bg-white/5" />
              ))}
            </div>
          ) : applications.length > 0 ? (
            <>
              <div className="space-y-4">
                {applications.map((application) => (
                  <motion.div
                    key={application.id}
                    variants={itemVariants}
                    className="border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="font-semibold text-white">{application.applicant?.name || "Applicant"}</h3>
                          {getStatusBadge(application.status)}
                        </div>
                        <div className="space-y-1 text-sm text-gray-400">
                          {application.applicant?.email && (
                            <div className="flex items-center gap-2">
                              <RiMailLine className="size-4" />
                              <span>{application.applicant.email}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <RiCalendarLine className="size-4" />
                            <span>Applied {new Date(application.submission_date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        {application.cover_letter && (
                          <div className="mt-3">
                            <p className="mb-1 text-sm font-medium text-gray-300">Cover Letter</p>
                            <p className="line-clamp-3 text-sm text-gray-400">{application.cover_letter}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {application.resume && (
                          <Button asChild variant="outline" size="sm">
                            <a href={application.resume} target="_blank" rel="noopener noreferrer">
                              <RiFileTextLine className="mr-1 size-3" />
                              Resume
                            </a>
                          </Button>
                        )}
                        {application.status.toLowerCase() === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => setActionDialog({ type: "accept", application })}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <RiCheckLine className="mr-1 size-3" />
                              Accept
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setActionDialog({ type: "reject", application })}
                            >
                              <RiCloseLine className="mr-1 size-3" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    {application.notes && (
                      <div className="mt-3 border-t border-white/10 pt-3">
                        <p className="text-sm text-gray-400">
                          <span className="font-medium text-gray-300">Notes:</span> {application.notes}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {totalApplications > PAGE_SIZE && (
                <Pagination
                  current={page}
                  limit={PAGE_SIZE}
                  total={totalApplications}
                  onPageChange={setPage}
                  className="mt-6"
                />
              )}
            </>
          ) : (
            <div className="border border-white/10 bg-white/5 p-12 text-center">
              <RiUserLine className="mx-auto size-12 text-gray-600" />
              <h3 className="mt-4 font-semibold text-white">No applications yet</h3>
              <p className="mt-2 text-sm text-gray-400">
                Applications will appear here when candidates apply to this position
              </p>
            </div>
          )}
        </motion.div>

        <Dialog open={!!actionDialog} onOpenChange={() => setActionDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{actionDialog?.type === "accept" ? "Accept Application" : "Reject Application"}</DialogTitle>
              <DialogDescription>
                {actionDialog?.type === "accept"
                  ? "The applicant will be notified that their application has been accepted."
                  : "The applicant will be notified that their application has been rejected."}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                label="Message to applicant (optional)"
                placeholder={
                  actionDialog?.type === "accept"
                    ? "Congratulations! We would like to move forward with your application..."
                    : "Thank you for your interest. Unfortunately, we have decided to move forward with other candidates..."
                }
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={handleApplicationAction}
                disabled={isAccepting || isRejecting}
                className={actionDialog?.type === "accept" ? "bg-green-600 hover:bg-green-700" : ""}
                variant={actionDialog?.type === "reject" ? "destructive" : "default"}
              >
                {isAccepting || isRejecting
                  ? "Processing..."
                  : actionDialog?.type === "accept"
                    ? "Accept Application"
                    : "Reject Application"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
