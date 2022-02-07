const divSize = { width: '288px', height: '430px' };
const photoSize = { width: '272px', height: '181px' };

function ProdcuctCard(props) {
  return (
    <div
      className="cardBody d-inline-flex p-2 bd-highlight m-2"
      style={divSize}
    >
      <div className="card">
        <img src={props.image} style={photoSize} />
        <div className="card-body card-body-data">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{props.price}</li>
        </ul>
        <div className="button-btn d-flex justify-content-evenly mb-3">
          <button type="button" class="btn btn-primary font-weight-bold">
            Buy Now
          </button>
          <button
            type="button"
            class="btn btn-warning text-white font-weight-bold"
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProdcuctCard;
