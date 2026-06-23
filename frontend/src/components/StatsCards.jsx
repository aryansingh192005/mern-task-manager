function StatsCards({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const stats = [
    { label: "Total Tasks", value: totalTasks },
    { label: "Completed", value: completedTasks },
    { label: "Pending", value: pendingTasks },
    { label: "High Priority", value: highPriorityTasks },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <h3>{stat.value}</h3>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;