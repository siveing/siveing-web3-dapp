import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function SearchTokenBar() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [tokenNumer, settokenNumer] = useState(id ?? '');

    const handleSearchToken = async (event) => {
        event.preventDefault();
        if (tokenNumer !== undefined) {
            navigate(`/token/${tokenNumer}`, { replace: true });
            window.location.reload();
        }
    }

    return (
        <div className='mb-4'>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search NFT token</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-100 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="number" value={tokenNumer} onChange={e => settokenNumer(e.target.value)} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-200 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search NFT token, please enter token number" required />
                <button onClick={handleSearchToken} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search NFT token</button>
            </div>
        </div>
    )
}
