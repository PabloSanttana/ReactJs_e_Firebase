import React from 'react'
import {Link} from 'react-router-dom'


import './styles.css'

export default function Header() {
    return (
        <header id="main-header">
            <div className="header-content">
                <Link to="/">Blog Programador</Link>
                <Link to="/login">Login</Link>
            </div>
        </header>
        
    )
}
