import type { TRole } from "@/types";

const redirectByRole = (role: TRole) => {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "RECEIVER":
      return "/receiver";
    case "SENDER":
      return "/sender";
    default:
      return "/";
  }
};

export default redirectByRole;
