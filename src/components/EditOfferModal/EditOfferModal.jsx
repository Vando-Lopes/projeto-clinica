import { Input } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { Typography } from 'antd';
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { useEffect, useState } from 'react'

export const EditOfferModal = (props) => {
    const [editOffer, setEditOffer] = useState(props.offer)
    const updateOffer = async (id, offer) => {
        const offerDoc = doc(db, "carros", id)
        const edit = { ...offer }
        updateDoc(offerDoc, edit)
    }

    const { Title } = Typography

    useEffect(() => {
        setEditOffer(props.offer)
    }, [props])


    return (
        <>
            <Modal
                title="Editar Oferta"
                visible={props.visible}
                onOk={() => {
                    updateOffer(editOffer.id, editOffer)
                    props.onOk()
                }}
                okText={"Confirmar"}
                onCancel={props.onCancel}
                cancelText={"Cancelar"}
            >
                <Title level={5}>Marca</Title>
                <Input placeholder="Marca" onChange={(e) => { setEditOffer({ ...editOffer, marca: e.target.value }) }} value={editOffer.marca} />
                <Title level={5}>Modelo</Title>
                <Input placeholder="Modelo" onChange={(e) => { setEditOffer({ ...editOffer, modelo: e.target.value }) }} value={editOffer.modelo} />
                <Title level={5}>Ano</Title>
                <Input placeholder="Ano" onChange={(e) => { setEditOffer({ ...editOffer, ano: e.target.value }) }} value={editOffer.ano} />
                <Title level={5}>Preço</Title>
                <Input placeholder="Preço" onChange={(e) => { setEditOffer({ ...editOffer, preco: e.target.value }) }} value={editOffer.preco} />
                <Title level={5}>Cor</Title>
                <Input placeholder="Cor" onChange={(e) => { setEditOffer({ ...editOffer, cor: e.target.value }) }} value={editOffer.cor} />
                <Title level={5}>Quilometragem</Title>
                <Input placeholder="KM" onChange={(e) => { setEditOffer({ ...editOffer, km: e.target.value }) }} value={editOffer.km} />
                <Title level={5}>Placa</Title>
                <Input placeholder="Placa" onChange={(e) => { setEditOffer({ ...editOffer, placa: e.target.value }) }} value={editOffer.placa} />
                <Title level={5}>Cidade</Title>
                <Input placeholder="Cidade" onChange={(e) => { setEditOffer({ ...editOffer, cidade: e.target.value }) }} value={editOffer.cidade} />
                <Title level={5}>Data</Title>
                <Input placeholder="Data" type="date" onChange={(e) => { setEditOffer({ ...editOffer, data: e.target.value }) }} value={editOffer.data} />
            </Modal>
        </>
    )
}
