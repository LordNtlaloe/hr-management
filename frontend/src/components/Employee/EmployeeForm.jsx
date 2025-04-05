import { useForm } from "react-hook-form";
import { useState } from "react";

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm({
        defaultValues: employee || {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            date_of_birth: "",
            gender: "",
            address: {
                street: "",
                city: "",
                state: "",
                postal_code: "",
                country: ""
            },
            profile_picture: "",
            is_active: true
        }
    });

    const [profilePreview, setProfilePreview] = useState(employee?.profile_picture || "");

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePreview(reader.result);
                setValue("profile_picture", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>

                    <div>
                        <label className="block text-sm font-medium mb-1">First Name*</label>
                        <input
                            {...register("first_name", { required: "First name is required" })}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Last Name*</label>
                        <input
                            {...register("last_name", { required: "Last name is required" })}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Date of Birth</label>
                        <input
                            type="date"
                            {...register("date_of_birth")}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Gender</label>
                        <select
                            {...register("gender")}
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email*</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input
                            {...register("phone_number")}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Profile Picture</label>
                        <div className="flex items-center gap-4">
                            {profilePreview && (
                                <img
                                    src={profilePreview}
                                    alt="Profile Preview"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfileChange}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4 md:col-span-2">
                    <h3 className="text-lg font-medium">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Street</label>
                            <input
                                {...register("address.street")}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">City</label>
                            <input
                                {...register("address.city")}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">State/Province</label>
                            <input
                                {...register("address.state")}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Postal Code</label>
                            <input
                                {...register("address.postal_code")}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Country</label>
                            <input
                                {...register("address.country")}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="is_active"
                        {...register("is_active")}
                        className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor="is_active" className="text-sm font-medium">
                        Active Employee
                    </label>
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    {employee ? "Update Employee" : "Create Employee"}
                </button>
            </div>
        </form>
    );
};

export default EmployeeForm;