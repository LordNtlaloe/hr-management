import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeDetailsById } from "../services/employeeDetailsApi";
import { getEmployeeById } from "../services/employeeApi";

const EmployeeDetail = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [employeeDetails, setEmployeeDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const employeeRes = await getEmployeeById(id);
                const employeeDetailsRes = await getEmployeeDetailsById(id);
                setEmployee(employeeRes.data);
                setEmployeeDetails(employeeDetailsRes.data);
            } catch (error) {
                console.error("Failed to fetch employee data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, [id]);

    if (loading) return <p className="p-4">Loading...</p>;

    // Check if employee data is available before rendering
    if (!employee) {
        return <p className="p-4">Employee not found.</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold">{employee.first_name} {employee.last_name}</h1>
            <p>Email: {employee.email}</p>
            <p>Phone: {employee.phone_number}</p>
            <p>Gender: {employee.gender}</p>
            <p>Date of Birth: {employee.date_of_birth}</p>
            <p>Status: {employee.is_active ? 'Active' : 'Inactive'}</p>

            {/* Display employee details */}
            {employeeDetails && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Employee Details</h3>
                    <p>Position: {employeeDetails.position}</p>
                    <p>Department: {employeeDetails.department_id.department_name}</p>
                    <p>Ministry: {employeeDetails.ministry_id.ministry_name}</p>
                    <p>Employee Number: {employeeDetails.employee_number}</p>
                    <p>Grade: {employeeDetails.grade}</p>
                </div>
            )}
        </div>
    );
};

export default EmployeeDetail;
