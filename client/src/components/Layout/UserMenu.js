import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UserMenu() {
    return (
        <>
            <div className="list-group">
                <h4>Dashboard</h4>
                <NavLink to="/dashboard/user/profile" className="list-group-item list-style list-group-item-action">Profile</NavLink>
                <NavLink to="/dashboard/user/orders" className="list-group-item list-style list-group-item-action">Orders</NavLink>
            </div>
        </>
    )
}
