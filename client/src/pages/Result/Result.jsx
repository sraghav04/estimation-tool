import { useState } from "react";
import { Button, Table } from "antd";

const Result = () => {
  const [showTable, setShowTable] = useState(false);

  const handleResultClick = () => {
    setShowTable(true);
  };

  const columns = [
    {
      title: "Activities",
      dataIndex: "activity",
      key: "activity",
    },
    {
      title: "Min Days",
      dataIndex: "minDays",
      key: "minDays",
      align: "center",
    },
    {
      title: "Max Days",
      dataIndex: "maxDays",
      key: "maxDays",
      align: "center",
    },
    {
      title: "Est Days",
      dataIndex: "estDays",
      key: "estDays",
      align: "center",
    },
  ];

  const dataSource = [
    {
      key: "1",
      activity: "Total Features Implementation",
      minDays: 3,
      maxDays: 5,
      estDays: 4,
    },
    {
      key: "2",
      activity: "Total Test Engineering",
      minDays: 0,
      maxDays: 0,
      estDays: 0,
    },
    {
      key: "3",
      activity: "Total Requirement Gathering & Analysis",
      minDays: 0,
      maxDays: 0,
      estDays: 0,
    },
    {
      key: "4",
      activity: "Total Additional Development Tasks",
      minDays: 0,
      maxDays: 0,
      estDays: 0,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
     

      {showTable && (
        <div style={{ marginTop: "30px", background: "#fafafa", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ marginBottom: "5px" }}>Step 1: Uncertainty (%)</h2>
            <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1890ff" }}>
              20.00%
            </div>
          </div>

          <h2 style={{ marginBottom: "10px" }}>Project Summary</h2>

          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={false}
            size="middle"
          />

          <div style={{ textAlign: "right", marginTop: "15px", fontSize: "16px", fontWeight: "bold" }}>
            Estimated days: 4
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
