import React from 'react';

const OHSession = ({params}:any) => {
    return (
        <div>
            This is a dynamic route that is used to create a form page for students to use to add themselves to the queue.
            <p>{params.id}</p>
        </div>
    )
}

export default OHSession;
