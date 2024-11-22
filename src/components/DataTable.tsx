import React from "react";
import {ValidationError} from "../types";

interface Column {
  key: string;
  header: string;
  render?: (value: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  validationErrors?: Record<string, ValidationError[]>;
}

export default function DataTable({
  data,
  columns,
  validationErrors,
}: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((column) => {
                const value = row[column.key];
                const errors = validationErrors?.[`${row.id}-${column.key}`];

                return (
                  <td
                    key={column.key}
                    className={`px-6 py-4 whitespace-nowrap ${
                      errors ? "bg-red-50" : ""
                    }`}
                  >
                    <div className="relative">
                      {column.render ? column.render(value) : value}
                      {errors && (
                        <div className="absolute top-0 right-0">
                          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                            !
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
