import graduation1 from "/src/assets/graduation1.jpg";
import graduation2 from "/src/assets/graduation2.jpg";
import graduation3 from "/src/assets/graduation3.jpg";
import graduation4 from "/src/assets/graduation4.jpg";
import graduation5 from "/src/assets/graduation5.jpg";

const graduateImages = [
  graduation1,
  graduation2,
  graduation3,
  graduation4,
  graduation5,
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
