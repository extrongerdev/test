import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {AiFillEdit, AiTwotoneLock} from "react-icons/ai";
import {BsBoxArrowUpRight, BsFillTrashFill} from "react-icons/bs";
import API from "../api/Api";

export const Home = () => {
    const [dataApi, setDataApi] = useState([]);

    const getUserInformation = async () => {
        try {
            const resp = await API.get('/users');
            setDataApi(resp.data?.results);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserInformation()
    }, [])

    return (<>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Accesses</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {dataApi?.map((usr) => <tr key={usr._id}>
                    <td>{usr.name}</td>
                    <td>{usr.email}</td>
                    <td>{usr.accesses[0]?.createdAt}</td>
                    <td>
                        <Button variant="primary">Edit</Button>{' '}
                        <Button variant="secondary">Delete</Button>{' '}
                    </td>
                </tr>)}
                </tbody>
            </Table>
        </>);

};

