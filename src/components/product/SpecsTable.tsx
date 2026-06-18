type SpecsTableProps = {
  specs: Record<string, string>;
};

export function SpecsTable({ specs }: SpecsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5">
      <table className="w-full text-sm">
        <tbody>
          {Object.entries(specs).map(([key, value], i) => (
            <tr
              key={key}
              className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"}
            >
              <td className="px-5 py-3.5 font-medium text-gray-400 w-2/5">
                {key}
              </td>
              <td className="px-5 py-3.5 text-white">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
