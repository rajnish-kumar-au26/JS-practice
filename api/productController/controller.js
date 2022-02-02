const productsService = require("../../services/productService");
const productTransactionService = require("../../services/productTransaction");

class productController {
  createProduct = (req, res) => {
    const { name, description, price, image } = req.body;
    const responseGet = productsService.addProduct({
      name,
      description,
      price,
      image,
    });
    return res
      .status(responseGet.status)
      .send({ message: responseGet.message, error: responseGet.error });
  };
  updateProducts = async (req, res) => {
    const { id, name, description, price, image } = req.body;
    const responseGet = await productsService.updateProduct({
      id,
      name,
      description,
      price,
      image,
    });
    return res
      .status(responseGet.status)
      .send({ message: responseGet.message, error: responseGet.error });
  };

  getProducts = async (req, res) => {
    let id = req.params.id;
    let getProductResponse = await productsService.getProduct(id);
    console.log(getProductResponse);
    return res.status(200).send({
      message: getProductResponse.message,
      error: getProductResponse.error,
      data: getProductResponse.data,
    });
  };

  getAllProducts = async (req, res) => {
    const limit = parseInt(req.params.limit);
    const offset = parseInt(req.params.offset);
    let getProductResponse = await productsService.getAllProduct(offset, limit);
    console.log(getProductResponse);
    return res.status(200).send({
      message: getProductResponse.message,
      error: getProductResponse.error,
      data: getProductResponse.data,
    });
  };
  getTransaction = async (req, res) => {
    const userId = req.userId;
    // const limit = parseInt(req.params.limit);
    // const offset = parseInt(req.params.offset);
    let getProductResponse =
      productTransactionService.getTransactionByid(userId);
    return res.status(200).send({
      message: getProductResponse.message,
      error: getProductResponse.error,
      data: getProductResponse.data,
    });
  };

  deleteProducts = async (req, res) => {
    let { id } = req.body;
    let getProductResponse = await productsService.deleteProduct(id);
    console.log(getProductResponse);
    return res.status(200).send({
      message: getProductResponse.message,
      error: getProductResponse.error,
      data: getProductResponse.data,
    });
  };
}

module.exports = new productController();
