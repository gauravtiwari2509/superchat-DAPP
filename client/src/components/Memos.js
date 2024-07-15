import React, { useEffect, useState } from 'react'

const Memos = ({ state }) => {
    const [memos, setmemos] = useState([])
    const { contract } = state;
    useEffect(() => {
        //console.log(contract)
        const memoMessage = async () => {
            const memos = await contract.getMemos()
            setmemos(memos)
        }
        contract && memoMessage();
    }, [contract])

    return (
        <div>
            <h2>messages</h2>
            {
                memos.map((ele, index) => {
                    //{console.log(memos)}
                    return <div key={index}>name: {ele.name?ele.name:"Annonymous"} message: {ele.message} timestamp:{parseInt(ele.timestamp)} from:{ele.from} </div>
                })
            }
        </div>
    )
}

export default Memos
//{ele.timestamp} {ele.from}