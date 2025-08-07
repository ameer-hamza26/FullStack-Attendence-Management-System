export default function AttendanceTable({ records }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow mt-4">
        <thead>
          <tr className="bg-green-100 text-green-700">
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec._id} className="border-b hover:bg-green-50">
              <td className="py-2 px-4">{new Date(rec.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 capitalize">{rec.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}