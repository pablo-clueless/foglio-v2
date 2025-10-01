import type { ColumnDef } from "@tanstack/react-table";

import type { JobProps } from "@/types";
import { format } from "date-fns";

export const columns: ColumnDef<JobProps>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "employment_type",
    header: "Employment Type",
  },
  {
    accessorKey: "posted_date",
    header: "Posted On",
    cell: ({ row }) => <p>{format(row.original.posted_date, "dd/MM/yyyy")}</p>,
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => <p>{format(row.original.deadline, "dd/MM/yyyy")}</p>,
  },
  {
    accessorKey: "created_by_user",
    header: "Posted By",
    cell: ({ row }) => <p>{row.original.created_by_user.name}</p>,
  },
  {
    id: "actions",
    header: "",
  },
];
