import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  } from "recharts";
  
  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6", "#ec4899"];
  
  export default function ChartSection({ data, darkMode}) {
    if (!data || data.length === 0) return null;
  
    const columns = Object.keys(data[0]);
    const labelCol = columns[0];
    const numericCols = columns.filter((col) =>
      data.slice(0, 5).every((row) => !isNaN(parseFloat(row[col])))
    );
  
    if (numericCols.length === 0) return (
      <p className="text-gray-400 text-center mt-4">No numeric columns found for charts.</p>
    );
  
    // Build chart data with ALL numeric columns
    const chartData = data.slice(0, 15).map((row) => {
      const entry = { name: row[labelCol]?.toString().slice(0, 12) || "N/A" };
      numericCols.forEach((col) => {
        entry[col] = parseFloat(row[col]) || 0;
      });
      return entry;
    });
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
  
        {/* Bar Chart — all columns */}
        <div className={`${darkMode ? "bg-gray-900" : "bg-white"} rounded-xl shadow p-4`}>
        <h3 className={`font-semibold mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}></h3>
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              {numericCols.map((col, i) => (
                <Bar key={col} dataKey={col} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
  
        {/* Line Chart — all columns */}
        <div className={`${darkMode ? "bg-gray-900" : "bg-white"} rounded-xl shadow p-4`}>
          <h3 className="font-semibold text-gray-700 mb-3">Line Chart</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              {numericCols.map((col, i) => (
                <Line
                  key={col}
                  type="monotone"
                  dataKey={col}
                  stroke={COLORS[i % COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
  
        {/* Pie Charts — one per numeric column */}
        {numericCols.map((col, i) => (
          <div key={col} className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold text-gray-700 mb-3">Pie Chart — {col}</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey={col}
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ))}
  
      </div>
    );
  }