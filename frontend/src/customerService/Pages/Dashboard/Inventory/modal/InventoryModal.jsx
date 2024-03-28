import React, { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { failer, success } from "../../../../Components/alert/success";
import { useState } from "react";
import {
  useAddProductMutation,
  useGetAllCategoriesQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../../../../services/ApiServices";

function InventoryModal(props) {
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

  const categoryList = useGetAllCategoriesQuery(null, { refetchOnMountOrArgChange: true });
  const productDetails = useGetSingleProductQuery(props.id, { refetchOnMountOrArgChange: true });
  const [addProduct, response] = useAddProductMutation();
  const [updateProduct, response2] = useUpdateProductMutation();

  useEffect(() => {
    if (props.id !== undefined && !productDetails.isLoading && productDetails?.data?.product[0]) {
      const { product, brand, category, categoryId, composition, stock, sku, status, laboratory, description, price, presentation } =
        productDetails?.data?.product[0];
      setFormData({
        product,
        categoryId,
        category,
        composition,
        stock,
        sku,
        status,
        laboratory,
        description,
        brand,
        price: price.toString(),
        presentation,
      });
    }
  }, [productDetails, props.id]);

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

  const handleSubmit = async () => {
    if (props.id) {
      const body = {
        id: props.id,
        ...formData,
      };
      await updateProduct(body);
    } else {
      await addProduct(formData);
    }
  };

  useEffect(() => {
    if (props.id !== undefined) {
      if (!response2.isLoading && response2.status === "fulfilled") {
        props.onHide();
        success();
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
        props.filter.refetch();
      } else if (response2.isError && response2.status === "rejected") {
        // console.log(response2.error);
        failer(response2?.error?.data?.message);
      }
    } else {
      if (!response.isLoading && response.status === "fulfilled") {
        // console.log(response);
        success();
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
        props.onHide();
        props.filter.refetch();
      } else if (response.isError && response.status === "rejected") {
        // console.log(response.error);
        failer(response?.error?.data?.message);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, response2]);

  return (
    <>
      <Modal size="lg" show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Información de Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Producto</Form.Label>
                  <Form.Control aria-label="Default" placeholder="Producto" value={formData.product} name="product" onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select aria-label="Default select example" value={formData.categoryId} name="categoryId" onChange={handleChange}>
                    <option disabled>Categoría</option>
                    {categoryList?.data?.categoryList.map((category, i) => (
                      <option key={i} value={category.id}>
                        {category.category}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control type="text" placeholder="Marca" value={formData.brand} name="brand" onChange={handleChange} />
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
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Estado</Form.Label>
                      <Form.Select aria-label="Default select example" value={formData.status} name="status" onChange={handleChange}>
                        <option disabled>Estado</option>
                        <option value="active">Activo</option>
                        <option value="inactive">InActivo</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>SKU</Form.Label>
                  <Form.Control aria-label="Default " placeholder="SKU" value={formData.sku} name="sku" onChange={handleChange} />
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
                    onChange={handleChange}
                  />
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
                    onChange={handlePriceChange}
                  />
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

export default InventoryModal;
