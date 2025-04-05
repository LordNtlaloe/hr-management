import { useEffect, useState } from "react";
import {
    getAllMinistries,
    createMinistry,
    updateMinistry,
    deleteMinistry,
} from "../../services/ministriesApi";
import { PencilLine, Trash, Plus } from "lucide-react";
import MinistryForm from "./MinistryForm";

const MinistryTable = () => {
    const [ministries, setMinistries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [currentMinistry, setCurrentMinistry] = useState(null);
    const [ministryToDelete, setMinistryToDelete] = useState(null);

    useEffect(() => {
        fetchMinistries();
    }, []);

    const fetchMinistries = async () => {
        try {
            const response = await getAllMinistries();
            setMinistries(response.data);
        } catch (error) {
            console.error("Failed to fetch ministry details", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMinistry = () => {
        setCurrentMinistry(null);
        setShowForm(true);
    };

    const handleEditMinistry = (ministry) => {
        setCurrentMinistry(ministry);
        setShowForm(true);
    };

    const handleSubmit = async (data) => {
        try {
            if (currentMinistry) {
                await updateMinistry(currentMinistry._id, data);
            } else {
                await createMinistry(data);
            }
            fetchMinistries();
            setShowForm(false);
        } catch (error) {
            console.error("Error saving ministry:", error);
        }
    };

    const confirmDelete = async () => {
        try {
            await deleteMinistry(ministryToDelete);
            fetchMinistries();
            setMinistryToDelete(null);
        } catch (error) {
            console.error("Error deleting ministry:", error);
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="rounded-2xl border shadow-sm bg-white">
            <div className="border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Ministries Table</h2>
                <button
                    onClick={handleAddMinistry}
                    className="btn btn-primary btn-sm flex items-center gap-1"
                >
                    <Plus size={16} />
                    Add Ministry
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-xs sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Ministry Name</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {ministries.map((ministry, index) => (
                            <tr key={ministry._id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{ministry.ministry_name}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-x-3">
                                        <button
                                            onClick={() => handleEditMinistry(ministry)}
                                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                            title="Edit"
                                        >
                                            <PencilLine size={18} />
                                        </button>
                                        <button
                                            onClick={() => setMinistryToDelete(ministry._id)}
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
                                {currentMinistry ? "Edit Ministry" : "Add Ministry"}
                            </h3>
                            <button
                                onClick={() => setShowForm(false)}
                                className="btn btn-ghost btn-sm"
                            >
                                ✕
                            </button>
                        </div>
                        <MinistryForm
                            onSubmit={handleSubmit}
                            initialData={currentMinistry}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {ministryToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this ministry detail?</h3>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setMinistryToDelete(null)}
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

export default MinistryTable;
