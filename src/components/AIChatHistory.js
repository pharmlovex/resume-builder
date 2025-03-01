import html2pdf from "html2pdf.js";

function AIChatHistory({ messages }) {
  const handleDownloadPDF = () => {
    const element = document.getElementById("chat-history");
    const opt = {
      margin: 1,
      filename: "chat-history.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div>
      <button
        onClick={handleDownloadPDF}
        className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Download PDF
      </button>
      <div id="chat-history">{/* ... existing chat history content ... */}</div>
    </div>
  );
}

export default AIChatHistory;
