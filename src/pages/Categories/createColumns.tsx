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
    id: "slug",
    label: t("category.slug"),
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
    id: "parent",
    label: t("category.parent"),
    align: "left",
    sortable: true,
    render: (parent) => parent?.title
  },
  {
    id: "user",
    label: t("general.author"),
    align: "left",
    sortable: true,
    render: (user) => user.fullName
  },
  {
    id: "status",
    label: t("general.status"),
    align: "center",
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