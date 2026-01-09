import { Toggle } from "@/components/Actions/Toggle";
import { AddIcon } from "@/assets/svg/button-icons/AddIcon";
import { CheckIcon } from "@/assets/svg/button-icons/CheckIcon";

export function TypesField (props) {

    const { vegana, sinGluten, onChangeVegana, onChangeSinGluten } = props

    return (
        <div className="cookie-form__types">
            <Toggle
                name="type_vegana"
                checked={vegana}
                onChange={onChangeVegana}
                className={`pill-btn ${
                    vegana ? "solid-vanilla--accent--black" : "ghost--accent-vanilla"
                }`}
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
                className={`pill-btn ${
                    sinGluten ? "solid-vanilla--accent--black" : "ghost--accent-vanilla"
                }`}
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
    );
}