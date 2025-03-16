
const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-movesync-gray-light text-movesync-black rounded-2xl rounded-tl-none px-4 py-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-movesync-gray rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-movesync-gray rounded-full animate-pulse animation-delay-200"></div>
          <div className="w-2 h-2 bg-movesync-gray rounded-full animate-pulse animation-delay-400"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
