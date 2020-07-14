import React, { useState, useContext, useEffect } from 'react'
import FirebaseContext from '../context/firebase/FirebaseContext'
import { SetDiscountEndDate } from '../customization/SetDiscountEndDate'
import { AlertContext } from '../context/alert/AlertContext'

export const AddItem = ({ history }) => {

    let tommorow = SetDiscountEndDate(1)
    
    const {addNote} = useContext(FirebaseContext)

    const { show } = useContext(AlertContext)

    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [discountEndDate, setDiscountEndDate] = useState(tommorow)

    useEffect(() => {
        const discountEndDate = document.querySelector('.discountEndDate')
        if (discount >= 10 && discount <= 90) {
            discountEndDate.setAttribute('required', 'required')
        } else {
            discountEndDate.removeAttribute('required')
        }
    }, [discount])

    const addAndClearInput = () => {

        const note = { title, photo, description, price, discount: +discount, discountEndDate, history }

        addNote(note)

        setTimeout(() => {
            setTitle('')
            setPhoto('')
            setDescription('')
            setPrice(0)
            setDiscount(0)
            setDiscountEndDate('')
        }, 500)
    }

    const submitHandler = (event) => {
        event.preventDefault()

        if (title.trim() && photo.trim() && price > 0 && !+discount) {

            show('Заметка была успешно создана', 'success')
            addAndClearInput()

        } else if (title.trim() && photo.trim() && price > 0 && discount >= 10 && discount <= 90) {

            show(`Карточка товара со скидкой была успешно создана. Скидка составила ${discount}%`, 'success')
            addAndClearInput()

        } else {
            show('Ошибка! Обязательные поля к заполнению - заголовок, фото и цена. Поле скидки при заполнении обязанно быть в диапазоне от 10% до 90%')
        }
    }

    return (
        <>
        <h3 className='mt-5'>Форма создания новой карточки товара</h3>
        <form className="my-5">
            <fieldset className="form-group">
                <label htmlFor="title">Название</label>
                <input 
                className="form-control"
                id="title"
                type="text"
                placeholder="Введите название товара"
                required
                minLength="20"
                maxLength="60"
                value={title}
                onChange={event => setTitle(event.target.value)}
                />
                <small id="titleHelp" className="form-text text-muted">Обязательное поле к заполнению</small>
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="photo">Изображение</label>
                <input 
                className="form-control"
                id="photo"
                type="text"
                placeholder="Вставьте url ссылку изображения"
                required
                value={photo}
                onChange={event => setPhoto(event.target.value)}
                />
                <small id="photoHelp" className="form-text text-muted">Обязательное поле к заполнению</small>
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="description">Описание</label>
                <textarea 
                id='description'
                className='form-control'
                cols="100"
                rows="5"
                placeholder="Введите текст описания товара..."
                maxLength="200"
                value={description}
                onChange={event => setDescription(event.target.value)}>
                </textarea>
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="price">Цена</label>
                <input 
                className="form-control"
                id="price"
                type="number"
                required
                min="0"
                max="99999999.99"
                value={price}
                onChange={event => setPrice(event.target.value)}
                />
                <small id="priceHelp" className="form-text text-muted">Обязательное поле к заполнению</small>
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="discount">Скидка</label>
                <input 
                className="form-control"
                id="discount"
                type="number"
                min="10"
                max="90"
                value={discount}
                onChange={event => setDiscount(event.target.value)}
                />
                <small id="discountHelp" className="form-text text-muted">При указании скидки, значение должно составить в диапазоне от 10% до 90%</small>
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="discountEndDate">Окончание даты скидки</label>
                <input 
                className="form-control discountEndDate"
                id="discountEndDate"
                type="date"
                min={tommorow}
                value={discountEndDate}
                onChange={event => setDiscountEndDate(event.target.value) }
                />
            </fieldset>
            <button 
            className="btn btn-primary btn-save"
            onClick={event => submitHandler(event)}>
                Сохранить
            </button>
        </form>
    </>
    )
}