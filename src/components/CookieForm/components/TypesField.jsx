// ============================================================
// TYPES FIELD
//
// Componente reutilizable para elegir los tipos/categorías de una cookie.
// En este caso hay 2 toggles:
// - Vegana
// - Sin gluten
//
// Qué hace:
// 1) Renderiza dos <Toggle> (checkbox con estilo botón)
// 2) Cada toggle es CONTROLADO (usa checked)
// 3) Cambia el icono según el estado:
//    - Si está activo -> icono de check
//    - Si está desactivado -> icono de añadir
//
// Props importantes:
// - vegana / sinGluten: booleanos que controlan el estado de cada toggle
// - onChangeVegana / onChangeSinGluten: handlers para actualizar el estado
// - className: clase del contenedor
// - veganaToggleClassName / sinGlutenToggleClassName: clases para cada toggle
// ============================================================
import { Toggle } from "@/components/Actions/Toggle"
import { AddIcon } from "@/assets/svg/button-icons/AddIcon"
import { CheckIcon } from "@/assets/svg/button-icons/CheckIcon"

export function TypesField ( props ) {

    const {
        vegana,
        sinGluten,
        onChangeVegana,
        onChangeSinGluten,
        // Clases opcionales
        className = "",
        veganaToggleClassName = "",
        sinGlutenToggleClassName = "",
    } = props

    return (
        <div className={className}>
            <Toggle
                name="type_vegana"
                checked={vegana}
                onChange={onChangeVegana}
                className={veganaToggleClassName}
            >
            {vegana ? (
                <>
                    <CheckIcon aria-hidden="true" />
                    <span>Vegana</span>
                </>
            ) : (
                <>
                    <AddIcon aria-hidden="true" />
                    <span>Vegana</span>
                </>
            )}
            </Toggle>

            <Toggle
                name="type_sin_gluten"
                checked={sinGluten}
                onChange={onChangeSinGluten}
                className={sinGlutenToggleClassName}
            >
            {sinGluten ? (
                <>
                    <CheckIcon aria-hidden="true" />
                    <span>Sin gluten</span>
                </>
            ) : (
                <>
                    <AddIcon aria-hidden="true" />
                    <span>Sin gluten</span>
                </>
            )}
            </Toggle>
        </div>
    )
}