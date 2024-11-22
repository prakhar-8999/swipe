import {useSelector} from "react-redux";
import DataTable from "../components/DataTable";
import {RootState} from "../store";

export default function InvoicesTab() {
  const invoices = useSelector((state: RootState) => state.invoices.items);

  const columns = [
    {key: "serialNumber", header: "Serial Number"},
    {key: "customerName", header: "Customer Name"},
    {key: "productName", header: "Product Name"},
    {key: "quantity", header: "Quantity"},
    {
      key: "tax",
      header: "Tax",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: "totalAmount",
      header: "Total Amount",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: "date",
      header: "Date",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Invoices</h2>
      <DataTable data={invoices} columns={columns} />
    </div>
  );
}
