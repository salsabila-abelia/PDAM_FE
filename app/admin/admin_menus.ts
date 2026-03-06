import { url } from "inspector";
import {
  Home,
  UserPen,
  User,
  Users,
  Toolbox,
  Receipt,
  Banknote,
} from "lucide-react";

// Menu items.
export const items = [
  {
    title: "Home",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "My Profile",
    url: "/admin/profile",
    icon: UserPen,
  },
  {
    title: "Admin Data",
    url: "/admin/admin",
    icon: User,
  },
  {
    title: "Customer Data",
    url: "/admin/customers",
    icon: Users,
  },
  {
    title: "Services",
    url: "/admin/services",
    icon: Toolbox,
  },
  {
    title: "Bill",
    url: "#",
    icon: Receipt,
  },
  {
    title: "Payments",
    url: "#",
    icon: Banknote,
  },
];
