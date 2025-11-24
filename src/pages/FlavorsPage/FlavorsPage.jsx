
function FlavorsPage() {
    return (
        <div>
            <h2>Flavors</h2>
            {cookies.map( cookie =>
                <Cookie key={cookie._id} {...cookie}/>
            )}
        </div>
    )
}

export default FlavorsPage


const Cookie = ( props ) => {
    const { cookie_name , description , types } = props
    return (
        <section>
            <h2>{cookie_name}</h2>
            <p>{description}</p>
            <ul>
                {types.map( (type, index) => 
                    <Type key={index} type={type} />
                )}
            </ul>
        </section>
    )
}

const Type = ( props ) => {
    const {type} = props
    return (
        <li>{type}</li>
    )
}

const cookies = [
    {
    _id: 0,
    cookie_name: "Apple Pie Cookie",
    description: "¿Te gusta la tarta de manzana recién horneada tanto como a nosotros?",
    types: []
    },
    {
    _id: 1,
    cookie_name: "Red Velvet Cookie",
    description: "¿Te gusta la tarta de manzana recién horneada tanto como a nosotros?",
    types: []
    },
    {
    _id: 2,
    cookie_name: "Raspberry Cookie",
    description: "¿Te gusta la tarta de manzana recién horneada tanto como a nosotros?",
    types: ["vegana"]
    },
    {
    _id: 3,
    cookie_name: "S’mores Cookie",
    description: "¿Te gusta la tarta de manzana recién horneada tanto como a nosotros?",
    types: []
    }
]
