import React, {useState, useContext} from 'react'
import FirebaseContext from '../context/firebase/FirebaseContext'
import { AlertContext } from '../context/alert/AlertContext'
import { SetDiscountEndDate } from '../customization/SetDiscountEndDate'

export const Edit = ({ history }) => {

    let tommorow = SetDiscountEndDate(1)

    const { updateNote, value, setValue } = useContext(FirebaseContext)

    const { show } = useContext(AlertContext)

    const [title, setTitle] = useState(value.title)
    const [photo, setPhoto] = useState(value.photo)
    const [description, setDescription] = useState(value.description)
    const [price, setPrice] = useState(value.price)
    const [discount, setDiscount] = useState(value.discount)
    const [discountEndDate, setDiscountEndDate] = useState(value.discountEndDate)

    const updateAndClearInput = () => {

        const note = { title, photo, description, price, discount: +discount, discountEndDate, history }

        updateNote(note, value.id)

        setTimeout(() => {
            setTitle('')
            setPhoto('')
            setDescription('')
            setPrice(0)
            setDiscount(0)
            setDiscountEndDate('')
            setValue({})
        }, 500)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        console.log(typeof +'0')
        if (title.trim() && photo.trim() && price > 0 && !+discount) {

            show('Заметка была успешно отредактирована', 'success')
            updateAndClearInput()

        } else if (title.trim() && photo.trim() && price > 0 && discount >= 10 && discount <= 90) {

            show(`Карточка товара со скидкой была успешно отредактирована. Скидка составила ${discount}%`, 'success')
            updateAndClearInput()
            
        } else {
            show('Ошибка! Обязательные поля к заполнению - заголовок, фото и цена. Поле скидки при заполнении обязанно быть в диапазоне от 10% до 90%')
        }
    }

    return (
        <>
        <h3 className='mt-5'>Форма редактирования существующих карточек товаров</h3>
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
                className="form-control"
                id="discountEndDate"
                type="date"
                min={tommorow}
                value={discountEndDate}
                onChange={event => setDiscountEndDate(event.target.value)}
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