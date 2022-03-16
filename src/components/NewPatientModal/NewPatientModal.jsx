import { ConfigProvider, DatePicker, Input, Select } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { Typography } from 'antd';
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { useEffect, useState } from 'react'
import * as moment from 'moment';
import 'moment/locale/pt-br';
import locale from 'antd/es/date-picker/locale/pt_BR';
import { Option } from 'antd/lib/mentions';
import { cpfMask } from '../maskCpf'

export const NewPatientModal = (props) => {
    const [newPatient, setNewPatient] = useState({
        name: "",
        dateBirth: "",
        gender: "",
        addres: "",
        cpf: "",
        status: true,
    })

    const { Title } = Typography

    const patientCollectionRef = collection(db, "pessoas")

    const createPatient = async () => {
        console.log(newPatient)
        await addDoc(patientCollectionRef, newPatient)
    }

    useEffect(() => {
        console.log(props)
        setNewPatient(props.patient)
    }, [props])

    return (
        <>
            <Modal
                title="Novo Paciente"
                visible={props.visible}
                onOk={() => {
                    createPatient()
                    props.onOk()
                }}
                okText={"Criar"}
                onCancel={props.onCancel}
                cancelText={"Cancelar"}
            >
                <Title level={5}>Nome</Title>
                <Input placeholder="Nome" onChange={(e) => { setNewPatient({ ...newPatient, name: e.target.value }) }} value={newPatient.name} />
                <Title level={5}>Data de Nascimento</Title>
                <Input placeholder="Data de Nascimento" onChange={(e) => { setNewPatient({ ...newPatient, dateBirth: e.target.value }) }} value={newPatient.dateBirth} />
                <Title level={5}>Gênero</Title>
                <Select
                    style={{ width: '100%' }}
                    value={newPatient.gender}
                    onChange={(value) => {
                        setNewPatient({ ...newPatient, gender: value })
                    }}>
                    <Option value="Masculino">Masculino</Option>
                    <Option value="Feminino">Feminino</Option>
                    <Option value="Indefinido">Não específicar</Option>
                </Select>

                <Title level={5}>Endereço</Title>
                <Input placeholder="Endereço" onChange={(e) => { setNewPatient({ ...newPatient, addres: e.target.value }) }} value={newPatient.addres} />
                <Title level={5}>CPF</Title>
                <Input placeholder="CPF" onChange={(e) => { setNewPatient({ ...newPatient, cpf: cpfMask(e.target.value) }) }} value={newPatient.cpf} />
                <Title level={5}>Status</Title>
                <Select
                    style={{ width: '100%' }}
                    value={newPatient.status}
                    onChange={(value) => {
                        setNewPatient({ ...newPatient, status: value })
                    }}>
                    <Option value="true">Ativo</Option>
                    <Option value="false">Inativo</Option>
                </Select>
            </Modal>
        </>
    )
}
