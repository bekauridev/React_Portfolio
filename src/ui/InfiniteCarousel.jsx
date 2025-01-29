// import Marquee from "react-fast-marquee";

// const InfiniteCarousel = ({ images }) => {
//   return (
//     <div className="relative w-full overflow-hidden">
//       <div
//         className="m-auto mb-2 w-full"
//         style={{
//           maskImage:
//             "linear-gradient(to right, transparent, gray 50%, gray 50%, transparent)",
//           WebkitMaskImage:
//             "linear-gradient(to right, transparent, gray 50%, gray 10%, transparent)",
//         }}
//       >
//         <Marquee
//           className="ml-2 overflow-hidden"
//           speed={50} // Adjust the speed of the marquee
//           pauseOnHover={false} // Pause on hover
//           // gradient={true} // Disable gradient (or set it to true if you want)
//           // gradientWidth={50}
//           // gradientColor={"#0f1232"}
//           // autoFill={true}
//         >
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className="relative mx-2"
//               style={{
//                 flex: "0 0 auto",
//                 // width: "calc(100% - 8px)",
//               }}
//             >
//               <div className="md:h-34 h-28 w-full overflow-hidden rounded-md object-cover sm:h-32">
//                 <img
//                   src={image}
//                   alt={`Slide ${index + 1}`}
//                   className="box-content h-full w-full"
//                 />
//               </div>
//               {/* Add a semi-transparent gray overlay */}
//               <div className="backdrop absolute inset-0 rounded-lg bg-primary-800/20"></div>
//             </div>
//           ))}
//         </Marquee>
//       </div>
//     </div>
//   );
// };

// export default InfiniteCarousel;
import Marquee from "react-fast-marquee";

const InfiniteCarousel = ({ images }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="m-auto mb-2 w-full"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, gray 50%, gray 50%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, gray 50%, gray 10%, transparent)",
        }}
      >
        <Marquee className="ml-2 overflow-hidden" speed={50} pauseOnHover={false}>
          {images.map((image, index) => (
            <div key={index} className="relative mx-2">
              <div className="md:h-34 h-28 w-full overflow-hidden rounded-md">
                <img
                  src={image} // Change to image.src if using an object
                  alt={`Slide ${index + 1}`}
                  className="box-content h-full w-full object-cover"
                />
              </div>
              {/* Add a semi-transparent gray overlay */}
              <div className="backdrop absolute inset-0 rounded-lg bg-primary-800/20"></div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default InfiniteCarousel;
