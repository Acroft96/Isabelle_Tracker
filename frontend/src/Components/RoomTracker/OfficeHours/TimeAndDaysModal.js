import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaSyncAlt } from "react-icons/fa";
import TimeAndDaysModal from "./TimeAndDaysModal";

function AdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false); // Add syncing state
  const [editField, setEditField] = useState({ index: null, field: null }); // Track the row and field being edited
  const [showModal, setShowModal] = useState(false); // Track if the modal is visible
  const [modalField, setModalField] = useState(""); // The field being edited in the modal
  const [modalValue, setModalValue] = useState(""); // The value of the field in the modal

  // Fetch office hours data from your Express backend
  const fetchData = () => {
    setLoading(true);
    fetch("http://localhost:4000/roomtracker/officehours")
      .then((response) => {
        console.log("Response from backend:", response); // Log raw response
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data from MongoDB:", data); // Log the actual data
        setData(data); // Set the fetched data in state
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  // Sync data from Google Apps Script to MongoDB via Express
  const syncDataFromGoogle = () => {
    setSyncing(true);
    fetch("http://localhost:4000/roomtracker/sync-officehours") // Ensure the correct route is used
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "Success") {
          fetchData(); // Refresh data after syncing
          alert("Data successfully synced from Google Apps Script!"); // Success notification
        }
        setSyncing(false);
      })
      .catch((error) => {
        console.error("Error syncing data from Google Apps Script:", error);
        setSyncing(false);
        alert("Error syncing data from Google Apps Script."); // Error notification
      });
  };

  const handleSave = () => {
    const updatedData = {
      ...data[editField.index],
      [editField.field]: modalValue, // Set the updated value for the edited field
    };

    console.log("Updated data being sent to backend:", updatedData); // Debugging the updated data

    // Send updated data to the Express backend (which updates MongoDB)
    fetch(`http://localhost:4000/roomtracker/update`, {
      method: "POST",
      body: JSON.stringify(updatedData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Backend response after update:", result); // Log the response
        if (result.status === "Success") {
          setEditField({ index: null, field: null }); // Exit edit mode
          setShowModal(false); // Close modal
          fetchData(); // Refetch data from MongoDB after a successful update
          alert("Data successfully updated!"); // Show success notification
        } else {
          console.error("Error saving data:", result); // Log error
        }
      })
      .catch((error) => {
        console.error("Error saving data:", error); // Log any errors
        alert("Error saving data."); // Show error notification
      });
  };

  // Open the modal with the current value for editing
  const openModal = (index, field) => {
    setEditField({ index, field });

    // Ensure correct type of modalValue for multiple days
    if (field.includes("days")) {
      setModalValue(
        Array.isArray(data[index][field]) ? data[index][field] : []
      ); // Ensure array
    } else {
      setModalValue(data[index][field] || ""); // Handle other fields as strings
    }

    setModalField(field); // Set which field is being edited
    setShowModal(true); // Show modal
  };

  // Handle input change in modal
  const handleModalInputChange = (value, field) => {
    setModalValue(value); // Update modalValue based on input
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin View: Office Hours Data</h1>

      {/* Log current state of the data */}
      {console.log("Data to be displayed:", data)}

      {/* Sync Button for syncing data from Google Apps Script */}
      <div className="text-right mb-3">
        <Button
          variant="secondary"
          onClick={syncDataFromGoogle}
          disabled={loading || syncing}
        >
          {syncing ? (
            <span>Syncing...</span>
          ) : (
            <>
              <FaSyncAlt className="mr-2" /> Sync with Google Apps Script
            </>
          )}
        </Button>
      </div>

      {/* Refresh Button */}
      <div className="text-right mb-3">
        <Button
          variant="primary"
          onClick={fetchData}
          disabled={loading || syncing}
        >
          {loading ? (
            <span>Loading...</span>
          ) : (
            <>
              <FaSyncAlt className="mr-2" /> Refresh Data
            </>
          )}
        </Button>
      </div>

      {/* Data Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Email Address</th>
            <th>Full Name</th>
            <th>W#</th>
            <th>Primary Office Location</th>
            <th>Days (In-Person)</th>
            <th>In-Person Start</th>
            <th>In-Person End</th>
            <th>In-Person Location</th>
            <th>Days (Virtual)</th>
            <th>Virtual Start</th>
            <th>Virtual End</th>
            <th>Virtual Meeting Link</th>
            <th>Appointment Scheduler</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.timestamp?.toString()}</td>
              <td onClick={() => openModal(index, "emailAddress")}>
                {entry["Email Address"]}
              </td>
              <td onClick={() => openModal(index, "fullName")}>
                {entry["Full Name"]}
              </td>
              <td onClick={() => openModal(index, "wNumber")}>{entry["W#"]}</td>
              <td onClick={() => openModal(index, "primaryOfficeLocation")}>
                {entry["Primary Office Location (e"] &&
                  entry["Primary Office Location (e"][
                    "g Ogden, NB 302 or online)"
                  ]}
              </td>
              <td onClick={() => openModal(index, "inPersonDays")}>
                {entry["Select the days for in-person office hours"]}
              </td>
              <td onClick={() => openModal(index, "inPersonStartTime")}>
                {entry["Office Hours Start Time (In-Person)"]}
              </td>
              <td onClick={() => openModal(index, "inPersonEndTime")}>
                {entry["Office Hours End Time (In-Person)"]}
              </td>
              <td onClick={() => openModal(index, "inPersonLocation")}>
                {
                  entry["Location for In-Person Office Hours (e"][
                    "g Ogden, NB 302)"
                  ]
                }
              </td>
              <td onClick={() => openModal(index, "virtualDays")}>
                {entry["Select the days for virtual office hours:"]}
              </td>
              <td onClick={() => openModal(index, "virtualStartTime")}>
                {entry["Office Hours Start Time (Virtual)"]}
              </td>
              <td onClick={() => openModal(index, "virtualEndTime")}>
                {entry["Office Hours End Time (Virtual)"]}
              </td>
              <td onClick={() => openModal(index, "virtualMeetingLink")}>
                <a
                  href={entry["Meeting Link for Virtual Office Hours"]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {entry["Meeting Link for Virtual Office Hours"]}
                </a>
              </td>
              <td onClick={() => openModal(index, "appointmentSchedulerLink")}>
                <a
                  href={
                    entry["Link to Appointment Scheduler or additional links"]
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {entry["Link to Appointment Scheduler or additional links"]}
                </a>
              </td>
              <td onClick={() => openModal(index, "comments")}              >
                {entry["Additional Comments or Notes"]}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* TimeAndDaysModal for editing time, days, and text fields */}
      <TimeAndDaysModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        modalField={modalField}
        modalValue={modalValue}
        handleModalInputChange={handleModalInputChange}
        handleSave={handleSave}
      />
    </div>
  );
}

export default AdminPage;

