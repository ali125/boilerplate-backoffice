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
    id: "module",
    label: t("permission.module"),
    align: "left",
    sortable: true
  },
  {
    id: "action",
    label: t("permission.action"),
    align: "left",
    sortable: true
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