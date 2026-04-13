const reviews = [
  {
    name: "Sarah L.",
    text: "Amazing sound quality and comfort!",
  },
  {
    name: "Michael B.",
    text: "Battery lasts long. Highly recommend.",
  },
  {
    name: "David K.",
    text: "Best headphones I've used.",
  },
];

const CustomerReviews = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Customer Reviews</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-medium">{review.name}</h3>
            <p className="text-yellow-400 text-sm">★★★★★</p>
            <p className="text-gray-600 text-sm mt-2">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;