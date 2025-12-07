// src/pages/FlavorDetailsPage.jsx
import "./FlavorDetailsPage.css";
import { useParams } from "react-router-dom";

const FlavorDetailsPage = () => {
    const { _id } = useParams();        


    return (
        <>
            <h2> Cookie {_id} </h2>
        </>
    );
};

export default FlavorDetailsPage;
