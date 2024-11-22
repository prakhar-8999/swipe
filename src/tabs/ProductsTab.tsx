import {useSelector} from "react-redux";
import DataTable from "../components/DataTable";
import {RootState} from "../store";

export default function ProductsTab() {
  const products = useSelector((state: RootState) => state.products.items);

  const columns = [
    {key: "name", header: "Name"},
    {key: "quantity", header: "Quantity"},
    {
      key: "unitPrice",
      header: "Unit Price",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: "tax",
      header: "Tax",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: "priceWithTax",
      header: "Price with Tax",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: "discount",
      header: "Discount",
      render: (value?: number) => (value ? `${value}%` : "N/A"),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Products</h2>
      <DataTable data={products} columns={columns} />
    </div>
  );
}
