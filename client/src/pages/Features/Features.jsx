import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Table, Input, Tooltip, Button, Popconfirm, message, Spin } from "antd";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "./Features.css";
import {
  fetchRequirements,
  postRequirements,
} from "../../services/updateDataService";

const Features = () => {
  const navigate = useNavigate();
  const [editingCell, setEditingCell] = useState({ row: null, field: null });

  // 1️⃣ Fetch Data using useQuery
  const { data, isLoading: isFetching } = useQuery({
    queryKey: ["requirements"],
    queryFn: fetchRequirements,
    staleTime: 0,
  });

  // 2️⃣ Define initial 7 empty rows
  const initialData = Array.from({ length: 7 }, (_, index) => ({
    key: index.toString(),
    moduleName: "",
    featureName: "",
    assumptions: "",
    additionalComments: "",
    threshold1: { min: "", max: "" },
    threshold2: { min: "", max: "" },
  }));

  // 3️⃣ Filter valid fetched data
  const validFetchedData = (data || [])
    .filter((item) => item.moduleName && item.featureName)
    .map((item, index) => ({
      key: index.toString(),
      moduleName: item.moduleName,
      featureName: item.featureName,
      assumptions: item.assumptions || "",
      additionalComments: item.comments || "",
      threshold1: {
        min: item.minEstimatesHours ? item.minEstimatesHours.toString() : "",
        max: item.maxEstimatesHours ? item.maxEstimatesHours.toString() : "",
      },
      threshold2: {
        min: item.minEstimatesDays ? item.minEstimatesDays.toString() : "",
        max: item.maxEstimatesDays ? item.maxEstimatesDays.toString() : "",
      },
    }));

  // 4️⃣ Initialize state
  const [dataSource, setDataSource] = useState(initialData);

  // 5️⃣ Update state when data fetched
  useEffect(() => {
    if (validFetchedData.length > 0) {
      setDataSource(validFetchedData);
    } else if (!isFetching) {
      setDataSource(initialData);
    }
  }, [data, isFetching]);

  // 6️⃣ Handle cell editing
  const handleCellChange = (rowIndex, dataIndex, value, parentKey = null) => {
    const updatedData = [...dataSource];
    if (parentKey) {
      updatedData[rowIndex][parentKey][dataIndex] = value;
    } else {
      updatedData[rowIndex][dataIndex] = value;
    }
    setDataSource(updatedData);
  };

  // 7️⃣ Setup mutation for update
  const { mutate: submitRequirements, isLoading } = useMutation({
    mutationFn: postRequirements,
    onSuccess: () => {
      message.success("Requirements saved successfully!");
    },
    onError: () => {
      message.error("Failed to save requirements. Please try again.");
    },
  });

  // 8️⃣ Validation
  const isAnyFieldEmpty = dataSource.some((item) => {
    return (
      !`${item.moduleName}`.trim() ||
      !`${item.featureName}`.trim() ||
      !`${item.threshold1.min}`.trim() ||
      !`${item.threshold1.max}`.trim()
    );
  });

  const handleUpdate = () => {
    if (dataSource.length === 0) {
      message.warning("No data to submit!");
      return;
    }

    const invalidRow = dataSource.find((item) => {
      return (
        !`${item.tableName}`.trim() ||
        !`${item.moduleName}`.trim() ||
        !`${item.featureName}`.trim() ||
        !`${item.assumptions}`.trim() ||
        !`${item.comments}`.trim() ||
        !`${item.threshold1.min}`.trim() ||
        !`${item.threshold1.max}`.trim()
      );
    });

    if (invalidRow) {
      message.error(
        "Please add required fields data or delete rows which are not required."
      );
      return;
    }

    const payload = dataSource.map((item) => ({
      tableName: "FeaturesTable",
      moduleName: item.moduleName.trim(),
      featureName: item.featureName.trim(),
      assumptions: item.assumptions.trim(),
      comments: item.additionalComments.trim(),
      maxEstimatesHours: item.threshold1.max.trim(),
      minEstimatesHours: item.threshold1.min.trim(),
      maxEstimatesDays: (parseFloat(item.threshold1.max) / 8).toFixed(2),
      minEstimatesDays: (parseFloat(item.threshold1.min) / 8).toFixed(2),
    }));

    console.log("aa", payload);

    submitRequirements(payload);
  };

  // 9️⃣ Add & Delete row handlers
  const handleAddRow = () => {
    const newRow = {
      key: Date.now().toString(),
      moduleName: "",
      featureName: "",
      assumptions: "",
      additionalComments: "",
      threshold1: { min: "", max: "" },
      threshold2: { min: "", max: "" },
    };
    setDataSource([...dataSource, newRow]);
  };

  const handleDeleteLastRow = () => {
    const updatedData = [...dataSource];
    updatedData.pop();
    setDataSource(updatedData);
    message.success("Last row deleted.");
  };

  const isDeleteDisabled = dataSource.length === 0;

  // 🔟 Render editable cell
  const renderEditableCell = (rowIndex, field, value, parentKey = null) => {
    console.log("aa", value);
    const cellKey = `${parentKey || ""}_${field}`;
    const isEditing =
      editingCell.row === rowIndex && editingCell.field === cellKey;
    const isEdited = value !== "";

    return isEditing ? (
      <Input
        autoFocus
        value={value}
        onChange={(e) =>
          handleCellChange(rowIndex, field, e.target.value, parentKey)
        }
        onBlur={() => setEditingCell({ row: null, field: null })}
        onPressEnter={() => setEditingCell({ row: null, field: null })}
        size="small"
      />
    ) : (
      <div
        className={isEdited ? "edited-cell" : ""}
        onDoubleClick={() => setEditingCell({ row: rowIndex, field: cellKey })}
      >
        {value || <span style={{ color: "#ccc" }}>Double-click to edit</span>}
      </div>
    );
  };

  // Table Columns
  const columns = [
    {
      title: "Module Name",
      dataIndex: "moduleName",
      render: (_, record, rowIndex) =>
        renderEditableCell(rowIndex, "moduleName", record.moduleName),
    },
    {
      title: "Feature Name",
      dataIndex: "featureName",
      render: (_, record, rowIndex) =>
        renderEditableCell(rowIndex, "featureName", record.featureName),
    },
    {
      title: "Assumptions",
      dataIndex: "assumptions",
      render: (_, record, rowIndex) =>
        renderEditableCell(rowIndex, "assumptions", record.assumptions),
    },
    {
      title: "Additional Comments",
      dataIndex: "additionalComments",
      render: (_, record, rowIndex) =>
        renderEditableCell(
          rowIndex,
          "additionalComments",
          record.additionalComments
        ),
    },
    {
      title: "Estimates (hrs)",
      children: [
        {
          title: "Min",
          render: (_, record, rowIndex) =>
            renderEditableCell(
              rowIndex,
              "min",
              record.threshold1.min,
              "threshold1"
            ),
        },
        {
          title: "Max",
          render: (_, record, rowIndex) =>
            renderEditableCell(
              rowIndex,
              "max",
              record.threshold1.max,
              "threshold1"
            ),
        },
      ],
    },
    {
      title: "Estimates (days)",
      children: [
        {
          title: "Min",
          render: (_, record) => {
            const minHrs = parseFloat(record.threshold1.min);
            return !isNaN(minHrs) ? (minHrs / 8).toFixed(2) : "";
          },
        },
        {
          title: "Max",
          render: (_, record) => {
            const maxHrs = parseFloat(record.threshold1.max);
            return !isNaN(maxHrs) ? (maxHrs / 8).toFixed(2) : "";
          },
        },
      ],
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 40, fontSize: 20 }}>
        Features Implementation (UI Development + Unit testing + Workflows +
        Code Review + Integration + Code merge)
      </h2>

      {isFetching ? (
        <Spin tip="Loading data..." />
      ) : (
        <>
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={false}
          />

          <div className="table-toolbar">
            <Tooltip title="Add a row">
              <PlusCircleOutlined className="icon" onClick={handleAddRow} />
            </Tooltip>
            <Popconfirm
              title="Are you sure you want to delete the last row?"
              onConfirm={handleDeleteLastRow}
              okText="Yes"
              cancelText="No"
              disabled={isDeleteDisabled}
            >
              <Tooltip
                title={
                  isDeleteDisabled ? "No rows to delete" : "Delete last row"
                }
              >
                <DeleteOutlined className="icon delete-icon" />
              </Tooltip>
            </Popconfirm>
          </div>

          <div className="button-group">
            <Tooltip title={isAnyFieldEmpty ? "Fields cannot be empty" : ""}>
              <Button
                type="primary"
                onClick={handleUpdate}
                loading={isLoading}
                disabled={isAnyFieldEmpty}
              >
                Update
              </Button>
            </Tooltip>
            <Button className="next-button" onClick={() => navigate("/test")}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Features;
