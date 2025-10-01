import React from "react";

import { DataTable, DatePicker, Footer, Navbar, Pagination, Seo } from "@/components/shared";
import { type JobPagination, useGetJobsQuery } from "@/api/job";
import { columns } from "@/config/columns/job";
import { COUNTRIES } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialParams: JobPagination = {
  company: "",
  employment_type: "",
  is_remote: false,
  location: "",
  posted_date: "",
  requirement: "",
  salary: "",
};

const Page = () => {
  const [params, setParams] = React.useState(initialParams);
  const [page, setPage] = React.useState(1);

  const { employment_type, is_remote, location, posted_date } = params;

  const handleChange = <K extends keyof JobPagination>(name: K, value: JobPagination[K]) => {
    setParams((params) => ({ ...params, [name]: value }));
  };

  const { data: jobs } = useGetJobsQuery(
    { page, size: 10, employment_type, is_remote, location, posted_date },
    { refetchOnMountOrArgChange: true },
  );

  return (
    <>
      <Seo title="Jobs" />
      <Navbar />
      <div className="container mx-auto space-y-10 py-10 md:space-y-20 md:py-40">
        <div className="">
          <h2 className="text-secondary-400 text-4xl font-bold">Job Listings</h2>
          <p className="">Find the perfect team for you</p>
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <DatePicker
            onSelect={(value) =>
              handleChange("posted_date", value ? new Date(value).toISOString() : undefined)
            }
            placeholder="Select posted date"
            selected={posted_date ? new Date(posted_date) : undefined}
          />
          <Select onValueChange={(value) => handleChange("location", value)} value={location}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DataTable columns={columns} data={jobs?.data.data || []} />
        <Pagination
          current={page}
          limit={10}
          onPageChange={setPage}
          total={jobs?.data.total_items || 0}
        />
      </div>
      <Footer />
    </>
  );
};

export default Page;
