import React, { useState } from "react";
import axios from "axios";

const EstimationTool = () => {
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8082/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTableData(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="estimation-tool">
      <h1>Estimation Tool</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>

      {tableData && (
        <div className="table-container">
          <h2>Generated Estimation Table</h2>
          <table>
            <thead>
              <tr>
                <th>Module Name</th>
                <th>Feature Name</th>
                <th>Assumptions</th>
                <th>Additional Comments</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.moduleName}</td>
                  <td>{row.featureName}</td>
                  <td>{row.assumptions}</td>
                  <td>{row.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EstimationTool;
