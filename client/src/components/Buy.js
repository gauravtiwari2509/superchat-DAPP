import React, { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
const Buy = ({ state }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [amount, setAmount] = useState('');

    const buySuperchat = async (e) => {
        e.preventDefault();
        if (!amount.trim() || !message.trim()) {
            toast.warn("enter required field!!!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            return;
        }
        const { contract } = state;
        const value = { value: ethers.utils.parseEther(amount) };

        try {
            const transaction = await contract.buySuperChat(name, message, value);
            await transaction.wait();
            toast.success("Transaction completed", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        } catch (error) {
            if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
                const reason = error.error.data.originalError.message;
                toast.error(`Transaction reverted: ${reason}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }

                );
            } else {
                toast.error(`Error: ${error}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
    };

    return (
        <div>
            <form onSubmit={buySuperchat}>
                <label>NAME</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                />
                <label>Message*</label>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message"
                />
                <label>Amount(ETH)*</label>
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
                <button type='submit'>Pay</button>
            </form>
        </div>
    );
};

export default Buy;
