import React from 'react'
import { NavLink } from 'react-router-dom'
import '../index.scss'
import { SetDiscountEndDate } from '../customization/SetDiscountEndDate'

export const Items = ({note, onRemove, onEdit}) => {
    
    let diffPrice
    let diffrenceDates
    let date = new Date();
    let discountEndDate = Date.parse(note.discountEndDate)
    let today = Date.parse(date)

    let today2 = SetDiscountEndDate(0)
    
    if (note.discount >= 10 && note.discount <= 90 && today < discountEndDate ) {
        let discountCalculation = (note.price / 100) * note.discount
        diffPrice = (note.price - discountCalculation) + '$'  
        let dateEndDiscount = note.discountEndDate
        let arrFromDate = dateEndDiscount.split('-')

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; 
        let yyyy = today.getFullYear();

        let day_1 = new Date(parseFloat(yyyy), parseFloat(mm), parseFloat(dd))
        let day_2 = new Date(parseFloat(arrFromDate[0]), parseFloat(arrFromDate[1]), parseFloat(arrFromDate[2]))

        function diffDates(day_one, day_two) {
            return (day_one - day_two) / (60 * 60 * 24 * 1000);
        };

        if (day_1 < day_2) {
            diffrenceDates = diffDates(day_2, day_1)
        } 
    }
    
    return (
        <div className="col mb-4 mt-5">
            <div className="card h-100">
                    <img src={note.photo} className="card-img-top img-size" alt='watch' />
                    <div className="card-body">
                        <h2 className="card-title">{note.title}</h2>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text">
                        Цена:&nbsp;
                        {note.discount && today < discountEndDate 
                        ?
                        <span className='line-through price'> {note.price}$</span>
                        :   
                        <span className='price'> {note.price}$</span>
                    }
                        </p>

                        {  note.discount && today < discountEndDate 
                        ?
                        <div>
                            <p className="card-text">Цена со скидкой:&nbsp;
                                <span className='new-price'>{ diffPrice }</span>
                            </p>
                            <p className="card-text container-discount-end-date">
                                { today2 === note.discountEndDate 
                                ?
                                <span style={{color: '#d91e1e', fontWeight: '500'}}>Последний день скидки</span>
                                :
                                <span style={{display: 'inline'}}>Дней до конца скидки:&nbsp;<span style={{display: 'inline'}} className='discount-end-date'>{ diffrenceDates }</span></span>                                   
                                }
                            </p>
                        </div>
                        :
                        null
                    }  
                    </div>

                { note.discount && today < discountEndDate 
                ?
                <div className='discount'>
                    <p>Скидка -{note.discount}%</p>
                </div>
                :
                null }
                { note.discount && today < discountEndDate 
                ?
                <div className='date'>
                    <p>До { note.discountEndDate }</p>
                </div>
                :
                null }
                <div className="card-footer">
                    <button 
                    className="btn btn-danger mr-4" 
                    onClick={() => onRemove(note.id)}>
                        Удалить
                    </button>
                    <NavLink 
                    to="/edit" 
                    className="btn btn-success" 
                    onClick={() => onEdit(note)}>
                        Редактировать
                    </NavLink>
                </div>
            </div> 
        </div>  
    )
} 