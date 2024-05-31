import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { failer, success } from "../../alert/success";
import { useAddProductMutation, useGetAllCategoriesQuery } from "../../../../services/ApiServices";

const ProductoModal = (props) => {
  const [formData, setFormData] = useState({
    product: "",
    categoryId: "",
    category: "",
    composition: "",
    stock: "",
    sku: "",
    status: "",
    laboratory: "",
    description: "",
    brand: "",
    price: "", // Initialize as an empty string
    presentation: "",
  });
  const [validated, setValidated] = useState(false); // State for form validation
  const categoryList = useGetAllCategoriesQuery( { refetchOnMountOrArgChange: true });
  const [addProduct, response] = useAddProductMutation();

  useEffect(() => {

    clearForm(); // Clear form fields when there is no owner ID

  }, [props.show]);

  const clearForm = () => {
    setFormData({
      product: "",
      categoryId: "",
      category: "",
      composition: "",
      stock: "",
      sku: "",
      status: "",
      laboratory: "",
      description: "",
      brand: "",
      price: "", // Initialize as an empty string
      presentation: "",
    });
    setValidated(false); // Reset validated state
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryId") {
      const category = e.target.options[e.target.selectedIndex].text;
      setFormData({
        ...formData,
        [name]: value,
        category,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePriceChange = (e) => {
    const enteredValue = e.target.value;
    // Ensure the entered value is a valid number
    if (!isNaN(enteredValue)) {
      // Convert the input string to a floating-point number with two decimal places
      const formattedPrice = parseFloat(enteredValue).toFixed(2);
      setFormData({
        ...formData,
        price: formattedPrice,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true); // Set validated to true only when the submit button is clicked
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      await addProduct(formData);

    }
  };

  useEffect(() => {

    if (!response.isLoading && response.status === "fulfilled") {
      // console.log(response);
      success();
      clearForm()
      props.onHide();
    } else if (response.isError && response.status === "rejected" && response?.error?.status !== 400) {
      // console.log(response.error);
      failer(response?.error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      <Modal size="lg" show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Información de Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete="new-password">
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Producto</Form.Label>
                  <Form.Control aria-label="Default" placeholder="Producto" value={formData.product} name="product" onChange={handleChange} required />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Producto.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select aria-label="Default select example" value={formData.categoryId} name="categoryId" onChange={handleChange}>
                    <option disabled="true" value={""} selected="true">Categoría</option>
                    {categoryList?.data?.categoryList.map((category, i) => (
                      <option key={i} value={category.id}>
                        {category.category}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Categoría.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control type="text" placeholder="Marca" value={formData.brand} name="brand" onChange={handleChange} required />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un Marca.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Composición</Form.Label>
                  <Form.Control type="text" placeholder="Composición" value={formData.composition} name="composition" onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        type="number"
                        aria-label="Default"
                        placeholder="Stock"
                        value={formData.stock}
                        name="stock"
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor proporcione un Stock.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Estado</Form.Label>
                      <Form.Select aria-label="Default select example" value={formData.status} name="status" onChange={handleChange} required>
                        <option disabled="true" value={""} selected="true">Estado</option>
                        <option value="active">Activo</option>
                        <option value="inactive">InActivo</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Por favor proporcione un Estado.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>SKU</Form.Label>
                  <Form.Control aria-label="Default " placeholder="SKU" value={formData.sku} name="sku" onChange={handleChange} required />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un SKU.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Laboratorio</Form.Label>
                  <Form.Control
                    aria-label="Default"
                    placeholder="Laboratorio"
                    value={formData.laboratory}
                    name="laboratory"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>PRESENTACIÓN</Form.Label>
                  <Form.Control
                    type="text"
                    aria-label="Default "
                    placeholder="PRESENTACIÓN"
                    value={formData.presentation}
                    name="presentation"
                    required
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un PRESENTACIÓN.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>PRECIO</Form.Label>
                  <Form.Control
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price === 0 ? "0.00" : formData.price} // Show 0.00 if price is 0, otherwise show the formatted price
                    required
                    onChange={handlePriceChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporcione un PRECIO.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Descripción"
                    style={{ height: "100px" }}
                    value={formData.description}
                    name="description"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.onHide();
              setFormData({
                product: "",
                categoryId: "",
                category: "",
                composition: "",
                stock: "",
                sku: "",
                status: "",
                laboratory: "",
                description: "",
                brand: "",
                price: "",
                presentation: "",
              });
            }}
            className="footer-btn btn btn-secondary"
          >
            Cancelar
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit} className="footer-btn btn btn-primary">
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductoModal;
