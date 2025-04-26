import { useState } from "react";
import { Button, Table, InputNumber, Divider, Input } from "antd";

const Summary = () => {
  const [showTable, setShowTable] = useState(false);
  const [feEngineers, setFeEngineers] = useState(4); // Default value is 4
  const [uncertainty, setUncertainty] = useState(20); // Editable uncertainty
  const [firstMinDay, setFirstMinDay] = useState(100); // Editable uncertainty
  const [firstMaxDay, setFirstMaxDay] = useState(130); // Editable uncertainty

  const handleResultClick = () => {
    setShowTable(true);
  };
  //   useEffect(() => {
  //     // Calculate the first minimum day based on the number of FE engineers and uncertainty
  //     const minDays = Math.ceil((firstMinDay * uncertainty) / 100 + firstMinDay);
  //     setFirstMinDay(minDays);
  //   }, [uncertainty]);

  const projectSummaryColumns = [
    { title: "Activities", dataIndex: "activity", key: "activity" },
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

  const calculateDays = (baseDays, uncertainty, firstMaxDay) => {
    const minDays = Math.ceil((baseDays * uncertainty) / 100 + baseDays);
    const maxDays = Math.ceil((firstMaxDay * uncertainty) / 50 + firstMaxDay); // Example formula for maxDays
    return { minDays, maxDays };
  };

  const projectSummaryData = [
    {
      key: "1",
      activity: "Total Features Implementation",
      ...calculateDays(firstMinDay, uncertainty, firstMaxDay),
      estDays: 4,
    },
    {
      key: "2",
      activity: "Total Test Engineering",
      ...calculateDays(3, uncertainty, 4), // Example baseDays for Test Engineering
      estDays: 0,
    },
    {
      key: "3",
      activity: "Total Requirement Gathering & Analysis",
      ...calculateDays(2, uncertainty, 3), // Example baseDays for Requirement Gathering
      estDays: 0,
    },
    {
      key: "4",
      activity: "Total Additional Development Tasks",
      ...calculateDays(1, uncertainty, 2), // Example baseDays for Additional Development
      estDays: 0,
    },
  ];
  const timelineColumns = [
    { title: "Timeline", dataIndex: "timeline", key: "timeline" },
    {
      title: "Recommended Wks",
      dataIndex: "recommendedWks",
      key: "recommendedWks",
      align: "center",
    },
    {
      title: "Actual Planned Wks",
      dataIndex: "actualPlannedWks",
      key: "actualPlannedWks",
      align: "center",
    },
  ];

  const timelineData = [
    {
      key: "1",
      timeline: "Requirements & Design",
      recommendedWks: 4,
      actualPlannedWks: 2,
    },
    {
      key: "2",
      timeline: "Development & Sprint Testing",
      recommendedWks: 2,
      actualPlannedWks: 12,
    },
    {
      key: "3",
      timeline: "Regression",
      recommendedWks: 2,
      actualPlannedWks: 3,
    },
    {
      key: "4",
      timeline: "UAT / Feedback & Deployment",
      recommendedWks: 2,
      actualPlannedWks: 3,
    },
    { key: "5", timeline: "Hypercare", recommendedWks: 2, actualPlannedWks: 0 },
    {
      key: "6",
      timeline: "Total Weeks",
      recommendedWks: 12,
      actualPlannedWks: 20,
    },
  ];

  const effortColumns = [
    { title: "Activities", dataIndex: "activity", key: "activity" },
    { title: "Days", dataIndex: "days", key: "days", align: "center" },
  ];

  const effortData = [
    { key: "1", activity: "Total Design", days: 5 },
    { key: "2", activity: "Total Development", days: 4 },
    { key: "3", activity: "Total QA", days: 3 },
    { key: "4", activity: "Total BA", days: 2 },
    { key: "5", activity: "Total Infra", days: 2 },
    { key: "6", activity: "Total Management", days: 0.8 },
  ];

  return (
    <div style={{ padding: "20px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Button type="primary" size="large" onClick={handleResultClick}>
        Show Results
      </Button>

      {showTable && (
        <div
          style={{
            marginTop: "30px",
            background: "#ffffff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}>
          {/* Step 1 */}
          <div style={{ marginBottom: "20px" }}>
            <h2>Step 1: Uncertainty (%)</h2>
            <InputNumber
              min={0}
              max={100}
              value={uncertainty}
              onChange={(value) => setUncertainty(value || 0)}
              formatter={(value) => `${value}%`}
              style={{ width: "150px" }}
            />
          </div>
          <Divider />

          {/* Project Summary */}
          <div style={{ marginBottom: "20px" }}>
            <h2>Project Summary</h2>
            <Table
              dataSource={projectSummaryData}
              columns={projectSummaryColumns}
              bordered
              pagination={false}
              size="middle"
            />
          </div>
          <Divider />
          <Divider />

          {/* Step 4 */}
          <div style={{ marginBottom: "20px" }}>
            <h2>Step 4: Effort by Planned Activities</h2>
            <Table
              dataSource={effortData}
              columns={effortColumns}
              bordered
              pagination={false}
              size="middle"
            />
          </div>

          <Divider />

          {/* Step 2 */}
          <div style={{ marginBottom: "20px" }}>
            <h2>Step 2: # FE Eng's Proposed</h2>
            <InputNumber
              min={1}
              value={feEngineers}
              onChange={(value) => setFeEngineers(value || 1)}
              style={{ width: "150px" }}
            />
          </div>

          <Divider />

          {/* Step 3 */}
          <div style={{ marginBottom: "20px" }}>
            <h2>Step 3: Timeline</h2>
            <Table
              dataSource={timelineData}
              columns={timelineColumns}
              bordered
              pagination={false}
              size="middle"
            />
          </div>

          <Divider />

          <div
            style={{
              textAlign: "right",
              marginTop: "15px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#52c41a",
            }}>
            Estimated days: 4
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
