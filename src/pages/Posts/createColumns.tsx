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
      label: t("post.slug"),
      align: "left",
      sortable: true
    },
    {
      id: "description",
      label: t("general.description"),
      align: "left",
      sortable: true
    }
];