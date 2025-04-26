import React, { useEffect, useState } from "react";

const ChatResponseTable = ({ response }) => {
  const [project, setProject] = useState({
    title: "",
    duration: "",
    team: "",
    weeks: [],
    generalTasks: [],
  });

  useEffect(() => {
    parseResponse(response);
  }, [response]);

  const parseResponse = (text) => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    let currentWeek = null;
    const weeks = [];
    let generalTasks = [];

    let projectTitle = lines[0].replace("Project Title: ", "").trim();
    let projectDuration = lines[1].replace("Project Duration: ", "").trim();
    let teamMembers = lines[2].replace("Team Members: ", "").trim();

    for (let i = 3; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith("Week")) {
        currentWeek = {
          title: line,
          tasks: [],
        };
        weeks.push(currentWeek);
      } else if (line.startsWith("Throughout the project:")) {
        currentWeek = null; // end week parsing
      } else if (line.startsWith("-")) {
        if (currentWeek) {
          currentWeek.tasks.push(line.slice(1).trim());
        } else {
          generalTasks.push(line.slice(1).trim());
        }
      }
    }

    setProject({
      title: projectTitle,
      duration: projectDuration,
      team: teamMembers,
      weeks,
      generalTasks,
    });
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>{project.title}</h2>
      <p>
        <strong>Duration:</strong> {project.duration}
      </p>
      <p>
        <strong>Team Members:</strong> {project.team}
      </p>

      <h3>Weekly Plan</h3>
      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Week</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {project.weeks.map((week, idx) => (
            <tr key={idx}>
              <td>{week.title}</td>
              <td>
                <ul>
                  {week.tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {project.generalTasks.length > 0 && (
        <>
          <h3>Throughout the Project</h3>
          <ul>
            {project.generalTasks.map((task, idx) => (
              <li key={idx}>{task}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ChatResponseTable;
