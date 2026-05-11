interface Props {
  onApprove: () => void;
  onReject: () => void;
  loading?: boolean;
}

export default function AssignmentActions({
  onApprove,
  onReject,
  loading,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onApprove();
        }}
        disabled={loading}
        className="
          px-2 py-1 text-xs rounded-md
          bg-green-100 text-green-700 ring-green-200 ring-1
          hover:bg-green-200 cursor-pointer animate-pulse hover:animate-none
        "
      >
        Approve
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onReject();
        }}
        disabled={loading}
        className="
          px-2 py-1 text-xs rounded-md
          bg-red-100 text-red-700 ring-red-200 ring-1
          hover:bg-red-200 cursor-pointer animate-pulse hover:animate-none
        "
      >
        Reject
      </button>
    </div>
  );
}
