const ActionItemCard = ({ actionItem }) => (
    <div className="bg-gray-300 p-2 rounded-md shadow-md mb-2 flex items-center">
      {actionItem.done ? <span>&#9989;</span> : <span>&#10060;</span>}
      <span className="ml-2">{actionItem.task}</span>
    </div>
);
  
export default ActionItemCard;