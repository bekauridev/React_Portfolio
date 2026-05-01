import TimeLineCard from "./TimeLineCard";

function TimeLine({ items = [] }) {
  return (
    <ol className="relative border-s border-slate-700/50">
      {items.map((item) => (
        <TimeLineCard
          key={item.id}
          date={item.date}
          title={item.title}
          description={item.description}
          learningPlace={item.learningPlace}
          learningPlaceLink={item.learningPlaceLink}
        />
      ))}
    </ol>
  );
}

export default TimeLine;
