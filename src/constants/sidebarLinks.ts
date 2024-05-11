import { SvgIconComponent } from "@mui/icons-material";
import SpeedIcon from "@mui/icons-material/Speed";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import GroupsIcon from "@mui/icons-material/Groups";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import SecurityIcon from "@mui/icons-material/Security";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SupportIcon from "@mui/icons-material/Support";
import SettingsIcon from "@mui/icons-material/Settings";
import { browserRoutes } from "./routes";
import { PermissionModules } from "@/@types/permission.type";

export type SidebarMenuItem = {
  id: string;
  label: string;
  icon: SvgIconComponent | null;
  path: string | null;
  isPublic: boolean;
  children?: SidebarMenuItem[];
};

export const createMenuItem = (
  id: SidebarMenuItem["id"],
  label: SidebarMenuItem["label"],
  icon: SidebarMenuItem["icon"],
  path: SidebarMenuItem["path"],
  isPublic: SidebarMenuItem["isPublic"],
  children?: SidebarMenuItem["children"]
) => ({
  id,
  label,
  icon,
  path,
  isPublic,
  children,
});

const SidebarLinks = [
  createMenuItem(
    "Dashboard",
    "sidebar.dashboard",
    SpeedIcon,
    browserRoutes.dashboard,
    true
  ),
  createMenuItem(
    PermissionModules.Post,
    "sidebar.posts",
    LibraryBooksIcon,
    browserRoutes.posts,
    false
  ),
  createMenuItem(
    PermissionModules.Category,
    "sidebar.categories",
    LibraryBooksIcon,
    browserRoutes.categories,
    false
  ),
  createMenuItem(
    PermissionModules.Tag,
    "sidebar.tags",
    LibraryBooksIcon,
    browserRoutes.tags,
    false
  ),
  createMenuItem(
    PermissionModules.User,
    "sidebar.users",
    GroupsIcon,
    browserRoutes.users,
    false
  ),
  createMenuItem(
    PermissionModules.Role,
    "sidebar.roles",
    AccessibilityIcon,
    browserRoutes.roles,
    false
  ),
  createMenuItem(
    PermissionModules.Permission,
    "sidebar.permissions",
    SecurityIcon,
    browserRoutes.permissions,
    false
  ),
  createMenuItem(
    "Finance",
    "sidebar.finance",
    AccountBalanceWalletIcon,
    browserRoutes.finance,
    true
  ),
  createMenuItem(
    "Faq",
    "sidebar.faq",
    HelpOutlineIcon,
    browserRoutes.faq,
    true
  ),
  createMenuItem(
    "Support",
    "sidebar.support",
    SupportIcon,
    browserRoutes.support,
    true
  ),
  createMenuItem(
    "Settings",
    "sidebar.settings",
    SettingsIcon,
    browserRoutes.settings,
    true
  ),
];

export default SidebarLinks;
