import { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import KPICards from "./components/KPICards";
import ChartSection from "./components/ChartSection";
import InsightCard from "./components/InsightCard";

export default function App() {
  const [csvData, setCsvData] = useState([]);
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Persist dark mode preference
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const theme = {
    bg: darkMode ? "bg-gray-950" : "bg-gray-100",
    header: darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200",
    text: darkMode ? "text-white" : "text-gray-800",
    subtext: darkMode ? "text-gray-400" : "text-gray-500",
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>

      {/* Header */}
      <div className={`${theme.header} border-b px-8 py-4 flex items-center justify-between shadow-sm`}>

        {/* Left — Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
            <span className="text-white text-xl">📊</span>
          </div>
          <div>
            <h1 className={`text-xl font-bold ${theme.text}`}>
              AI Analytics Dashboard
            </h1>
            <p className={`text-xs ${theme.subtext}`}>
              Upload any CSV · Get instant AI-powered insights
            </p>
          </div>
        </div>

        {/* Right — Dark mode + Reset */}
        <div className="flex items-center gap-3">

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              darkMode
                ? "bg-indigo-600 text-white hover:bg-indigo-500"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* Reset Button */}
          {csvData.length > 0 && (
            <button
              onClick={() => { setCsvData([]); setInsight(""); }}
              className="text-sm text-red-400 hover:text-red-600 border border-red-300 px-3 py-2 rounded-full transition"
            >
              ↺ Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {csvData.length === 0 && !loading && (
          <FileUpload
            onDataLoaded={setCsvData}
            onInsightLoaded={setInsight}
            setLoading={setLoading}
            darkMode={darkMode}
          />
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-indigo-400 font-medium">Analyzing your data with AI...</p>
          </div>
        )}

        {csvData.length > 0 && !loading && (
          <>
            <KPICards data={csvData} darkMode={darkMode} />
            <ChartSection data={csvData} darkMode={darkMode} />
            <InsightCard insight={insight} darkMode={darkMode} />
          </>
        )}
      </div>
    </div>
  );
}