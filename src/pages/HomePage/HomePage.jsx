// Importación del CSS que da estilos a la home
import "./HomePage.css"

function HomePage() {
    return (
        <>
            <div className='home'>
                <h1>HomePage</h1>
            </div>
            <div className="home2"></div>
            <div className="home3">
                {/* Medio círculo (mitad de abajo) */}
                <svg width="200" height="100" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,0 A50,50 0 0 0 100,0 Z"/>
                </svg>
            </div>
        </>
    )
}

export default HomePage
