import { Toggle } from "@/components/Actions/Toggle"
import { VisibilityOnIcon } from "@/assets/svg/button-icons/VisibilityOnIcon"
import { VisibilityOffIcon } from "@/assets/svg/button-icons/VisibilityOffIcon"

export function VisibleField ( props ) {

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