import React from 'react';

export default function Footer() {

    var style = {
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
    }

    return (
        <footer className='footer py-3 bg-dark text-white' style={style}>
            <div className='container'> &copy; {new Date().getFullYear()} Copyright</div>
        </footer>
    );
}