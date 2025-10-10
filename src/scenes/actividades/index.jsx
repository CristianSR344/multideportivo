import { Box, Button, TextField, Typography, FormControl, Select, MenuItem, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
// import { tokens } from "../../theme";
import { Link } from "react-router-dom";

const initialValues = {
    nombreAct: "",
    lugar: "",
    descripcion: "",
    imagenes: [], // 👈 arreglo de imágenes
};

// ✅ Validación
const userSchema = yup.object().shape({
    nombreAct: yup.string().required("Campo Requerido"),
    descripcion: yup.string().required("Campo Requerido"),
    imagenes: yup
        .array()
        .of(
            yup
                .mixed()
                .test("fileType", "Solo se permiten imágenes (jpg/png)", (file) =>
                    file ? ["image/jpeg", "image/png", "image/jpg"].includes(file.type) : true
                )
                .test("fileSize", "La imagen no debe exceder 3MB", (file) =>
                    file ? file.size <= 3 * 1024 * 1024 : true
                )
        )
        .max(5, "Máximo 5 imágenes"), // 👈 límite opcional
});

const Actividades = () => {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        const formData = new FormData();
        formData.append("nombreAct", values.nombreAct);
        formData.append("lugar", values.lugar);
        formData.append("descripcion", values.descripcion);

        // Añadir todas las imágenes al FormData
        values.imagenes.forEach((img, i) => {
            formData.append(`imagen_${i}`, img);
        });

        console.log("Payload:", values);
    };

    return (
        <Box m="20px">
            <Header title="Actividades" subtitle="Consultar los informacion de las Actividades"/>

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
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
                                    {/* Nombre */}
                                    <Typography fontSize="24px">Nombre de la Actividad</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        name="nombreAct"
                                        placeholder="Nombre de la Actividad"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.nombreAct}
                                        error={!!touched.nombreAct && !!errors.nombreAct}
                                        helperText={touched.nombreAct && errors.nombreAct}
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

                                    {/* Lugar */}
                                    <Typography fontSize="24px">Lugar</Typography>
                                    <FormControl fullWidth size="small">
                                        <Select
                                            name="lugar"
                                            value={values.lugar}
                                            onChange={handleChange}
                                            sx={{ borderRadius: "20px" }}
                                        >
                                            <MenuItem value="cancha-basquet">Cancha de Basquet</MenuItem>
                                            <MenuItem value="cancha-volley">Cancha de Volley</MenuItem>
                                        </Select>
                                    </FormControl>

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

                                    {/* Imágenes */}
                                    <Typography fontSize="24px">Imágenes</Typography>
                                    <Box>
                                        <Button variant="outlined" component="label" sx={{ borderRadius: "20px" }}>
                                            Seleccionar imágenes
                                            <input
                                                hidden
                                                type="file"
                                                accept="image/*"
                                                multiple // 👈 habilita selección múltiple
                                                onChange={(e) => {
                                                    const files = Array.from(e.currentTarget.files || []);
                                                    setFieldValue("imagenes", files);
                                                }}
                                            />
                                        </Button>

                                        {/* Lista de archivos seleccionados */}
                                        {values.imagenes.length > 0 && (
                                            <Box mt={1}>
                                                {values.imagenes.map((file, i) => (
                                                    <Typography key={i} variant="body2">
                                                        {file.name}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        )}

                                        {/* Errores */}
                                        {errors.imagenes && (
                                            <Typography variant="caption" color="error">
                                                {errors.imagenes}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>

                                {/* Botones */}
                                <Box display="flex" justifyContent="end" mt="20px" gap={2}>
                                    <Button type="submit" color="secondary" variant="contained" size="large" sx={{ width: "300px" }}>
                                        Guardar
                                    </Button>
                                    <Button type="button" color="secondary" variant="contained" size="large" sx={{ width: "300px" }}>
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
                                        Ver Actividades
                                    </Button>
                                </Box>
                            </Box>

                            {/* Vista previa */}
                            <Box flex={1} display="grid" gap={1}>

                            </Box>
                        </Box>
                    </>
                )}
            </Formik>
        </Box>
    );
};

export default Actividades;
