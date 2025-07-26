import { useParams, Link, useNavigate } from "react-router-dom";
import collegesData from "../data/colleges";
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaClipboardList,
  FaFutbol,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import { parse } from "date-fns";
import { useEffect, useState } from "react";

const splitLines = (text) =>
  text
    ?.split(/[,;]\s*/)
    .map((line) => line.trim())
    .filter(Boolean) || [];

function formatTime(ms) {
  if (ms <= 0) return null;
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function CountdownBox({ label, value }) {
  return (
    <div className="flex flex-col items-center bg-white border border-gray-300 rounded-lg px-4 py-3 min-w-[60px]">
      <span className="text-2xl font-mono font-semibold">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

const CollegeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const college = collegesData.find((c) => c.id === id);

  const [timeLeft, setTimeLeft] = useState(null);
  const [status, setStatus] = useState("loading");
  const [daysAgo, setDaysAgo] = useState(null);

  useEffect(() => {
    if (!college) return;

    const [startStr, endStr] = college.admissionDates
      .split(" - ")
      .map((d) => d.trim());
    const now = new Date();
    const year = now.getFullYear();

    const startDate = parse(`${startStr} ${year}`, "MMM d yyyy", now);
    const endDate = parse(`${endStr} ${year}`, "MMM d yyyy", now);

    function updateTimer() {
      const current = new Date();

      if (current < startDate) {
        // Admissions not started yet
        const diff = startDate - current;
        setTimeLeft(formatTime(diff));
        setStatus("not-started");
        setDaysAgo(null);
      } else if (current >= startDate && current <= endDate) {
        // Admissions open
        const diff = endDate - current;
        setTimeLeft(formatTime(diff));
        setStatus("open");
        setDaysAgo(null);
      } else {
        // Admissions closed
        setTimeLeft(null);
        setStatus("closed");
        setDaysAgo(Math.floor((current - endDate) / (1000 * 3600 * 24)));
      }
    }

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [college]);

  if (!college) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-red-600">
          College Not Found
        </h2>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const admissionLines = splitLines(college.admissionProcess);
  const eventsLines = splitLines(college.eventsDetails || college.events);
  const researchLines = splitLines(
    college.researchWorks || college.researchHistory
  );
  const sportsLines = splitLines(college.sportsCategories || college.sports);

  const statusText = {
    "not-started": "Admissions open in:",
    open: "Admissions close in:",
    closed: `Admissions closed ${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`,
  };

  const statusColor = {
    "not-started": "text-yellow-600",
    open: "text-green-600",
    closed: "text-red-600",
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl text-gray-800">
      {/* Hero Header */}
      <section className="hero bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl shadow-xl mb-12">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={college.image}
            alt={`${college.name} campus`}
            className="max-w-lg rounded-2xl shadow-lg object-cover h-80"
          />
          <div className="lg:ml-12 text-center lg:text-left">
            <h1 className="text-5xl font-bold text-blue-800">{college.name}</h1>
            <p className="py-4 text-lg max-w-xl text-gray-600">
              Discover opportunities, student life, and excellence at{" "}
              <span className="font-semibold">{college.name}</span>.
            </p>
            <p className="text-md text-gray-700 mb-4 flex items-center justify-center lg:justify-start">
              <FaCalendarAlt className="inline mr-2 text-blue-500" />
              <span className="font-medium">Admission Dates:</span>&nbsp;{" "}
              {college.admissionDates}
            </p>

            {/* Countdown UI */}
            <div
              className={`flex flex-col items-center lg:items-start space-y-2`}
            >
              <p className={`text-lg font-semibold ${statusColor[status]}`}>
                <FaClock className="inline mr-2" />
                {statusText[status]}
              </p>
              {status !== "closed" && timeLeft ? (
                <div className="flex space-x-3 bg-white p-3 rounded-lg shadow-md">
                  <CountdownBox label="Days" value={timeLeft.days} />
                  <CountdownBox label="Hours" value={timeLeft.hours} />
                  <CountdownBox label="Minutes" value={timeLeft.minutes} />
                  <CountdownBox label="Seconds" value={timeLeft.seconds} />
                </div>
              ) : (
                <p className={`text-red-600 font-semibold mt-2`}>
                  Admissions are currently closed.
                </p>
              )}
            </div>

            <Link to="/colleges" className="btn btn-primary mt-6 inline-block">
              ← Back to All Colleges
            </Link>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[
          {
            icon: <FaClipboardList className="text-3xl text-blue-600" />,
            title: "Admission Process",
            lines: admissionLines,
          },
          {
            icon: <FaCalendarAlt className="text-3xl text-purple-600" />,
            title: "Events & Activities",
            lines: eventsLines,
          },
          {
            icon: <FaGraduationCap className="text-3xl text-green-600" />,
            title: "Research Highlights",
            lines: researchLines,
          },
          {
            icon: <FaFutbol className="text-3xl text-yellow-600" />,
            title: "Sports & Clubs",
            lines: sportsLines,
          },
        ].map(({ icon, title, lines }) => (
          <div
            key={title}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center mb-4">
              <span className="mr-3">{icon}</span>
              <h2 className="text-xl font-bold">{title}</h2>
            </div>
            {lines.length > 0 ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                {lines.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="italic text-gray-500">
                Info will be available soon.
              </p>
            )}
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="bg-white border border-blue-100 shadow-inner rounded-xl p-8 mb-16 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700 flex justify-center items-center">
          <FaUsers className="mr-2" /> Student Testimonials
        </h2>
        <div className="space-y-6 text-gray-700 text-base leading-relaxed italic">
          <p>
            “Attending {college.name} was the best decision I’ve made.
            Supportive mentors and lifelong friends!”
          </p>
          <p>
            “The vibrant campus life and cutting-edge research projects pushed
            me to grow academically and personally.”
          </p>
        </div>
      </section>

      {/* Back Button */}
      <div className="text-center">
        <Link
          to="/"
          className="btn btn-outline btn-primary"
          aria-label="Back to Home"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CollegeDetails;
