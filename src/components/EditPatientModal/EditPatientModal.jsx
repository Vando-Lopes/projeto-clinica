import { Input, Select } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { Typography } from 'antd';
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { useEffect, useState } from 'react'
import { Option } from 'antd/lib/mentions';

export const EditPatientModal = (props) => {
    const [editPatient, setEditPatient] = useState(props.patient)
    const updatePatient = async (id, patient) => {
        const patientDoc = doc(db, "pessoas", id)
        const edit = { ...patient }
        updateDoc(patientDoc, edit)
    }

    const { Title } = Typography

    useEffect(() => {
        setEditPatient(props.patient)
    }, [props])


    return (
        <>
            <Modal
                title="Editar Pacient"
                visible={props.visible}
                onOk={() => {
                    updatePatient(editPatient.id, editPatient)
                    props.onOk()
                }}
                okText={"Confirmar"}
                onCancel={props.onCancel}
                cancelText={"Cancelar"}
            >
                <Title level={5}>Nome</Title>
                <Input placeholder="Nome" onChange={(e) => { setEditPatient({ ...editPatient, name: e.target.value }) }} value={editPatient.name} />
                <Title level={5}>Data de Nascimento</Title>
                <Input placeholder="Data de Nascimento" onChange={(e) => { setEditPatient({ ...editPatient, dateBirth: e.target.value }) }} value={editPatient.dateBirth} />
                <Title level={5}>Gênero</Title>
                <Input placeholder="Gênero" onChange={(e) => { setEditPatient({ ...editPatient, gender: e.target.value }) }} value={editPatient.gender} />
                <Title level={5}>Endereço</Title>
                <Input placeholder="Endereço" onChange={(e) => { setEditPatient({ ...editPatient, addres: e.target.value }) }} value={editPatient.addres} />
                <Title level={5}>CPF</Title>
                <Input placeholder="CPF" onChange={(e) => { setEditPatient({ ...editPatient, cpf: e.target.value }) }} value={editPatient.cpf} />
                <Title level={5}>Status</Title>
                <Select
                    style={{ width: '100%' }}
                    value={editPatient.status}
                    onChange={(value) => {
                        setEditPatient({ ...editPatient, status: value })
                    }}>
                    <Option value="true">Ativo</Option>
                    <Option value="false">Inativo</Option>
                </Select>            </Modal>
        </>
    )
}
