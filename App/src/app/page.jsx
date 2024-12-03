"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const fetchRegistro = async () => {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await axios.get(url);
    return response.data;
};

const UserDetails = ({ user, onClose }) => {
    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>User Details</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
            <h3>Address:</h3>
            <p>{user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
            <h3>Company:</h3>
            <p><strong>Name:</strong> {user.company.name}</p>
            <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
            <p><strong>BS:</strong> {user.company.bs}</p>
            <button onClick={onClose} style={{ marginTop: "10px" }}>Close</button>
        </div>
    );
};

export default function Usu() {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchRegistro();
            setUsuarios(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Usuarios</h1>
            <p>Estas en usuarios</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>
                                <button
                                    onClick={() => setSelectedUser(usuario)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "blue",
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                    }}
                                >
                                    {usuario.name}
                                </button>
                            </td>
                            <td>{usuario.username}</td>
                            <td>{usuario.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedUser && (
                <UserDetails user={selectedUser} onClose={() => setSelectedUser(null)} />
            )}
        </div>
    );
}
