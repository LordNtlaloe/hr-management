import { useEffect, useState } from "react";
import {
    getAllDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
} from "../../services/departmentsApi";
import { PencilLine, Trash, Plus } from "lucide-react";
import DepartmentForm from "./DepartmentForm";

const DepartmentTable = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [currentDepartment, setCurrentDepartment] = useState(null);
    const [departmentToDelete, setDepartmentToDelete] = useState(null);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await getAllDepartments();
            setDepartments(response.data);
        } catch (error) {
            console.error("Failed to fetch department details", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddDepartment = () => {
        setCurrentDepartment(null);
        setShowForm(true);
    };

    const handleEditDepartment = (department) => {
        setCurrentDepartment(department);
        setShowForm(true);
    };

    const handleSubmit = async (data) => {
        try {
            if (currentDepartment) {
                await updateDepartment(currentDepartment._id, data);
            } else {
                await createDepartment(data);
            }
            fetchDepartments();
            setShowForm(false);
        } catch (error) {
            console.error("Error saving department:", error);
        }
    };

    const confirmDelete = async () => {
        try {
            await deleteDepartment(departmentToDelete);
            fetchDepartments();
            setDepartmentToDelete(null);
        } catch (error) {
            console.error("Error deleting department:", error);
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="rounded-2xl border shadow-sm bg-white">
            <div className="border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Departments Table</h2>
                <button
                    onClick={handleAddDepartment}
                    className="btn btn-primary btn-sm flex items-center gap-1"
                >
                    <Plus size={16} />
                    Add Department
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-xs sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Department Name</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {departments.map((department, index) => (
                            <tr key={department._id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{department.department_name}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-x-3">
                                        <button
                                            onClick={() => handleEditDepartment(department)}
                                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                            title="Edit"
                                        >
                                            <PencilLine size={18} />
                                        </button>
                                        <button
                                            onClick={() => setDepartmentToDelete(department._id)}
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
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                {currentDepartment ? "Edit Department" : "Add Department"}
                            </h3>
                            <button
                                onClick={() => setShowForm(false)}
                                className="btn btn-ghost btn-sm"
                            >
                                ✕
                            </button>
                        </div>
                        <DepartmentForm
                            onSubmit={handleSubmit}
                            initialData={currentDepartment}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {departmentToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this department detail?</h3>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setDepartmentToDelete(null)}
                                className="btn btn-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="btn btn-danger btn-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DepartmentTable;
