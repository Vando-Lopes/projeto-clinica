import React, { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { Button, Space, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useStyles } from "./admin.styles.ts"
import { EditOfferModal } from "../../components/EditOfferModal/EditOfferModal"
import { NewOfferModal } from "../../components/NewOfferModal/NewOfferModal"

const Admin = () => {
  const styles = useStyles
  const [offers, setOffers] = useState([])
  const [newOffer, setNewOffer] = useState({
    marca: "",
    modelo: "",
    ano: "",
    preco: "",
    cor: "",
    km: "",
    placa: "",
    cidade: "",
    data: "",
    views: 0
  })
  const [editOffer, setEditOffer] = useState({})
  const [editOfferModalVisible, setEditOfferModalVisible] = useState(false);
  const [newOfferModalVisible, setNewOfferModalVisible] = useState(false);

  const peopleCollectionRef = collection(db, "pessoas")

  const deleteOffer = async (id) => {
    const offerDoc = doc(db, "carros", id)
    await deleteDoc(offerDoc)
    getOffers()
  }

  useEffect(() => {

    const getOffers = async () => {
      const data = await getDocs(peopleCollectionRef)
      setOffers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getOffers()
    console.log(offers)
  }, [])

  useEffect(() => {

    console.log(offers)
  }, [offers])

  const getOffers = async () => {
    const data = await getDocs(peopleCollectionRef)
    setOffers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const showEditOfferModal = () => {
    setEditOfferModalVisible(true);
  };

  const showNewOfferModal = () => {
    setNewOfferModalVisible(true);
  };

  const setEditOfferModal = (id) => {
    let obj = offers.find((offer) => offer.id === id)
    setEditOffer(obj)
  }

  const handleOkEditModal = () => {
    getOffers()
    setEditOfferModalVisible(false);
  };

  const handleCancelEditModal = () => {
    setEditOfferModalVisible(false);
  };

  const handleOkNewModal = () => {
    getOffers()
    setNewOfferModalVisible(false);
  };

  const handleCancelNewModal = () => {
    setNewOfferModalVisible(false);
  };


  return (
    <>
      <div style={styles.wrapper}>
        <h2>Pacientes</h2>
        <Button
          onClick={showNewOfferModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Novo Paciente
        </Button>
        <Table dataSource={offers} bordered>
          <Column title="Nome" dataIndex="name" key="name" />
          <Column title="Data de Nascimento" dataIndex="date-birth" key="date-birth" type="date" />
          <Column title="Gênero" dataIndex="gender" key="gender" />
          <Column title="Endereço" dataIndex="addres" key="addres" />
          <Column title="CPF" dataIndex="cpf" key="cpf" />
          <Column title="Status" dataIndex="status" key="status" render={(text, record) => {
            return text === true ? "Ativo" : "Inativo"
          }} />
          <Column title="Ações" key="acoes" render={(text, record) => (
            <Space size="middle">
              <Button type="primary" icon={<EditOutlined />} onClick={() => {
                setEditOfferModal(record.id)
                showEditOfferModal()
              }} />
              <Button type="primary" icon={<DeleteOutlined />} danger onClick={() => {
                deleteOffer(record.id)
              }} />
            </Space>
          )} />
        </Table>


        <EditOfferModal visible={editOfferModalVisible} onOk={handleOkEditModal} offer={editOffer} onCancel={handleCancelEditModal}></EditOfferModal>

        <NewOfferModal visible={newOfferModalVisible} onOk={handleOkNewModal} offer={newOffer} onCancel={handleCancelNewModal}></NewOfferModal>

      </div>

    </>
  )
}

export default Admin
