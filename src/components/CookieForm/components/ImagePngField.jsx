import { Button } from "@/components/Actions/Button"
import { EditIcon } from "@/assets/svg/button-icons/EditIcon"

export function ImagePngField (props) {

    const { fileInputRef, preview, onFileChange, onOpenFilePicker, onClearPreview } = props

    return (
        <div className="cookie-form__image">
        <input
            className="cookie-form__file-input"
            ref={fileInputRef}
            type="file"
            name="image_png"
            accept="image/png"
            onChange={onFileChange}
        />

        <Button
            className="circular-btn  solid-black--accent-vanilla"
            type="button"
            onClick={onOpenFilePicker}
        >
            <EditIcon aria-hidden="true" />
            {preview ? "Cambiar" : "Añadir"}
        </Button>

        {preview && (
            <div className="cookie-form__preview">
            <Button
                className="circular-btn  solid-black--accent-vanilla"
                type="button"
                onClick={onClearPreview}
            >
                Borrar imagen
            </Button>

            <img className="cookie-form__preview-img" src={preview} alt="preview" />
            </div>
        )}
        </div>
    )
}