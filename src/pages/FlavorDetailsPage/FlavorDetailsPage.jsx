import "./FlavorDetailsPage.css"

const FlavorDetailsPage = ( props ) => {

    const { _id } = props.params
    
    return (
        <>
            <h2> Cookie { _id } </h2>
        </>
    )
}

export default FlavorDetailsPage
