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
    id: "title",
    label: t("general.title"),
    align: "left",
    sortable: true
  },
  {
    id: "description",
    label: t("general.description"),
    align: "left",
    sortable: true,
    hidden: true
  },
  {
    id: "user",
    label: t("general.author"),
    align: "left",
    sortable: true,
    render: (user) => user?.fullName
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