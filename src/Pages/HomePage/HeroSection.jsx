import { useState, useEffect } from "react";
import collegesData from "../../data/colleges";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredColleges([]);
    } else {
      const filtered = collegesData.filter((college) =>
        college.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setFilteredColleges(filtered);
    }
  }, [searchQuery]);

  return (
    <div
      className="hero h-[500px] bg-cover bg-center relative"
      style={{ backgroundImage: `url('/src/assets/hero.webp')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-md">
            Discover Your Future
            <br /> at Top Universities
          </h1>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for a college…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-md border focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Search Results */}
      {filteredColleges.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Search Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredColleges.map((college) => (
              <div
                key={college.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
              >
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-2">
                  <h3 className="text-xl font-bold">{college.name}</h3>
                  <p>
                    <span className="font-semibold">Admission:</span>{" "}
                    {college.admissionDates}
                  </p>
                  <p>
                    <span className="font-semibold">Events:</span>{" "}
                    {college.events}
                  </p>
                  <p>
                    <span className="font-semibold">Research:</span>{" "}
                    {college.researchHistory}
                  </p>
                  <p>
                    <span className="font-semibold">Sports:</span>{" "}
                    {college.sports}
                  </p>
                  <Link to={`/college/${college.id}`}>
                    <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HeroSection;
