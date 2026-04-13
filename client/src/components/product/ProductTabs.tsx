const ProductTabs = () => {
  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-8 border-b pb-2 text-sm uppercase">
        <span className="border-b-2 border-black pb-2 font-semibold">
          Description
        </span>
        <span className="text-gray-400">Specifications</span>
        <span className="text-gray-400">Customer Reviews</span>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-10 mt-6">

        {/* LEFT */}
        <div>
          <h2 className="font-semibold text-lg mb-3">
            The Science of Sound
          </h2>

          <p className="text-gray-600 text-sm mb-4">
            Our proprietary acoustic platform delivers powerful sound with deep bass.
          </p>

          <p className="text-gray-600 text-sm">
            Active Noise Cancelling blocks external noise for immersive experience.
          </p>
        </div>

        {/* RIGHT */}
        <div className="space-y-3 text-sm">
          {[
            ["Driver Size", "40mm Dynamic"],
            ["Connectivity", "Bluetooth 5.2, 3.5mm Jack"],
            ["Battery Life", "40 Hours"],
            ["Weight", "250g"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between border-b pb-2"
            >
              <span className="text-gray-400 uppercase text-xs">
                {label}
              </span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;