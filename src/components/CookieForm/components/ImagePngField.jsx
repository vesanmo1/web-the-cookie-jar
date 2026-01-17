// ============================================================
// IMAGE PNG FIELD
//
// Componente reutilizable para subir una imagen PNG y mostrar su preview.
//
// Qué hace:
// 1) Renderiza un <input type="file"> (acepta solo PNG)
// 2) Muestra un botón para abrir el selector de archivos (sin tocar el input directo)
// 3) Muestra textos de ayuda ("Imagen" / "Debe ser PNG")
// 4) Si existe preview, pinta la imagen debajo
//
// Props importantes:
// - fileInputRef: ref al input file (para poder hacer click programático)
// - preview: string con la URL/base64 para previsualizar (si existe)
// - onFileChange: función que se dispara cuando el usuario elige un archivo
// - onOpenFilePicker: función que abre el selector (normalmente: ref.current.click())
// - classNames: varias props para personalizar estilos desde el padre
// ============================================================

// Botón reutilizable con estilos comunes
import { Button } from "@/components/Actions/Button"
// Icono del botón (editar/cambiar)
import { EditIcon } from "@/assets/svg/button-icons/EditIcon"

export function ImagePngField ( props ) {

    // Sacamos las props que necesita el componente
    const {
        fileInputRef,
        preview,
        onFileChange,
        onOpenFilePicker,
        
        // Clases CSS opcionales para personalizar el componente
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