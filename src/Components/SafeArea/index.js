import React from 'react'

export default function SafeArea(props) {
    return (
        <div className={`mt-5 min-h-full ` + props.className}>
            {props.children}
        </div>
    )
}
