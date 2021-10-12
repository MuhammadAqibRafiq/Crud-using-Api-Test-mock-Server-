import React, { useState, useEffect } from 'react'

const Post = () => {

    const [name, setName] = useState()
    const [num, setNum] = useState()

    const Get = async () => {
        const response = await fetch("http://localhost:4000/db")
        // console.log(response)
        const result = await response.json();
        // setGetLink(result)
        // console.log(result.Contact)
    }


    const post = () => {
        console.log(name, num);
        let data = { name, num }
        let res = fetch("http://localhost:4000/Contact", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        Get();
    }
    // useEffect(() => {
    //     post();
    //     // SelectUser()
    // }, [])


    return (
        <div>

            <input value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <input value={num} onChange={(e) => setNum(e.target.value)} />
            <button onClick={post}>Post</button>

        </div>
    )
}

export default Post