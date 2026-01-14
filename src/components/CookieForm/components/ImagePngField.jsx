import { Button } from "@/components/Actions/Button"
import { EditIcon } from "@/assets/svg/button-icons/EditIcon"

export function ImagePngField ( props ) {
    const {

        fileInputRef,
        preview,
        onFileChange,
        onOpenFilePicker,

        // clases: todas vienen del padre
        containerImageClassName = "",
        inputClassName = "",
        buttonClassName = "",
        previewImgClassName = "",
    } = props

    return (
        <div className={containerImageClassName}>
            <input
                className={inputClassName}
                ref={fileInputRef}
                type="file"
                name="image_png"
                accept="image/png"
                onChange={onFileChange}
            />

            <Button
                className={buttonClassName}
                type="button"
                onClick={onOpenFilePicker}
            >

                <EditIcon aria-hidden="true" />
                {preview ? "Cambiar" : "Añadir"}

            </Button>

            {preview && (
                <img 
                    className={previewImgClassName} 
                    src={preview} 
                    alt="preview" 
                />
            )}
        </div>
    )
}