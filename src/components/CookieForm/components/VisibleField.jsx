// ============================================================
// VISIBLE FIELD
//
// Componente reutilizable para marcar si una cookie es visible u oculta.
// Usa un <Toggle> (checkbox con estilo botón) en modo CONTROLADO.
//
// Qué hace:
// 1) Renderiza un Toggle con name="visible"
// 2) El estado lo controla el padre con la prop "visible" (checked)
// 3) Cambia el icono y el texto según el estado:
//    - visible = true  -> "Visible" + icono ojo abierto
//    - visible = false -> "Oculta"  + icono ojo cerrado
// 4) Permite pasar props extra al Toggle con ...rest (disabled, aria-*, etc.)
// ============================================================

import { Toggle } from "@/components/Actions/Toggle"
import { VisibilityOnIcon } from "@/assets/svg/button-icons/VisibilityOnIcon"
import { VisibilityOffIcon } from "@/assets/svg/button-icons/VisibilityOffIcon"

export function VisibleField ( props ) {

    // Props:
    // - visible: boolean que indica el estado actual (controlado)
    // - onChange: handler cuando el usuario cambia el toggle
    // - className: clases extra para el toggle
    // - ...rest: props extra (disabled, title, aria-label, etc.)
    const { visible, onChange, className = "", ...rest } = props

    return (
        <Toggle
            name="visible"
            checked={visible}
            onChange={onChange}
            className={className}
            {...rest}
        >
        {visible ? (
            <>
                <VisibilityOnIcon aria-hidden="true" />
                <span>Visible</span>
            </>
        ) : (
            <>
                <VisibilityOffIcon aria-hidden="true" />
                <span>Oculta</span>
            </>
        )}
        </Toggle>
    )
}