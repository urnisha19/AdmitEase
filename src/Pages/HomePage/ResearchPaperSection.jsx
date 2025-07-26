const researchPapers = [
  {
    title: "AI and Machine Learning Advances",
    url: "https://example.com/paper1",
  },
  { title: "Sustainable Energy Solutions", url: "https://example.com/paper2" },
  {
    title: "Modern Web Development Techniques",
    url: "https://example.com/paper3",
  },
];

const ResearchPaperSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Research Papers</h2>
      <ul className="space-y-4 max-w-2xl mx-auto">
        {researchPapers.map((paper, i) => (
          <li key={i}>
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-lg font-medium"
            >
              📘 {paper.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResearchPaperSection;
