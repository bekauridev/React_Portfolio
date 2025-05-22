function UserTechStackItem({ IconPath, Technology }) {
  return (
    <div className="flex items-center gap-1 rounded-md bg-primary-500 px-2 py-1  text-sm font-semibold text-gray-300">
      <img src={IconPath} className="h-5 w-5 " alt="Technology logo" />
      <p>{Technology}</p>
    </div>
  );
}

export default UserTechStackItem;
