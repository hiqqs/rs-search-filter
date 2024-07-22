import React from 'react';
import "./ItemList.css";

const ItemList = ({ items }) => {
  if (items.length === 0) {
    // no results found
  }

  return (
    <div>
      <table className="ItemList">
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Rating</th>
        </tr>
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.price}</td>
            <td>{item.rating} stars</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ItemList;
