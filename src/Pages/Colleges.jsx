import { useState } from "react";
import { Link } from "react-router-dom";
import collegesData from "../data/colleges";

const Colleges = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredColleges = collegesData.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        Explore Top Colleges
      </h1>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="🔍 Search by college name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full"
          aria-label="Search colleges by name"
        />
      </div>

      {/* College Cards Grid */}
      {filteredColleges.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredColleges.map((college) => (
            <div
              key={college.id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300 border border-gray-200"
            >
              <figure>
                <img
                  src={college.image}
                  alt={`${college.name} campus`}
                  className="w-full h-52 object-cover"
                  loading="lazy"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title line-clamp-1">{college.name}</h2>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  <div className="badge badge-info gap-1">
                    ⭐ {college.rating || "4.5"}
                  </div>
                  <div className="badge badge-accent gap-1">
                    📚{" "}
                    {college.researchWorks?.split(",").filter(Boolean).length ||
                      0}{" "}
                    Research Papers
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  🗓️ Admission:{" "}
                  <span className="font-medium text-gray-700">
                    {college.admissionDates}
                  </span>
                </p>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/college/${college.id}`}
                    className="btn btn-sm btn-primary"
                    aria-label={`View details for ${college.name}`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No colleges match your search.
        </p>
      )}
    </div>
  );
};

export default Colleges;
