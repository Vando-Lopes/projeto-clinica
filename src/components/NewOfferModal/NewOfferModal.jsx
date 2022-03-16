import { Input } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { Typography } from 'antd';
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { useEffect, useState } from 'react'

export const NewOfferModal = (props) => {
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

    const { Title } = Typography

    const carrosCollectionRef = collection(db, "carros")

    const createOffer = async () => {
        await addDoc(carrosCollectionRef, newOffer)
    }

    useEffect(() => {
        console.log(props)
        setNewOffer(props.offer)
    }, [props])



    return (
        <>
            <Modal
                title="Criar Nova Oferta"
                visible={props.visible}
                onOk={() => {
                    createOffer()
                    props.onOk()
                }}
                okText={"Criar"}
                onCancel={props.onCancel}
                cancelText={"Cancelar"}
            >
                <Title level={5}>Marca</Title>
                <Input placeholder="Marca" onChange={(e) => { setNewOffer({ ...newOffer, marca: e.target.value }) }} value={newOffer.marca} />
                <Title level={5}>Modelo</Title>
                <Input placeholder="Modelo" onChange={(e) => { setNewOffer({ ...newOffer, modelo: e.target.value }) }} value={newOffer.modelo} />
                <Title level={5}>Ano</Title>
                <Input placeholder="Ano" onChange={(e) => { setNewOffer({ ...newOffer, ano: e.target.value }) }} value={newOffer.ano} />
                <Title level={5}>Preço</Title>
                <Input placeholder="Preço" onChange={(e) => { setNewOffer({ ...newOffer, preco: e.target.value }) }} value={newOffer.preco} />
                <Title level={5}>Cor</Title>
                <Input placeholder="Cor" onChange={(e) => { setNewOffer({ ...newOffer, cor: e.target.value }) }} value={newOffer.cor} />
                <Title level={5}>Quilometragem</Title>
                <Input placeholder="KM" type="number" onChange={(e) => { setNewOffer({ ...newOffer, km: e.target.value }) }} value={newOffer.km} />
                <Title level={5}>Placa</Title>
                <Input placeholder="Placa" onChange={(e) => { setNewOffer({ ...newOffer, placa: e.target.value }) }} value={newOffer.placa} />
                <Title level={5}>Cidade</Title>
                <Input placeholder="Cidade" onChange={(e) => { setNewOffer({ ...newOffer, cidade: e.target.value }) }} value={newOffer.cidade} />
                <Title level={5}>Data</Title>
                <Input placeholder="Data" type="date" onChange={(e) => { setNewOffer({ ...newOffer, data: e.target.value }) }} value={newOffer.data} />
            </Modal>
        </>
    )
}
