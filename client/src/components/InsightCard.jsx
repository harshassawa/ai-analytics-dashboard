export default function InsightCard({ insight, darkMode }) {
    if (!insight) return null;
  
    return (
      <div className={`rounded-xl p-5 mt-6 shadow border transition ${
        darkMode
          ? "bg-gray-900 border-indigo-700"
          : "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200"
      }`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🤖</span>
          <h3 className={`font-bold text-lg ${darkMode ? "text-indigo-400" : "text-indigo-700"}`}>
            AI Insights
          </h3>
        </div>
        <p className={`whitespace-pre-line leading-relaxed text-sm ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}>
          {insight}
        </p>
      </div>
    );
  }