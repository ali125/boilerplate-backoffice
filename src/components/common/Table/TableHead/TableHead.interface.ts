import { FilterOperatorTypes } from "../TableControl/TableControlFilter/TableControlFilter";

export interface TableHeadItemType {
  id: string | number;
  label: string | React.ReactNode;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  sortable?: boolean;
  className?: string;
  hidden?: boolean;
  disabledFilter?: boolean;
  filterOperators?: FilterOperatorTypes[];
  render?: (value: any, row?: any) => string | React.ReactNode;
}

export type ActionItemType = {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: (row: any) => void;
  href?: string | null | ((row: any) => string | null);
  target?: React.HTMLAttributeAnchorTarget;
};

export type ExtraItemControl = {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string | null;
  target?: React.HTMLAttributeAnchorTarget;
};

export type ActionsType = ActionItemType[];
