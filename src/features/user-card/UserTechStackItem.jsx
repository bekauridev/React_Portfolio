function UserTechStackItem({ IconPath, Technology }) {
  return (
    <div className="flex gap-1 px-2 items-center text-sm font-semibold text-gray-300 bg-primary-500 rounded-md">
      <img src={IconPath} className="w-5 h-7" alt="React logo" />
      <p>{Technology}</p>
    </div>
  );
}

export default UserTechStackItem;
