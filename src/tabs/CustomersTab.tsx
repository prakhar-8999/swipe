import {useSelector} from "react-redux";
import DataTable from "../components/DataTable";
import {RootState} from "../store";

export default function CustomersTab() {
  const customers = useSelector((state: RootState) => state.customers.items);

  const columns = [
    {key: "name", header: "Customer Name"},
    {key: "phoneNumber", header: "Phone Number"},
    {
      key: "totalPurchaseAmount",
      header: "Total Purchase Amount",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {key: "email", header: "Email", render: (value?: string) => value || "N/A"},
    {
      key: "address",
      header: "Address",
      render: (value?: string) => value || "N/A",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Customers</h2>
      <DataTable data={customers} columns={columns} />
    </div>
  );
}
