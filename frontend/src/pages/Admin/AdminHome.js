import React, { useState, useEffect } from "react";
import axios from "axios";
import { AdminNavbar } from "../../components/AdminNavbar";
import './Verifications.css';


const AdminHome = () => {
    const [verifications, setVerifications] = useState([]); 
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchVerifications = async () => {
            try {
                const response = await axios.get("http://localhost:9000/getVerifications");
                const extractedData = response.data.map((user) => user[2]); 
                
                const userDetails = await Promise.all(
                    extractedData.map(async (item) => {
                        try {
                            const userResponse = await axios.get("http://localhost:9000/getUserById", {
                                params: { _id: item.user_id },
                            });

                            return { ...item, user: userResponse.data }; 
                        } catch (error) {
                            console.error(`Error fetching user for user_id: ${item.user_id}`, error);
                            return { ...item, user: null };                         }
                    })
                );

                setVerifications(userDetails); 
                console.log("Enriched Verifications:", userDetails);
            } catch (error) {
                console.error("Error fetching verifications:", error);
            }
        };

        const fetchReports = async () => {
            try {
                const response = await axios.get("http://localhost:9000/getReports");
                const extractedData = response.data.map((user) => user[2]); //getting only the report information

                const userDetails = await Promise.all(
                    extractedData.map(async (item) => {
                        try {
                            const userResponse = await axios.get("http://localhost:9000/getUserById", {
                                params: { _id: item.user_id },
                            });
                            const getPost = await axios.get('http://localhost:9000/getRecipeById',  {
                                params: {_id: item.recipe_id}
                            });

                            return { ...item, user: userResponse.data, recipe: getPost.data }; //returns report information and user data
                        } catch (error) {
                            console.error(`Error fetching user for user_id: ${item.user_id}`, error);
                            return { ...item, user: null, recipe: null };                         }
                    })
                );

                setReports(userDetails);
            } catch(error) {
                console.error("Error fetching reports:", error);
            }
        };


        fetchReports();
        fetchVerifications(); 
    }, []); 

    const handleApprove = async (userId) => {
        try {
            await axios.post(`http://localhost:9000/approveUser`, { 
                _id: userId 
            });
            alert("User approved successfully!");

            setVerifications((prevVerifications) =>
                prevVerifications.filter((application) => application._id !== userId)
            );
        } catch (error) {
            console.error("Error approving user:", error);
            alert("Failed to approve user.");
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:9000/deleteVerificationRequest`,{
                _id: userId 
            });
            alert("User deleted successfully!");

            setVerifications((prevVerifications) =>
                prevVerifications.filter((application) => application._id !== userId)
            );
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        }
    };

    const handleResolve = async (report_id) => {
        try {
            await axios.delete(`http://localhost:9000/deleteReport`,{
                _id: report_id 
            });

            alert("Report Resolved");

        } catch(error) {
            console.error("Error deleting user: ", error);
            alert("Failed to resolve report.");
        }
    };

    const handleDeletePost = async (report_id, recipe_id) => {
        try {
            await axios.delete(`http://localhost:9000/deleteReport`,{
                data: {_id: report_id}
            });
            await axios.delete(`http://localhost:9000/deletePost`,{
                data: {_id: recipe_id}
            });

            alert("Post Deleted");
            
        } catch(error) {
            console.error("Error deleting user: ", error);
            alert("Failed to resolve report.");
        }
    };

    return (
        <div>
            <AdminNavbar />
            {/* Verifications */}
            <div className='parent-container'>
                <div className="admin-home-container">
                    <div className="users-list">
                        <h2>Users to Verify</h2>
                        {verifications.length > 0 ? (
                            verifications.map((application) => (
                                <div key={application._id} className="user-item">
                                    <div className="user-details">
                                        <p><strong>Name:</strong> {application.user?.username || "Unknown"}</p>
                                        <p><strong>Email:</strong> {application.user?.email || "Unknown"}</p>
                                        <p><strong>Description:</strong> {application?.description || "Unknown"}</p>
                                    </div>
                                    <div className="action-buttons">
                                        <button 
                                            className="approve-button" 
                                            onClick={() => handleApprove(application.user._id)}
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            className="delete-button" 
                                            onClick={() => handleDelete(application._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-users">No users to verify.</p>
                        )}
                    </div>
                </div>

                {/* Reports */}
                <div className="admin-home-container">
                    <div className="users-list">
                        <h2>Reports to Resolve</h2>
                        {reports.length > 0 ? (
                            reports.map((report) => (
                                <div key={report._id} className="user-item">
                                    <div className="user-details">
                                        <p><strong>Name:</strong> {report.user?.username || "Unknown"}</p>
                                        <p><strong>Email:</strong> {report.user?.email || "Unknown"}</p>
                                        <p><strong>Description:</strong> {report?.report_reason || "Unknown"}</p>
                                        <p><strong>Recipe Name:</strong> {report.recipe?.recipe_name || "Unknown"}</p>
                                        <p><strong>Instructions:</strong> {report.recipe?.instructions || "Unknown"}</p>
                                        <p><strong>Ingredients:</strong> {report.recipe?.ingredients || "Unknown"}</p>
                                        <p><strong>Cuisine Type:</strong> {report.recipe?.cuisine_type || "Unknown"}</p>
                                    </div>
                                    <div className="action-buttons">
                                        <button 
                                            className="approve-button" 
                                            onClick={() => handleResolve(report._id)} //deletes report
                                        >
                                            Resolve Report
                                        </button>
                                        <button 
                                            className="delete-button" 
                                            onClick={() => handleDeletePost(report._id, report.recipe._id)} //deletes report and post
                                        >
                                            Delete Post
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-users">No Reports to Resolve.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AdminHome;
