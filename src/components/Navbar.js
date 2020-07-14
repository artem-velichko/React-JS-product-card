import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import FirebaseContext from '../context/firebase/FirebaseContext'

export const Navbar = () => {

    const { disabled } = useContext(FirebaseContext)
 
    let cls = ['nav-link', 'change-edit']

    if (disabled) {
        cls.push('disabled')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">
                <NavLink to="/" className="nav-link">
                    Store
                </NavLink>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/list" className="nav-link">
                            Карточки товаров
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/add_item" className="nav-link">
                            Добавить
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/edit" className={cls.join(' ')}>
                            Редактировать
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}