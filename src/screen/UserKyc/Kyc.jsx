import React, { useEffect, useState } from 'react';

export default function Kyc() {
    const [kycApplications, setKycApplications] = useState([]);

    const fetchKycApplications = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/kyc", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.success) {
                setKycApplications(data.kyc);
            } else {
                setError(data.message || "Failed to fetch KYC applications.");
            }
        } catch (error) {
            setError("An error occurred while fetching KYC applications.");
            console.error("Error fetching kyc applications:", error);
        } 
    };

    useEffect(() => {
        fetchKycApplications();
    }, []);

    const handleAccept = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/kyc/${id}/accept`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.success) {
                alert("KYC application accepted!");
                fetchKycApplications(); 
            } else {
                alert("Failed to accept the application.");
            }
        } catch (error) {
            console.error("Error accepting application:", error);
            alert("An error occurred while accepting the application.");
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/kyc/${id}/reject`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.success) {
                alert("KYC application rejected!");
                fetchKycApplications(); 
            } else {
                alert("Failed to reject the application.");
            }
        } catch (error) {
            console.error("Error rejecting application:", error);
            alert("An error occurred while rejecting the application.");
        }
    };


    return (
        <div>
            <h1>KYC Applications</h1>
            <table className="table-auto border-collapse border border-gray-400 w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Country</th>
                        <th className="border border-gray-300 px-4 py-2">State</th>
                        <th className="border border-gray-300 px-4 py-2">NID</th>
                    </tr>
                </thead>
                <tbody>
                    {kycApplications.map((kyc) => (
                        <tr key={kyc._id}>
                            <td className="border border-gray-300 px-4 py-2">{kyc.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{kyc.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{kyc.country}</td>
                            <td className="border border-gray-300 px-4 py-2">{kyc.state}</td>
                            <td className="border border-gray-300 px-4 py-2">{kyc.nid}</td>
                            <td className="border border-gray-300 px-4 py-2">  
                                <button
                                    className="bg-green-500 text-white px-3 py-1 rounded mx-1"
                                    onClick={() => handleAccept(kyc._id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded mx-1"
                                    onClick={() => handleReject(kyc._id)}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
