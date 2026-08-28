import ManagerLayout from "../manager/layout";

export default function ListingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ManagerLayout>{children}</ManagerLayout>;
}
