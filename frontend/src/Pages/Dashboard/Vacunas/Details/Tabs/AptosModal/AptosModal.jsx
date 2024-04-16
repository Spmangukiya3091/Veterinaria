import React, { useEffect, useState } from "react";
import "./aptosModal.scss";
import { Button, Form, Modal } from "react-bootstrap";
import { failer, success } from "../../../../../../Components/alert/success";
import { useAddVaccinationRecordMutation, useGetOwnersListQuery, useGetPetByOwnerQuery, useUpdateVaccinationMutation } from "../../../../../../services/ApiServices";

const AptosModal = ({ show, onHide, vaccineId, vaccineName, owner, petId, id, petName, ownerName }) => {
  const [formData, setFormData] = useState({
    vaccine: vaccineName,
    vaccineId: vaccineId,
    ownerId: "",
    owner: "",
    pet: "",
    petId: "",
  });
  const owners = useGetOwnersListQuery({ refetchOnMountOrArgChange: true })
  const pets = useGetPetByOwnerQuery(formData.ownerId, { refetchOnMountOrArgChange: true });
  const [addVaccinationRecord, response] = useAddVaccinationRecordMutation()
  const [updateVaccinationRecord, response2] = useUpdateVaccinationMutation()
  useEffect(() => {
    if (id !== undefined && id !== "") {
      setFormData({
        vaccine: vaccineName,
        vaccineId: vaccineId,
        ownerId: owner,
        owner: ownerName,
        pet: petName,
        petId: petId,

      })
    } else {
      setFormData({
        vaccine: vaccineName,
        vaccineId: vaccineId,
        ownerId: "",
        owner: "",
        pet: "",
        petId: "",
      })
    }


  }, [id, owner, ownerName, petId, petName, vaccineId, vaccineName])

  const handleOwnerChange = (e) => {
    const ownId = e.target.value;
    let owner = e.target.options[e.target.selectedIndex].text;
    // If the selected option doesn't have text, retrieve the owner's name from the owners data
    if (!owner) {
      const selectedOwner = owners.data.ownersList.find(owner => owner.id === ownId);
      owner = selectedOwner ? `${selectedOwner.name} ${selectedOwner.surname}` : "";
    }
    setFormData({
      ...formData,
      ownerId: ownId,
      owner: owner,
      petId: ""
    });
  };

  const handlePetChange = (e) => {
    const petId = e.target.value;
    let pet = e.target.options[e.target.selectedIndex].text;
    // If the selected option doesn't have text, retrieve the pet's name from the pets data
    if (!pet) {
      const selectedPet = pets.data.pets.find(pet => pet.id === petId);
      pet = selectedPet ? selectedPet.name : "";
    }
    setFormData({
      ...formData,
      pet: pet,
      petId: petId
    });
  };
  // console.log(formData.pet)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (id !== undefined && id !== "") {
      const body = {
        id: id,
        ...formData
      }
      await updateVaccinationRecord(body);
    } else if (id === undefined || id === "") {

      const body = {
        id: formData.petId,
        vaccine: formData.vaccineName,
        vaccineId: formData.vaccineId
      }
      console.log(formData)
      await addVaccinationRecord(body);
    }
  };

  useEffect(() => {
    if (id !== undefined && id !== "") {
      if (!response2.isLoading && response2.isSuccess) {
        setFormData({
          ownerId: "",
          owner: "",
          pet: "",
          petId: "",
        });
        onHide();
        success();
      } else if (response2.isError && response2.status === "rejected") {
        failer(response2?.error?.data?.message);
      }
    } else {
      if (!response.isLoading && response.isSuccess) {
        onHide();
        setFormData({
          ...formData,
          vaccine: vaccineName,
          vaccineId: id,
        });
        success();
      } else if (response?.isError && response?.status === "rejected") {
        failer(response?.error?.data?.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, response2]);

  return (
    <>
      <Modal show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Información de Aptos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Propietario</Form.Label>
              <Form.Select name="owner" onChange={handleOwnerChange} value={formData.ownerId}>
                <option value={""} disabled="true" selected="true">Seleccione Propietario</option>
                {owners?.data?.ownersList.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name + " " + owner.surname}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre de mascota</Form.Label>
              <Form.Select name="pet" onChange={handlePetChange} value={formData.petId}>
                <option value={""} disabled="true" selected="true">Seleccione Mascota</option>
                {pets?.data?.pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            onHide()
            setFormData({
              ...formData,
              id: ""
            })
          }} className="footer-btn btn btn-secondary">
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            className="footer-btn btn btn-primary"
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AptosModal;
