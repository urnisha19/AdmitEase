const graduateImages = [
  "/src/assets/graduation 1.jpg",
  "/src/assets/graduation 2.jpg",
  "/src/assets/graduation 3.jpg",
  "/src/assets/graduation 4.jpg",
  "/src/assets/graduation 5.jpg",
];

const GraduateGallerySection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Graduate Gallery</h2>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-5 auto-rows-[180px]">
        <img
          src={graduateImages[0]}
          alt="Gallery 1"
          className="col-span-1 row-span-2 object-cover w-full h-full rounded-xl shadow"
        />
        <img
          src={graduateImages[1]}
          alt="Gallery 2"
          className="col-span-1 object-cover w-full h-full rounded-xl shadow"
        />
        <img
          src={graduateImages[2]}
          alt="Gallery 3"
          className="col-span-1 object-cover w-full h-full rounded-xl shadow"
        />
        <img
          src={graduateImages[3]}
          alt="Gallery 4"
          className="col-span-2 row-span-2 object-cover w-full h-full rounded-xl shadow"
        />
        <img
          src={graduateImages[4]}
          alt="Gallery 5"
          className="col-span-1 object-cover w-full h-full rounded-xl shadow"
        />
      </div>
    </div>
  );
};

export default GraduateGallerySection;
