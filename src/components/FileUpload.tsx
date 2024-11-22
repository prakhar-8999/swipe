import {Spin} from "antd";
import {Upload} from "lucide-react";
import {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {
  extractDataFromExcel,
  extractDataFromImage,
  extractDataFromPDF,
} from "../services/aiService";
import {addCustomer} from "../store/slices/customersSlice";
import {addInvoice} from "../store/slices/invoicesSlice";
import {addProduct} from "../store/slices/productsSlice";

export default function FileUpload() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const processFile = async (file: File) => {
    setLoading(true);
    try {
      let data;
      if (file.type.includes("image")) {
        data = await extractDataFromImage(file);
      } else if (file.type === "application/pdf") {
        data = await extractDataFromPDF(file);
      } else if (
        file.type.includes("spreadsheet") ||
        file.type.includes("excel")
      ) {
        data = await extractDataFromExcel(file);
      } else {
        throw new Error("Unsupported file type");
      }

      const id = Math.random().toString(36).substr(2, 9);

      if (data.invoice) {
        dispatch(addInvoice({...data.invoice, id}));
      }
      if (data.product) {
        dispatch(addProduct({...data.product, id}));
      }
      if (data.customer) {
        dispatch(addCustomer({...data.customer, id}));
      }

      toast.success("File processed successfully");
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Error processing file. Please try again.");
    }

    setLoading(false);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(processFile);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
  });

  return (
    <Spin spinning={loading}>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop files here, or click to select files"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Supports PDF, Excel, and image files
        </p>
      </div>
    </Spin>
  );
}
