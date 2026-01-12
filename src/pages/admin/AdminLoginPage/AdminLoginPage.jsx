// ============================================================
// ADMIN LOGIN PAGE
//
// Esta página sirve para:
// 1) Mostrar un formulario de login (user_name + password)
// 2) Validar los datos antes de llamar a la API (con alert)
// 3) Llamar a login() del Context (que hace POST /auth)
// 4) Si el login es correcto -> navegar a /admin/flavors
// 5) Si es incorrecto -> mostrar un alert con el error
//
// NOTA:
// - El login real lo valida el backend (MongoDB).
// - En el front solo hacemos validaciones básicas para no enviar datos mal.
// ============================================================

// ============================================================
// ESTILOS
// ============================================================
import "./AdminLoginPage.css"

// Importa NavLink para crear enlaces internos que navegan entre rutas sin recargar la página
import { NavLink } from "react-router-dom"
// Importa el componente SVG del logo versión reducida
import { LogoMini } from '@/assets/svg/logos/LogoMini.jsx'

// ============================================================
// IMPORTS
// ============================================================

// Hooks de React:
// - useRef: para coger los inputs del form sin usar onChange
// - useEffect: para redirigir si ya estaba logueado
// - useState: para guardar el mensaje de error en pantalla
// - useContext: para usar funciones del CookiesContext
import { useRef, useEffect, useContext } from "react"

// useNavigate: para cambiar de ruta sin recargar la página (React Router)
import { useNavigate } from "react-router-dom"


// Context global donde está la función login()
import { CookiesContext } from "@/context/CookiesContext" // ajusta esta ruta si tu archivo se llama distinto

// Componentes botón/enlace 
import { Link } from "@/components/Actions/Link"
import { Button } from "@/components/Actions/Button"

// ============================================================
// COMPONENTE
// ============================================================
export const AdminLoginPage = () => {

    // navigate() permite redirigir a otra ruta
    const navigate = useNavigate()

    // loginForm es una referencia al <form>.
    // Así podemos leer sus inputs directamente:
    // const [user_name, password] = loginForm.current
    const loginForm = useRef(null)

    // Sacamos del Context la función login()
    // login() hace POST /auth y devuelve un objeto:
    // - { ok: true } si el login es correcto
    // - { ok: false, message } si el login falla
    const { login } = useContext(CookiesContext)


    // ============================================================
    // EFECTO INICIAL
    // Si ya existe localStorage.login, significa que ya está "logueado"
    // -> redirigimos directo al panel admin.
    //
    // replace: true evita volver atrás con el navegador al login
    // ============================================================
    useEffect(() => {
        if (localStorage.getItem("login")) {
        navigate("/admin/flavors", { replace: true })
        }
    }, [])

    // ============================================================
    // LOGIN USER (submit del formulario)
    //
    // Pasos:
    // 1) Evita que el form recargue la página
    // 2) Lee user_name y password del formulario
    // 3) Valida los datos (igual que el middleware del backend)
    // 4) Llama a login() del Context (POST /auth)
    // 5) Si OK -> navega a /admin/flavors
    // 6) Si KO -> alert con el mensaje
    // ============================================================
    const loginUser = async (e) => {
        e.preventDefault()

        // Cogemos los inputs del formulario (por orden)
        const [user_name, password] = loginForm.current

        // Guardamos sus valores para usarlo en validaciones y petición
        const userNameValue = user_name.value
        const passwordValue = password.value

    // ================== VALIDACIONES (IGUALES QUE MIDDLEWARE) ==================

    // 1) Existen (no vacíos)
    if ( !userNameValue.trim() ) return alert("Faltan credenciales: user_name es obligatorio")
    if ( !passwordValue.trim() ) return alert("Faltan credenciales: password es obligatorio")

    // 2) Longitud mínima (>= 4 tras trim)
    if ( userNameValue.trim().length < 4 ) return alert("Credenciales inválidas: user_name debe contener al menos 4 caracteres")
    if ( passwordValue.trim().length < 4 ) return alert("Credenciales inválidas: password debe contener al menos 4 caracteres")

    // 3) Regex user_name (igual que middleware)
    const userNameRegex = /^[a-zA-Z0-9._-]{4,30}$/
    if ( !userNameRegex.test(userNameValue.trim()) ) {
      return alert("El campo user_name no es válido (solo letras, números, . _ - y longitud entre 4 y 30 caracteres)")
    }

    // ================== PETICIÓN ==================
    // Llamamos a login() del Context.
    // El Context hace POST /auth y devuelve { ok: true } o { ok: false, message }.
    const result = await login( userNameValue, passwordValue )

    // Si el login fue correcto, entramos al panel
    if ( result.ok ) {
            navigate("/admin/flavors", { replace: true })
        } else {
            // Si falla, mostramos un alert con el mensaje del backend (o uno genérico)
            alert("Usuario no registrado")
        }
    }

    
  // ============================================================
  // RENDER
  // ============================================================
  return (
        <main className="login-layout">
            <div className="container">
                <header className="login__header">
                    <NavLink className="login__link" to={'/'}>      
                        <LogoMini className="login__logo" aria-label="Logo de The Cookie Jar (versión reducida)" role="img" />     
                    </NavLink> 
                    <h1 className="login__title  poppins-bold-uppercase">¡Hola de nuevo admin!</h1>
                    <h2 className="login__subtitle  plus-jakarta-bold">Introduce tus datos de acceso para poder editar la carta de cookies.</h2>
                </header>
                <form ref={loginForm} onSubmit={loginUser}>
                    <div className="login__input-container">
                        <input className="login__input" type="text" name="user_name" placeholder="Usuario" autoComplete="off"/>
                        <input className="login__input" type="password" name="password" placeholder="Contraseña"/>
                    </div>
                    <Button 
                        type="submit" 
                        className="login__btn  pill-btn  solid-black--accent-vanilla"
                    >
                        Entrar
                    </Button>
                </form>
                <div className="login__link-container">
                    <Link to={'/'} className="pill-btn  ghost--accent-black">
                        Volver a inicio
                    </Link>
                </div>
            </div>
        </main>
    )
}