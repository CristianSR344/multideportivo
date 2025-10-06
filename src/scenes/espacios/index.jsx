import {
    Box,
    Button,
    TextField,
    Typography,
    FormControl,
    OutlinedInput,
    InputAdornment,
    FormHelperText,
    useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import { useRef } from "react";

const initialValues = {
    nombreEsp: "",
    descripcion: "",
    servicio: "",
    imagenes: [], // 👈 arreglo de imágenes
};

// ✅ Validación
const userSchema = yup.object().shape({
    nombreEsp: yup.string().required("Campo Requerido"),
    descripcion: yup.string().required("Campo Requerido"),
    // servicio: yup.string().required("Campo Requerido"), // <- descomenta si lo quieres obligatorio
    imagenes: yup
        .array()
        .of(
            yup
                .mixed()
                .test(
                    "fileType",
                    "Solo se permiten imágenes (jpg/png)",
                    (file) =>
                        file
                            ? ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
                            : true
                )
                .test(
                    "fileSize",
                    "La imagen no debe exceder 3MB",
                    (file) => (file ? file.size <= 3 * 1024 * 1024 : true)
                )
        )
        .max(5, "Máximo 5 imágenes"),
});

const Espacios = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const fileRef = useRef(null);

    const handleFormSubmit = (values) => {
        const formData = new FormData();
        formData.append("nombreEsp", values.nombreEsp);
        formData.append("servicio", values.servicio);
        formData.append("descripcion", values.descripcion);

        // Añadir todas las imágenes al FormData
        values.imagenes.forEach((img, i) => {
            formData.append(`imagen_${i}`, img);
        });

        console.log("Payload (valores de Formik):", values);
        // Si vas a enviar a backend con fetch/axios:
        // await fetch('/api/espacios', { method: 'POST', body: formData })
    };

    return (
        <Box m="20px">
            <Header title="Espacios" subtitle="Consultar Información de los Espacios" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                }) => (
                    <>
                        <Box display="flex" gap={3}>
                            {/* Formulario */}
                            <Box component="form" flex={2} onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="20px"
                                    gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                                    }}
                                >
                                    {/* Nombre del Espacio */}
                                    <Typography fontSize="24px">Nombre del Espacio</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        name="nombreEsp"
                                        placeholder="Nombre del Espacio"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.nombreEsp}
                                        error={!!touched.nombreEsp && !!errors.nombreEsp}
                                        helperText={touched.nombreEsp && errors.nombreEsp}
                                        sx={{ gridColumn: "span 1" }}
                                        slotProps={{
                                            input: {
                                                sx: {
                                                    borderRadius: "20px",
                                                    fontSize: "18px",
                                                },
                                            },
                                        }}
                                    />

                                    {/* Servicio */}
                                    <Typography fontSize="24px">Servicio</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        name="servicio"
                                        placeholder="Servicio"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.servicio}
                                        error={!!touched.servicio && !!errors.servicio}
                                        helperText={touched.servicio && errors.servicio}
                                        sx={{ gridColumn: "span 1" }}
                                        slotProps={{
                                            input: {
                                                sx: {
                                                    borderRadius: "20px",
                                                    fontSize: "18px",
                                                },
                                            },
                                        }}
                                    />

                                    {/* Descripción */}
                                    <Typography fontSize="24px">Descripción</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        multiline
                                        rows={3}
                                        name="descripcion"
                                        placeholder="Descripción"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.descripcion}
                                        error={!!touched.descripcion && !!errors.descripcion}
                                        helperText={touched.descripcion && errors.descripcion}
                                        sx={{ gridColumn: "span 1" }}
                                        slotProps={{
                                            input: {
                                                sx: {
                                                    borderRadius: "20px",
                                                    fontSize: "18px",
                                                },
                                            },
                                        }}
                                    />

                                    {/* Imágenes (mismo look que TextField) */}
                                    <Typography fontSize="24px">Imágenes</Typography>
                                    <FormControl
                                        fullWidth
                                        size="small"
                                        sx={{ gridColumn: "span 1" }}
                                        error={Boolean(touched.imagenes && errors.imagenes)}
                                    >
                                        <OutlinedInput
                                            readOnly
                                            onClick={() => fileRef.current?.click()}
                                            value={
                                                values.imagenes && values.imagenes.length > 0
                                                    ? values.imagenes.map((f) => f.name).join(", ")
                                                    : ""
                                            }
                                            placeholder="Seleccionar imágenes"
                                            sx={{
                                                borderRadius: "20px",
                                                fontSize: "18px",
                                                cursor: "pointer",
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <Button
                                                        onClick={() => fileRef.current?.click()}
                                                        variant="contained"
                                                        size="small"
                                                        color="secondary"
                                                    >
                                                        Buscar
                                                    </Button>
                                                </InputAdornment>
                                            }
                                        />

                                        {/* input real, oculto */}
                                        <input
                                            hidden
                                            ref={fileRef}
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => {
                                                const files = Array.from(e.currentTarget.files || []);
                                                setFieldValue("imagenes", files);
                                            }}
                                        />

                                        <FormHelperText>
                                            {touched.imagenes && typeof errors.imagenes === "string"
                                                ? errors.imagenes
                                                : ""}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>

                                {/* Botones */}
                                <Box display="flex" justifyContent="end" mt="20px" gap={2}>
                                    <Button
                                        type="submit"
                                        color="secondary"
                                        variant="contained"
                                        size="large"
                                        sx={{ width: "300px" }}
                                    >
                                        Guardar
                                    </Button>
                                    <Button
                                        type="button"
                                        color="secondary"
                                        variant="contained"
                                        size="large"
                                        sx={{ width: "300px" }}
                                    >
                                        Eliminar
                                    </Button>
                                    <Button
                                        type="button"
                                        color="secondary"
                                        variant="contained"
                                        size="large"
                                        sx={{ width: "300px" }}
                                        component={Link}
                                        to="/verSocios"
                                    >
                                        Ver Espacios
                                    </Button>
                                </Box>
                            </Box>

                            {/* Vista previa (opcional) */}
                            <Box flex={1} display="grid" gap={1}>
                                {/* Puedes mostrar thumbnails aquí si luego lo deseas */}
                            </Box>
                        </Box>
                    </>
                )}
            </Formik>
        </Box>
    );
};

export default Espacios;
