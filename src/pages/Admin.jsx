import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [spots, setSpots] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch spots and users data from the backend
  useEffect(() => {
    fetchSpots();
    fetchUsers();
  }, []);

  // Fetch parking spots
  const fetchSpots = async () => {
    try {
      const response = await axios.get("http://192.168.96.150:5000/api/parking/spots");
      setSpots(response.data);
    } catch (error) {
      console.error("Error fetching spots:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://192.168.118.151:5000/api/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Update spot status
  const updateSpotStatus = async (spotNumber, newStatus) => {
    try {
      const response = await axios.post("http://192.168.118.151:5000/api/parking/update-spot", {
        spotNumber,
        status: newStatus,
      });
      console.log("Spot status updated:", response.data);
      fetchSpots(); // Refresh spots data
    } catch (error) {
      console.error("Error updating spot status:", error);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://192.168.118.151:5000/api/admin/users/${userId}`);
      console.log("User deleted:", response.data);
      fetchUsers(); // Refresh users data
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>

      {/* Display Parking Spots */}
      <div style={styles.section}>
        <h3>Parking Spots</h3>
        <div style={styles.spotsContainer}>
          {spots.map((spot) => (
            <div key={spot.spotNumber} style={styles.spotCard}>
              <h4>Spot {spot.spotNumber}</h4>
              <div
                style={{
                  ...styles.statusIndicator,
                  backgroundColor: spot.status === "occupied" ? "red" : "green",
                }}
              ></div>
              <button
                onClick={() =>
                  updateSpotStatus(
                    spot.spotNumber,
                    spot.status === "occupied" ? "vacant" : "occupied"
                  )
                }
                style={styles.button}
              >
                Toggle Status
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Display Users */}
      <div style={styles.section}>
        <h3>Users</h3>
        <div style={styles.usersContainer}>
          {users.map((user) => (
            <div key={user._id} style={styles.userCard}>
              <p>Name: {user.name}</p>
              <p>Vehicle Number: {user.vehicleNumber}</p>
              <p>Mobile Number: {user.mobileNumber}</p>
              <button onClick={() => deleteUser(user._id)} style={styles.button}>
                Delete User
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  section: {
    marginBottom: "40px",
  },
  spotsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  spotCard: {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "200px",
    textAlign: "center",
  },
  statusIndicator: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    margin: "10px auto",
  },
  usersContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  userCard: {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "200px",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default Admin;