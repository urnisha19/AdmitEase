import { useState } from "react";
import colleges from "../../data/colleges";
import { FaUniversity } from "react-icons/fa";
import AdmissionForm from "./AdmissionForm";

const Admission = () => {
  const [selectedCollege, setSelectedCollege] = useState(null);

  const handleSuccess = () => {
    setSelectedCollege(null);
  };

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-blue-700">
        🎓 Apply for Admission
      </h2>

      <p className="text-center mb-10 text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Choose your preferred college below to start the admission process. Fill
        in your details in the admission form accurately and submit to get
        started.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {colleges.map((college) => (
          <button
            key={college.id}
            className={`p-5 rounded-lg shadow-md transition duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              selectedCollege?.id === college.id
                ? "bg-blue-600 text-white border-blue-700"
                : "hover:bg-blue-50 border-transparent"
            }`}
            onClick={() => setSelectedCollege(college)}
            aria-pressed={selectedCollege?.id === college.id}
            aria-label={`Apply to ${college.name}`}
          >
            <div className="flex items-center gap-3 justify-center">
              <FaUniversity className="text-2xl" />
              <h3 className="text-lg font-semibold">{college.name}</h3>
            </div>
          </button>
        ))}
      </div>

      {selectedCollege && (
        <div className="mt-10">
          <AdmissionForm
            selectedCollege={selectedCollege}
            onSuccess={handleSuccess}
          />
        </div>
      )}
    </div>
  );
};

export default Admission;
