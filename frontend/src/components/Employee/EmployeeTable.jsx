import { useEffect, useState } from "react";
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from "../../services/employeeApi";
import { PencilLine, Trash, Plus } from "lucide-react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import EmployeeForm from "./EmployeeForm";
import { format } from "date-fns";

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await getAllEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.error("Failed to fetch employees", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddEmployee = () => {
        setCurrentEmployee(null);
        setShowForm(true);
    };

    const handleEditEmployee = (employee) => {
        setCurrentEmployee(employee);
        setShowForm(true);
    };

    const handleDeleteEmployee = async (id) => {
        try {
            await deleteEmployee(id);
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const handleSubmit = async (data) => {
        try {
            if (currentEmployee) {
                await updateEmployee(currentEmployee._id, data);
            } else {
                await createEmployee(data);
            }
            fetchEmployees();
            setShowForm(false);
        } catch (error) {
            console.error("Error saving employee:", error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        try {
            return format(new Date(dateString), 'MMM dd, yyyy');
        } catch {
            return dateString;
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="rounded-2xl border shadow-sm bg-white">

            <div className="border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Employees</h2>
                <button
                    onClick={handleAddEmployee}
                    className="btn bg-blue-600 text-white p-2 rounded-lg btn-sm flex items-center gap-1"
                >
                    <Plus size={16} />
                    Add Employee
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-xs sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">First Name</th>
                            <th className="px-6 py-3">Last Name</th>
                            <th className="px-6 py-3">Profile Picture</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Phone</th>
                            <th className="px-6 py-3">Gender</th>
                            <th className="px-6 py-3">DOB</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {employees.map((employee, index) => (
                            <tr key={employee._id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">
                                    <Link
                                        to={`/employee-details/${employee._id}`} // Link to the employee detail page
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        {employee.first_name}
                                    </Link>
                                </td>
                                <td className="px-6 py-4">{employee.last_name}</td>
                                <td className="px-6 py-4">
                                    {employee.profile_picture ? (
                                        <img
                                            src={employee.profile_picture}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : '-'}
                                </td>
                                <td className="px-6 py-4">{employee.email}</td>
                                <td className="px-6 py-4">{employee.phone_number || '-'}</td>
                                <td className="px-6 py-4">{employee.gender || '-'}</td>
                                <td className="px-6 py-4">{formatDate(employee.date_of_birth)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${employee.is_active
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {employee.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-x-3">
                                        <button
                                            onClick={() => handleEditEmployee(employee)}
                                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                            title="Edit"
                                        >
                                            <PencilLine size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteEmployee(employee._id)}
                                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                            title="Delete"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                {currentEmployee ? "Edit Employee" : "Add Employee"}
                            </h3>
                            <button
                                onClick={() => setShowForm(false)}
                                className="btn btn-ghost btn-sm"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="overflow-y-auto flex-grow">
                            <EmployeeForm
                                employee={currentEmployee}
                                onSubmit={handleSubmit}
                                onCancel={() => setShowForm(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeTable;
