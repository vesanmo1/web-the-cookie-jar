import "./FlavorDetailsPage.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

const FlavorDetailsPage = () => {
    const { _id } = useParams();        

    const [ cookie , setCookie ] = useState([])

    return (
        <>
            <h2> Cookie {_id} </h2>
        </>
    );
};

export default FlavorDetailsPage;
