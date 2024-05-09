import { TableHeadItemType } from "@/components/common/Table/TableHead/TableHead.interface";
import { TFunction } from "i18next";

type Props = (t: TFunction<"translation", undefined>) => TableHeadItemType[];

export const createColumns: Props = (t) => [
  {
    id: "id",
    label: "ID",
    align: "left",
    hidden: true,
    sortable: true
  },
  {
    id: "fullName",
    label: t("user.fullName"),
    align: "left",
    sortable: true
  },
  {
    id: "email",
    label: t("user.email"),
    align: "left",
    sortable: true,
  },
  {
    id: "mobile",
    label: t("user.mobile"),
    align: "left",
    hidden: true,
    sortable: true,
  },
  {
    id: "role",
    label: t("user.role"),
    align: "left",
    sortable: true,
    render: (role) => role?.title
  },
  {
    id: "user",
    label: t("user.creator"),
    align: "left",
    hidden: true,
    sortable: true,
    render: (user) => user?.fullName
  },
  {
    id: "status",
    label: t("general.status"),
    align: "left",
    sortable: true,
  },
  {
    id: "createdAt",
    label: t("general.createdAt"),
    align: "left",
    sortable: true,
  },
  {
    id: "updatedAt",
    label: t("general.lastUpdate"),
    align: "left",
    sortable: true,
    hidden: true
  },
];