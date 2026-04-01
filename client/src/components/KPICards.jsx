export default function KPICards({ data, darkMode }) {
    if (!data || data.length === 0) return null;
  
    const totalRows = data.length;
    const columns = Object.keys(data[0]);
    const totalColumns = columns.length;
  
    const numericCol = columns.find((col) =>
      data.slice(0, 5).every((row) => !isNaN(parseFloat(row[col])))
    );
  
    const total = numericCol
      ? data.reduce((sum, row) => sum + parseFloat(row[numericCol] || 0), 0).toFixed(2)
      : "N/A";
  
    const cards = [
      { label: "Total Rows", value: totalRows, color: "bg-blue-500" },
      { label: "Total Columns", value: totalColumns, color: "bg-purple-500" },
      { label: `Total (${numericCol || "—"})`, value: total, color: "bg-green-500" },
      { label: "Avg per Row", value: numericCol ? (total / totalRows).toFixed(2) : "N/A", color: "bg-orange-500" },
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        {cards.map((card) => (
          <div key={card.label} className={`${card.color} text-white rounded-xl p-4 shadow`}>
            <p className="text-sm opacity-80">{card.label}</p>
            <p className="text-2xl font-bold mt-1">{card.value}</p>
          </div>
        ))}
      </div>
    );
  }