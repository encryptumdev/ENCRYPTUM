const NoUploadedDoc = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="w-full h-[240px] relative">
        <div className="absolute inset-0">
          <p className="text-cyan-400">4</p>
        </div>
        <div className="w-full h-full relative bg-white/10 rounded-lg overflow-hidden">
          HELLO
        </div>
      </div>
    </div>
  );
};

export default NoUploadedDoc;
