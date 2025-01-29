const UserInfoItem = ({ Icon, text }) => (
  <div className="flex items-center gap-1 rounded-md border border-border-primary bg-primary-500 px-2 py-[4px] text-sm font-semibold text-gray-300">
    <Icon size={22} className="text-text" />
    <p>{text}</p>
  </div>
);

export default UserInfoItem;
