import {useState} from "react";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUpload from "./components/FileUpload";
import Tabs from "./components/Tabs";
import {store} from "./store";
import CustomersTab from "./tabs/CustomersTab";
import InvoicesTab from "./tabs/InvoicesTab";
import ProductsTab from "./tabs/ProductsTab";

function App() {
  const [activeTab, setActiveTab] = useState("invoices");

  const tabs = [
    {
      id: "invoices",
      label: "Invoices",
      content: <InvoicesTab />,
    },
    {
      id: "products",
      label: "Products",
      content: <ProductsTab />,
    },
    {
      id: "customers",
      label: "Customers",
      content: <CustomersTab />,
    },
  ];

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Invoice Management System
            </h1>

            <div className="mb-8">
              <FileUpload />
            </div>

            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </Provider>
  );
}

export default App;
