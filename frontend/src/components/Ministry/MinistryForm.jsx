import { useForm } from "react-hook-form";
import { useState } from "react";

const MinistryForm = ({ onSubmit, initialData, onCancel }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: initialData || {
            ministry_name: ""        
        }
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFormSubmit = async (data) => {
        try {
            setLoading(true);
            await onSubmit(data);
            setMessage(initialData ? "Ministry updated successfully." : "Ministry created successfully.");
            if (!initialData) reset();
        } catch (error) {
            console.error("Error saving ministry:", error);
            setMessage("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Scrollable form content */}
            <div className="overflow-y-auto flex-grow max-h-[calc(100vh-180px)]">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    {message && (
                        <div className="mb-4 text-sm text-center text-blue-600">{message}</div>
                    )}

                    <div>
                        <label className="block text-sm font-medium">Ministry Name</label>
                        <input
                            type="text"
                            {...register("ministry_name", { required: true })}
                            className="input input-bordered w-full"
                        />
                        {errors.ministry_name && <p className="text-red-500 text-sm">This field is required</p>}
                    </div>

                </form>
            </div>

            {/* Fixed footer with buttons */}
            <div className="border-t pt-4 mt-4 sticky bottom-0 bg-white">
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-ghost"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit(handleFormSubmit)}
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Ministry"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MinistryForm;