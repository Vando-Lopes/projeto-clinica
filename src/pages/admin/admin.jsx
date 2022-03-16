import React, { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { Button, Space, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useStyles } from "./admin.styles.ts"
import { EditPatientModal } from "../../components/EditPatientModal/EditPatientModal"
import { NewPatientModal } from "../../components/NewPatientModal/NewPatientModal"

const Admin = () => {
  const styles = useStyles
  const [patient, setPatient] = useState([])
  const [newPatient, setNewPatient] = useState({
    name: "",
    dateBirth: "",
    gender: "",
    addres: "",
    cpf: "",
    status: true,
  })
  const [editPatient, setEditPatient] = useState({})
  const [editPatientModalVisible, setEditPatientModalVisible] = useState(false);
  const [newPatientModalVisible, setNewPatientModalVisible] = useState(false);

  const peopleCollectionRef = collection(db, "pessoas")

  const deletePatient = async (id) => {
    const patientDoc = doc(db, "pessoas", id)
    await deleteDoc(patientDoc)
    getPatient()
  }

  useEffect(() => {

    const getPatient = async () => {
      const data = await getDocs(peopleCollectionRef)
      setPatient(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPatient()
  }, [])

  const getPatient = async () => {
    const data = await getDocs(peopleCollectionRef)
    setPatient(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const showEditPatientModal = () => {
    setEditPatientModalVisible(true);
  };

  const showNewPatientModal = () => {
    setNewPatientModalVisible(true);
  };

  const setEditPatientModal = (id) => {
    let obj = patient.find((patient) => patient.id === id)
    setEditPatient(obj)
  }

  const handleOkEditModal = () => {
    getPatient()
    setEditPatientModalVisible(false);
  };

  const handleCancelEditModal = () => {
    setEditPatientModalVisible(false);
  };

  const handleOkNewModal = () => {
    getPatient()
    setNewPatientModalVisible(false);
  };

  const handleCancelNewModal = () => {
    setNewPatientModalVisible(false);
  };


  return (
    <>
      <div style={styles.wrapper}>
        <h2>Pacientes</h2>
        <Button
          onClick={showNewPatientModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Novo Paciente
        </Button>
        <Table dataSource={patient} bordered>
          <Column title="Nome" dataIndex="name" key="name" />
          <Column title="Data de Nascimento" dataIndex="dateBirth" key="dateBirth" type="date" />
          <Column title="Gênero" dataIndex="gender" key="gender" />
          <Column title="Endereço" dataIndex="addres" key="addres" />
          <Column title="CPF" dataIndex="cpf" key="cpf" />
          <Column title="Status" dataIndex="status" key="status" render={(text, record) => {
            return text === "true" ? "Ativo" : "Inativo"
          }} />
          <Column title="Ações" key="acoes" render={(text, record) => (
            <Space size="middle">
              <Button type="primary" icon={<EditOutlined />} onClick={() => {
                setEditPatientModal(record.id)
                showEditPatientModal()
              }} />
              <Button type="primary" icon={<DeleteOutlined />} danger onClick={() => {
                deletePatient(record.id)
              }} />
            </Space>
          )} />
        </Table>


        <EditPatientModal visible={editPatientModalVisible} onOk={handleOkEditModal} patient={editPatient} onCancel={handleCancelEditModal}></EditPatientModal>

        <NewPatientModal visible={newPatientModalVisible} onOk={handleOkNewModal} patient={newPatient} onCancel={handleCancelNewModal}></NewPatientModal>

      </div>

    </>
  )
}

export default Admin
