interface DebuggerProps {
  data: any;
}

function isSerializable(value: any): boolean {
  try {
    JSON.stringify(value);
    return true;
  } catch {
    return false;
  }
}

export const Debugguer: React.FC<DebuggerProps> = ({ data }) => {
  const renderData = (data: any): string => {
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
    <div className="fixed top-4 left-4 z-50 max-h-96 max-w-lg overflow-y-auto rounded-lg bg-black/75 shadow-lg whitespace-pre-wrap p-3 text-left opacity-95 backdrop-blur-sm">
      <h2 className="text-sm opacity-80 text-white font-bold">Debugger</h2>
      <pre className="text-sm opacity-80 text-white font-light">{renderData(data)}</pre>
    </div>
  );
};
