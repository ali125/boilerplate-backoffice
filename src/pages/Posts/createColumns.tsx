import Image from "@/components/base/Image";
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
      id: "imageUrl",
      label: t("general.image"),
      align: "center",
      render: (imageUrl) => <Image className="w-16 object-cover" src={`${import.meta.env.VITE_BASE_URL}${imageUrl}`} />
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
      id: "category",
      label: t("post.category"),
      align: "left",
      sortable: true,
      render: (category) => category?.title
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