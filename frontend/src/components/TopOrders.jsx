import { useEffect, useState } from "react";
import { getAllEmployeeDetails } from "../services/employeeDetailsApi";
import { PencilLine, Trash } from "lucide-react";

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getAllEmployeeDetails();
                setEmployees(response.data);
            } catch (error) {
                console.error("Failed to fetch employee details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="rounded-2xl border shadow-sm bg-white">
            <div className="border-b px-6 py-4">
                <h2 className="text-lg font-semibold">Employee Details</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-xs sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Employee No</th>
                            <th className="px-6 py-3">Grade</th>
                            <th className="px-6 py-3">Position</th>
                            <th className="px-6 py-3">Warnings</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {employees.map((employee, index) => (
                            <tr key={employee._id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{employee.employee_number}</td>
                                <td className="px-6 py-4">{employee.grade}</td>
                                <td className="px-6 py-4">{employee.position}</td>
                                <td className="px-6 py-4">{employee.warning_count}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-x-3">
                                        <PencilLine size={18} className="text-blue-600 cursor-pointer" />
                                        <Trash size={18} className="text-red-600 cursor-pointer" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeTable;
