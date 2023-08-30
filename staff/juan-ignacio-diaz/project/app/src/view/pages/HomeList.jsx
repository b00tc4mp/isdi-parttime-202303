import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { Container, Button, Label } from '../library'
import { List, AddListModal } from '../components'

import { retrieveUser, retrieveList, closeList } from '../../logic'

import './Home.css'

import { DEFAULT_AVATAR_URL } from '../../constants'

export default function HomeList() {
    console.log('Home -> render')
 
    const { alert, freeze, unfreeze, navigate } = useAppContext()

    const [user, setUser] = useState()
    const [list, setList] = useState()
    const [view, setView] = useState('list')
    const [modal, setModal] = useState(null)
    const [productId, setProductId] = useState(null)
    const [lastUpdate, setLastUpdate] = useState(null)

    useEffect(() => {
        ;(async () => {
            try{     
                freeze()     
                const [user, list] = await Promise.all([retrieveUser(), retrieveList()])
                unfreeze()

                setUser(user)
                setList(list)
            } 
            catch (error) {
                unfreeze()
                alert(error.message)
            }
        })()
    }, [])

    const handleGoToHome = () => {
        closeList()

        navigate('/')
    }

    const handleCloseModal = () => {
        setModal(null)
        setLastUpdate(Date.now())
    }

    const handleOpenAddProduct = (id) => {
        setProductId(id)
        setModal('add-product')
    }

    const handleOpenEditProduct = (id) => {
        setProductId(id)
        setModal('edit-product')
    }

    const handleOpenFilterProducts = () => {
        setModal('filter-products')
    }

    const handleGoToList = () => setView('list') 

    return <>
        <Container className="home">
            <header className="home-header">
                <h1 className="title" onClick={handleGoToList}>List</h1>

                <nav className="home-header-nav"> 
                    {user && <>
                        <img className="home-header-avatar" src={user.avatar? user.avatar : DEFAULT_AVATAR_URL} alt=""/>
                        <Label type="text" name="name" placeholder="name">{user.name}</Label>
                    </>}

                    {list && <>
                    <Label htmlFor="nameRegister">Name:</Label>
                    <Label type="text" name="name" placeholder="name">{list.name}</Label>
                    <Label htmlFor="emailRegister">Date End:</Label>
                    <Label type="date" name="date">{list.dateToEnd}</Label>
                </>
                || <>
                    <Label htmlFor="nameRegister">Name:</Label>
                    <Label type="text" name="name" placeholder="name" />
                    <Label htmlFor="emailRegister">Date End:</Label>
                    <Label type="date" name="date" />
                </>}
                </nav>
                <Button name = "home" onClick={handleGoToHome}>Home</Button>   
            </header>

            <Container tag="main">               
                {view === 'list' && <List
                    onModifyedList={handleGoToList}
                    onAddedProduct={handleOpenAddProduct}
                    onEditedProduct={handleOpenEditProduct}
                    onFilteredProducts={handleOpenFilterProducts}
                    lastUpdate={lastUpdate}
                />} 

                {modal === 'add-product' && <AddListModal 
                    onCancel={handleCloseModal}
                    onModifiedList={handleCloseModal}
                />}

                {modal === 'edit-product' && <AddListModal 
                    onCancel={handleCloseModal}
                    onModifiedList={handleCloseModal}
                />}

                {modal === 'filter-products' && <AddListModal 
                    onCancel={handleCloseModal}
                    onModifiedList={handleCloseModal}
                />}

            </Container>          
        </Container>
    </>

}