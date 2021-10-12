import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Get = () => {
    const [getLink, setGetLink] = useState({})
    const [name, setName] = useState()
    const [num, setNum] = useState()
    const [userId, setUserId] = useState(null)
    const [ids, setIds] = useState()

    const Get = async () => {
        const response = await fetch("http://localhost:4000/db")
        // console.log(response)
        const result = await response.json();
        setGetLink(result)
        // setName(result.Contact[0].name)
        // setNum(result.Contact[0].num)
        // setUserId(result.Contact[0].id)
        // console.log(result.Contact)
    }


    const deleteuser = (id) => {
        alert('you want to delete ?')
        fetch(`http://localhost:4000/Contact/${id}`, {
            method: 'DELETE'
        })
        Get()
    }


    useEffect(() => {
        Get();
        // SelectUser()
    }, [])


    // console.log(getLink.Contact)


    const SelectUser = (id) => {
        setIds(id)

        let item = getLink.Contact;
        if (item !== 'undefined' && item != null) {
            setName(item[id - 1].name);
            setNum(item[id - 1].num);
            setUserId(item[id - 1].id)
            console.log("item", item[id - 1]);
            // console.log(id)
        }
        else {
            return (console.log("load"))
        } Get();
        // console.log(item[id])
    }

    console.log('ids', ids)

    const Update = () => {
        alert("You want to update?")
        let item = { name, num };
        fetch(`http://localhost:4000/Contact/${userId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        Get()
    }


    return (
        <div>
            <table border='1'>
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>NAME</td>
                        <td>NUMBER</td>

                    </tr>
                    {
                        getLink.Contact && getLink.Contact.map((elem, key) => {
                            return (

                                <tr key={key}>
                                    <td>{elem.id}</td>
                                    <td>{elem.name}</td>
                                    <td>{elem.num}</td>
                                    <td><button onClick={() => deleteuser(elem.id)}>DELETE</button></td>
                                    <td ><button onClick={() => SelectUser(elem.id)}>UPDATE</button></td>
                                    <Popup trigger={<button onClick={() => SelectUser(elem.id)}>UPDATE</button>} position="right center">
                                        <div>
                                            <input value={name} onChange={(e) => setName(e.target.value)} />
                                            <br />
                                            <input value={num} onChange={(e) => setNum(e.target.value)} />
                                            <button onClick={() => { Update() }}>Update</button>
                                        </div>
                                    </Popup>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Get
