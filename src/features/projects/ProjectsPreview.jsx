import { MdOutlineWork } from "react-icons/md";
import DivideLine from "../../ui/DivideLine";
import InfiniteCarousel from "../../ui/InfiniteCarousel";

import ImgSmForkify from "../../assets/images/project-images/forkify-project-sm.webp";
import ImgSmBankist from "../../assets/images/project-images/project-omnifood-sm.webp";
import ImgSmBankistApp from "../../assets/images/project-images/project-bankist-app-sm.webp";
import ImgSmMapty from "../../assets/images/project-images/project-mapty-sm.webp";
import ImgSmOmnifood from "../../assets/images/project-images/project-omnifood-sm.webp";
import ImgSmWeatherCard from "../../assets/images/project-images/Weather-card-sm.webp";
import ImgSmWorldWise from "../../assets/images/project-images/worldWise-project-sm.webp";
import Button from "../../ui/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxLink2, RxLinkBreak2 } from "react-icons/rx";

function ProjectsPreview() {
  return (
    <div className="group relative mx-2 mb-4 mt-6 max-w-md cursor-pointer rounded-xl border border-border-primary bg-primary-500 p-6 shadow-lg">
      <div className="relative mb-1 flex items-center gap-2">
        <MdOutlineWork className="text-text" size={25} />
        <h1 className="text-3xl font-bold text-gray-200">Projects</h1>

        <RxLink2
          size={30}
          className="absolute -right-4 bottom-6 -rotate-90 text-primary-300 transition-all duration-300 group-hover:opacity-0"
        />
        <RxLinkBreak2
          size={30}
          className="absolute -right-4 bottom-6 -rotate-90 text-primary-300 opacity-0 transition-all duration-300 group-hover:opacity-100"
        />
      </div>
      <DivideLine type="forIcon" />
      <p className="mt-2 text-sm tracking-wide text-gray-300 sm:text-base">
        Take a look at some of the projects I&#39;ve developed
      </p>

      {/* projects slider */}
      <div className="mt-4">
        <InfiniteCarousel
          images={[
            ImgSmForkify,
            ImgSmBankist,
            ImgSmBankistApp,
            ImgSmMapty,
            ImgSmOmnifood,
            ImgSmWeatherCard,
            ImgSmWorldWise,
          ]}
        />
      </div>

      <div className="text-md group:opacity-0 group:translate-y-0 absolute -bottom-2 left-1/2 z-10 w-full -translate-x-1/2 bg-primary-500/60 py-1.5 opacity-0 backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:-translate-y-8 group-hover:opacity-100">
        <Button
          type="plain"
          className="z-10 m-auto gap-1 opacity-0 transition-[gap] duration-150 ease-in hover:gap-2 hover:text-primary-300 group-hover:opacity-100 group-hover:transition-[opacity] group-hover:duration-700"
          hover={false}
        >
          View All <FaArrowRightLong />
        </Button>
      </div>
    </div>
  );
}

export default ProjectsPreview;
