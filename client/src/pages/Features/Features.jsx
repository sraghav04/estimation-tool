import { Table } from "antd";

const Features = () => {
  const columns = [
    {
      title: "Feature Name",
      dataIndex: "featureName",
      key: "featureName",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Threshold 1",
      children: [
        {
          title: "Min",
          dataIndex: ["threshold1", "min"],
          key: "threshold1Min",
        },
        {
          title: "Max",
          dataIndex: ["threshold1", "max"],
          key: "threshold1Max",
        },
      ],
    },
    {
      title: "Threshold 2",
      children: [
        {
          title: "Min",
          dataIndex: ["threshold2", "min"],
          key: "threshold2Min",
        },
        {
          title: "Max",
          dataIndex: ["threshold2", "max"],
          key: "threshold2Max",
        },
      ],
    },
  ];

  const dataSource = [
    {
      key: "1",
      featureName: "Speed",
      category: "Performance",
      type: "Numeric",
      description: "Measures processing speed",
      threshold1: { min: 10, max: 100 },
      threshold2: { min: 5, max: 50 },
    },
    {
      key: "2",
      featureName: "Storage",
      category: "Capacity",
      type: "Numeric",
      description: "Available storage space",
      threshold1: { min: 50, max: 500 },
      threshold2: { min: 30, max: 300 },
    },
  ];

  return (
    <div>
      <h2>Features Table</h2>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={false}
      />
    </div>
  );
};

export default Features;
