import collegesData from "../../data/colleges";
import { Link } from "react-router-dom";

const FeaturedCollegesSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Colleges
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collegesData.slice(0, 3).map((college) => (
            <div
              key={college.id}
              className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition"
            >
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                Top
              </div>
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{college.name}</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    <strong>Admission:</strong> {college.admissionDates}
                  </li>
                  <li>
                    <strong>Events:</strong> {college.events}
                  </li>
                  <li>
                    <strong>Research:</strong> {college.researchHistory}
                  </li>
                  <li>
                    <strong>Sports:</strong> {college.sports}
                  </li>
                </ul>
                <Link to={`/college/${college.id}`}>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollegesSection;
