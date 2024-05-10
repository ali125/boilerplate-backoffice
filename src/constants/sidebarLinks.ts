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

export type SidebarMenuItem = {
  id: string;
  label: string;
  icon: SvgIconComponent | null;
  path: string | null;
  children?: SidebarMenuItem[];
};

export const createMenuItem = (
  id: SidebarMenuItem["id"],
  label: SidebarMenuItem["label"],
  icon: SidebarMenuItem["icon"],
  path: SidebarMenuItem["path"],
  children?: SidebarMenuItem["children"]
) => ({
  id,
  label,
  icon,
  path,
  children,
});

const SidebarLinks = [
  createMenuItem(
    "dashboard",
    "sidebar.dashboard",
    SpeedIcon,
    browserRoutes.dashboard
  ),
  createMenuItem(
    "posts",
    "sidebar.posts",
    LibraryBooksIcon,
    browserRoutes.posts
  ),
  createMenuItem(
    "categories",
    "sidebar.categories",
    LibraryBooksIcon,
    browserRoutes.categories
  ),
  createMenuItem("tags", "sidebar.tags", LibraryBooksIcon, browserRoutes.tags),
  createMenuItem("users", "sidebar.users", GroupsIcon, browserRoutes.users),
  createMenuItem(
    "roles",
    "sidebar.roles",
    AccessibilityIcon,
    browserRoutes.roles
  ),
  createMenuItem(
    "permissions",
    "sidebar.permissions",
    SecurityIcon,
    browserRoutes.permissions
  ),
  createMenuItem(
    "finance",
    "sidebar.finance",
    AccountBalanceWalletIcon,
    browserRoutes.finance
  ),
  createMenuItem("faq", "sidebar.faq", HelpOutlineIcon, browserRoutes.faq),
  createMenuItem(
    "support",
    "sidebar.support",
    SupportIcon,
    browserRoutes.support
  ),
  createMenuItem(
    "settings",
    "sidebar.settings",
    SettingsIcon,
    browserRoutes.settings
  ),
];

export default SidebarLinks;
