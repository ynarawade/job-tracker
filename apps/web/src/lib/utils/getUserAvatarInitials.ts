export const getDisplayName = (first_name?: string | null) => {
  if (!first_name) return "User";
  return first_name.trim();
};

export const getInitials = (
  first_name?: string | null,
  last_name?: string | null
) => {
  const first = first_name?.trim()[0] ?? "";
  const last = last_name?.trim()[0] ?? "";

  const initials = (first + last).toUpperCase();

  return initials || "?";
};
