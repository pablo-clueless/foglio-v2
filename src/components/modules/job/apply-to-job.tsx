"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useApplyToJobMutation } from "@/api/job";
import { Button } from "@/components/ui/button";
import type { ApplyToJobDto } from "@/types";
import { useUserStore } from "@/store/user";
import { RiLoaderLine } from "@remixicon/react";

interface Props {
  jobId: string;
  buttonClassName?: string;
  buttonLabel?: string;
}

const schema = Yup.object({
  jobId: Yup.string().required("Job ID is required"),
  payload: Yup.object({
    applicant_id: Yup.string().required("Applicant ID is required"),
    cover_letter: Yup.string().required("Cover Letter is required"),
    notes: Yup.string().optional(),
  }),
});

export const ApplyToJob = ({ jobId, buttonClassName, buttonLabel = "Apply Now" }: Props) => {
  const { user } = useUserStore();

  const [] = useApplyToJobMutation();

  const [, { isLoading }] = useApplyToJobMutation();

  const { handleChange, handleSubmit, values } = useFormik<ApplyToJobDto>({
    initialValues: {
      job_id: jobId,
      payload: {
        applicant_id: String(user?.id),
        cover_letter: "",
        notes: "",
      },
    },
    onSubmit: () => {},
    validationSchema: schema,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={buttonClassName}>{buttonLabel}</Button>
      </DialogTrigger>
      <DialogContent className="min-h-[80dvh] rounded-none text-black sm:max-w-[650px]">
        <div className="">
          <DialogTitle className="">Apply To Job</DialogTitle>
          <DialogDescription>Apply to this job by filling out the form below.</DialogDescription>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Textarea
            className="h-96"
            label="Cover Letter"
            name="payload.cover_letter"
            onChange={handleChange}
            required
            value={values.payload.cover_letter}
          />
          <Textarea
            className="h-40"
            label="Notes"
            name="payload.notes"
            onChange={handleChange}
            value={values.payload.notes}
          />
          <div className="flex w-full items-center justify-end">
            <Button size="sm" type="submit">
              {isLoading ? <RiLoaderLine className="animate-spin" /> : "Apply"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
