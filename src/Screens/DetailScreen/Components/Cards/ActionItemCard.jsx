const ActionItemCard = ({ actionItem }) => (
    <div className="bg-gray-300 p-2 rounded-md shadow-md mb-2 flex items-center">
       <span className="text-2xl">{actionItem.icon}</span>
      <span className="ml-2">{actionItem.task}</span>
    </div>
);
  
export default ActionItemCard;