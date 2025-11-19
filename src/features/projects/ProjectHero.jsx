function ProjectHero({ name, slogan, image }) {
  return (
    <div className="relative mb-10 h-72 w-full overflow-hidden rounded-3xl">
      <img
        src={image}
        alt={`${name} cover`}
        className="h-full w-full object-cover opacity-85 transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
      <div className="absolute bottom-6 left-6">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">{name}</h1>
        <p className="mt-2 max-w-xl text-gray-300">{slogan}</p>
      </div>
    </div>
  );
}

export default ProjectHero;
