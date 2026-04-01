import { useState } from "react";
import axios from "axios";

export default function FileUpload({ onDataLoaded, onInsightLoaded, setLoading, darkMode }) {
  const [fileName, setFileName] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadRes = await axios.post("http://localhost:5000/api/upload", formData);
      const csvData = uploadRes.data.data;
      onDataLoaded(csvData);

      const insightRes = await axios.post("http://localhost:5000/api/insights", {
        data: csvData,
      });
      onInsightLoaded(insightRes.data.insight);
    } catch (err) {
      alert("Something went wrong. Make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className={`w-full max-w-lg border-2 border-dashed rounded-2xl p-12 text-center transition ${
        darkMode
          ? "border-indigo-500 bg-gray-900 hover:bg-gray-800"
          : "border-indigo-300 bg-indigo-50 hover:bg-indigo-100"
      }`}>
        <div className="text-5xl mb-4">📂</div>
        <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Drop your CSV file here or click to browse
        </p>
        <label className="cursor-pointer bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition text-sm font-medium">
          Choose CSV File
          <input type="file" accept=".csv" className="hidden" onChange={handleUpload} />
        </label>
        {fileName && (
          <p className="mt-4 text-green-500 text-sm font-medium">✅ {fileName} uploaded</p>
        )}
      </div>
    </div>
  );
}