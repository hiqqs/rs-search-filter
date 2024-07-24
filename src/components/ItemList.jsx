import "./ItemList.css";

const ItemList = ({ items }) => {
  return (
    <div>
        <table className="ItemList" data-testid="item-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} data-testid="item-row">
                <td data-testid="item-name">{item.name}</td>
                <td data-testid="item-category">{item.category}</td>
                <td data-testid="item-price">{item.price}</td>
                <td data-testid="item-rating">{item.rating} stars</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default ItemList;
