export default function StatusBadge({ status }) {

  const getColor = () => {
    if (status === "submitted" || status === "pending")
      return "bg-yellow-400";
    if (status === "in-progress")
      return "bg-blue-400";
    if (status === "resolved" || status === "found")
      return "bg-green-500";
    return "bg-gray-400";
  };

  return (
    <span className={`${getColor()} text-white px-3 py-1 rounded text-sm`}>
      {status}
    </span>
  );
}