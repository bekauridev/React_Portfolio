import TimeLineCard from "./TimeLineCard";

function TimeLine() {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      <TimeLineCard
        date="December, 2024"
        title="Diploma in Web Technology"
        description="Acquired the majority of my programming knowledge, focusing on core concepts,
          practical skills,Developed a strong foundation in web technologies and
          programming principles."
        learningPlace="LEPL - College Gldani <br /> Vocational Education and Training Center"
      />
      <TimeLineCard
        date="September 2024"
        title="Certificate in Web Programming  (Python)"
        description="I gained a solid understanding of Python programming and practical exposure to
            Django for developing dynamic web applications."
        learningPlace="LEPL - College Gldani <br /> Vocational Education and Training Center"
      />
      <TimeLineCard
        date="December 2022"
        title="Diploma in Information Technology Support"
        description="I gained a foundational knowledge of PC components, assembly, and repair. <br /> Developed practical skills in router installation and basic network setup"
        learningPlace=" Interbusiness Academy, LTD"
      />
      <TimeLineCard
        className="mb-0"
        date="July 2023"
        title="General Education Diploma"
        description="High school was a pivotal time where I gained valuable knowledge, enjoyed meaningful experiences, and completed an IT Support course, building a strong foundation for my future in technology."
        learningPlace="LEPL - Tbilisi Public School №154"
      />
    </ol>
  );
}

export default TimeLine;
