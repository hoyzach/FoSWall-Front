import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

export const metadata = {
    title: 'Wall'
}

export default function Wall(props) {
    const cardData = [
        {
            id: 1,
            expression: "Really very super duper super duper super duper longish expression right here",
        },
        {
            id: 2,
            expression: "Another super duper longish expression right here",
        },
        {
            id: 1,
            expression: "Really very super duper super duper super duper longish expression right here",
        },
        {
            id: 1,
            expression: "Really very super duper super duper super duper longish expression right here",
        },
        {
            id: 1,
            expression: "Really very super duper super duper super duper longish expression right here",
        },
    ];

    return (
    <div className="flex flex-col sm:flex-row justify-center items-center">
        {cardData.map((data) => (
        <div key={data.id} className="w-1/2 sm:w-1/6 text-black text-center bg-gray-900 px-5 py-5 m-2 rounded">
            <div className="flex flex-col justify-around h-full items-center">
            <div className="tracking-wide text-sm text-white font-bold">FoS#{data.id}</div>
            <div className="tracking-wide text-sm text-primary">{data.expression}</div>
            <div className="tracking-wide text-sm text-white">Likes: </div>
            <div className="tracking-wide text-sm text-white">Dislikes: </div>
            <div className="flex justify-around w-full mt-3">
                <button onClick={props.handleLike} className="text-white focus:outline-none mt-0">
                <FontAwesomeIcon icon={faThumbsUp} />
                </button>
                <button onClick={props.handleDislike} className="text-white focus:outline-none mt-1">
                <FontAwesomeIcon icon={faThumbsDown} />
                </button>
            </div>
            </div>
        </div>
        ))}
    </div>
  );
}

