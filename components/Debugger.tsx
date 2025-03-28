interface DebuggerProps {
  data: unknown;
}

function isSerializable(value: unknown): boolean {
  try {
    JSON.stringify(value);
    return true;
  } catch {
    return false;
  }
}

export const Debugger: React.FC<DebuggerProps> = ({ data }) => {
  const renderData = (data: unknown): string => {
    if (data === null || typeof data === 'undefined') {
      return String(data);
    }

    if (typeof data === 'object') {
      // Solo intenta serializar si es posible
      if (isSerializable(data)) {
        return JSON.stringify(data, null, 2);
      } else {
        return '[Non-serializable object]';
      }
    }

    return String(data);
  };

  return (
    <div className="fixed top-4 left-4 h-fit rounded-lg bg-black/20 outline outline-[1px] whitespace-pre-wrap outline-white/20 p-3 text-left opacity-95 backdrop-blur-sm">
      <pre className="text-sm opacity-80">{renderData(data)}</pre>
    </div>
  );
};
