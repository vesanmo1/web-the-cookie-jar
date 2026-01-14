import { Button } from "@/components/Actions/Button"
import { EditIcon } from "@/assets/svg/button-icons/EditIcon"

export function ImagePngField ( props ) {
    const {

        fileInputRef,
        preview,
        onFileChange,
        onOpenFilePicker,

        containerImageClassName = "",
        inputClassName = "",
        infoAndActionClassName = "",
        textBlockClassName = "",
        titleTextClassName = "",
        helperTextClassName = "",
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

            <div className={infoAndActionClassName}>                
                <Button
                    className={buttonClassName}
                    type="button"
                    onClick={onOpenFilePicker}
                >

                    <EditIcon aria-hidden="true" />
                    {preview ? "Cambiar" : "Añadir"}

                </Button>
                <div className={textBlockClassName}>
                    <p className={titleTextClassName}>Imagen:</p>
                    <p className={helperTextClassName}>Debe ser PNG.</p>
                </div>
            </div>

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