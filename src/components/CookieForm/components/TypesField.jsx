import { Toggle } from "@/components/Actions/Toggle"
import { AddIcon } from "@/assets/svg/button-icons/AddIcon"
import { CheckIcon } from "@/assets/svg/button-icons/CheckIcon"

export function TypesField ( props ) {

    const {
        vegana,
        sinGluten,
        onChangeVegana,
        onChangeSinGluten,
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