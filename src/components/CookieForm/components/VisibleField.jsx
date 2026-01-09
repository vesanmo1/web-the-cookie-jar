import { Toggle } from "@/components/Actions/Toggle"
import { VisibilityOnIcon } from "@/assets/svg/button-icons/VisibilityOnIcon"
import { VisibilityOffIcon } from "@/assets/svg/button-icons/VisibilityOffIcon"

export function VisibleField(props) {

    const { visible, onChange } = props

    return (
        <Toggle
            name="visible"
            checked={visible}
            onChange={onChange}
            className={`cookie-form__btn pill-btn fit-btn ${
                visible ? "solid-black--accent-vanilla" : "ghost--accent-black"
            }`}
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