function UserTechStackItem({ IconPath, Technology }) {
  return (
    <div className="flex items-center gap-1 rounded-md bg-primary-500 px-2 text-sm font-semibold text-gray-300">
      <img src={IconPath} className="h-7 w-5" alt="React logo" />
      <p>{Technology}</p>
    </div>
  );
}

export default UserTechStackItem;
