import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";




const initialValues = {
    membresia: "",
    folio: "",
    password: "",
    nombres: "",
    apellidoP: "",
    apellidoM: "",
    fechaN: "",
    sexo: "",
    codigoP: "",
    colonia: "",
    calle: "",
    numero: "",
}

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;



const userSchema = yup.object().shape({
    folio: yup.string().required("Campo Requerido"),
    password: yup.string().required("Campo Requerido"),
    nombres: yup.string().required("Campo Requerido"),
    apellidoP: yup.string().required("Campo Requerido"),
    apellidoM: yup.string().required("Campo Requerido"),
    email: yup.string().email("Correo Invalido").required("Campo Requerido"),
    contact: yup.string()
        .matches(phoneRegExp, "Numero de telefono no valido")
        .required("Campo Requerido"),
    codigoP: yup.string().required("Campo Requerido"),
    colonia: yup.string().required("Campo Requerido"),
})


const Socios = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    }
    const headerName = (values) => {
        console.log(values);
    }

    return <Box m="20px">


        <Header title="SOCIOS" />
        <Box display="flex" gap={4}>
            <Box flex={3}>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={userSchema}
                >
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Box display="grid" gap="20px" gridTemplateColumns="repeat(2, minmax(0, 1fr))" sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span " }, // si es movil que ocupe las 4 columnas
                            }}>
                                {/* Membresia */}
                                <Typography sx={{ minWidth: "100px", gridColumn: "span 2" }} fontWeight="bold" fontSize="28px">Informacion de Membresia</Typography>
                                <Typography sx={{ minWidth: "100px", ml: "15px", }} fontSize="24px">Tipo de Membresia</Typography>
                                {/* Combo Box */}
                                <FormControl fullWidth size="small">
                                    <Select
                                        placeholder="Tipo de Membresia"
                                        value={values.membresia}
                                        name="membresia"
                                        onChange={handleChange}
                                        sx={{
                                            borderRadius: "20px",
                                        }}
                                    >
                                        <MenuItem value="individual">Individual</MenuItem>
                                        <MenuItem value="familiar">Familiar</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Informacion del Socio */}
                                <Typography sx={{ minWidth: "100px", gridColumn: "span 2" }} fontWeight="bold" fontSize="28px">Informacion del Socio</Typography>
                                <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">Folio</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Folio"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.folio}
                                    name="folio"
                                    error={!!touched.folio && !!errors.folio}
                                    helperText={touched.folio && errors.folio}
                                    sx={{ gridColumn: "span 1" }}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                borderRadius: "20px",
                                            },
                                        },
                                    }}
                                />

                                <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">Password</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: "span 1" }}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                borderRadius: "20px",
                                            },
                                        },
                                    }}
                                />


                                <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">Nombres</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Nombres"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.nombres}
                                    name="nombres"
                                    error={!!touched.nombres && !!errors.nombres}
                                    helperText={touched.nombres && errors.nombres}
                                    sx={{ gridColumn: "span 1" }}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                borderRadius: "20px",
                                            },
                                        },
                                    }}
                                />


                                <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">Apellido Paterno</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Apellido Paterno"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.apellidoP}
                                    name="apellidoP"
                                    error={!!touched.apellidoP && !!errors.apellidoP}
                                    helperText={touched.apellidoP && errors.apellidoP}
                                    sx={{ gridColumn: "span 1" }}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                borderRadius: "20px",
                                            },
                                        },
                                    }}
                                />


                                <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">Apellido Materno</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Apellido Materno"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.apellidoM}
                                    name="apellidoM"
                                    error={!!touched.apellidoM && !!errors.apellidoM}
                                    helperText={touched.apellidoM && errors.apellidoM}
                                    sx={{ gridColumn: "span 1" }}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                borderRadius: "20px",
                                            },
                                        },
                                    }}
                                />


                                <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">Fecha de Nacimiento</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="date"
                                    placeholder="Fecha de Nacimiento"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.fechaN}
                                    name="fechaN"
                                    error={!!touched.fechaN && !!errors.fechaN}
                                    helperText={touched.fechaN && errors.fechaN}
                                    sx={{ gridColumn: "span 1" }}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                borderRadius: "20px",
                                            },
                                        },
                                    }}
                                />

                                <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">Sexo</Typography>
                                {/* Combo Box */}
                                <FormControl fullWidth size="small">
                                    <Select
                                        placeholder="Sexo"
                                        value={values.sexo}
                                        name="sexo"
                                        onChange={handleChange}
                                        sx={{
                                            borderRadius: "20px",
                                        }}
                                    >
                                        <MenuItem value="masculino">Masculino</MenuItem>
                                        <MenuItem value="femenino">Femenino</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Domicilio */}
                                <Typography sx={{ minWidth: "100px", gridColumn: "span 2" }} fontWeight="bold" fontSize="28px">Domicilio</Typography>
                                <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">Codigo Postal</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Codigo Postal"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.codigoP}
                                    name="codigoP"
                                    error={!!touched.codigoP && !!errors.codigoP}
                                    helperText={touched.codigoP && errors.codigoP}
                                    sx={{ gridColumn: "span 1" }}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                borderRadius: "20px",
                                            },
                                        },
                                    }}
                                />

                                <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">Colonia</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Colonia"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.colonia}
                                    name="colonia"
                                    error={!!touched.colonia && !!errors.colonia}
                                    helperText={touched.colonia && errors.colonia}
                                    sx={{ gridColumn: "span 1" }}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                borderRadius: "20px",
                                            },
                                        },
                                    }}
                                />


                                <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">Calle</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Calle"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.calle}
                                    name="calle"
                                    error={!!touched.calle && !!errors.calle}
                                    helperText={touched.calle && errors.calle}
                                    sx={{ gridColumn: "span 1" }}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                borderRadius: "20px",
                                            },
                                        },
                                    }}
                                />


                                <Typography sx={{ minWidth: "100px", ml: "15px" }} fontSize="24px">Numero</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Numero"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.numero}
                                    name="numero"
                                    error={!!touched.numero && !!errors.numero}
                                    helperText={touched.numero && errors.numero}
                                    sx={{ gridColumn: "span 1" }}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                borderRadius: "20px",
                                            },
                                        },
                                    }}
                                />


                            </Box>

                        </form>
                    )}
                </Formik>
            </Box>

            <Box
                flex={1}
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                sx={{ alignSelf: "center", mr: "100px", ml: "100px" }}
            >
                <img
                    src="/assets/user2.jpg"
                    alt="Socio"
                    style={{
                        width: "100%",          // tamaño fijo más controlado
                        height: "auto%",
                        borderRadius: "50%",
                        display: "block",
                        margin: "0 auto"         // 👈 asegura que quede centrada
                    }}
                />
            </Box>
        </Box>

        <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained" size="large" sx={{ mr: "20px", width: "300px" }}>
                Guardar
            </Button>
            <Button type="submit" color="secondary" variant="contained" size="large" sx={{ mr: "20px", width: "300px" }}>
                Eliminar
            </Button>
            <Button
                type="button"
                color="secondary"
                variant="contained"
                size="large"
                sx={{ mr: "20px", width: "300px" }}
                component={Link}
                to="/verSocios"   // 👈 ruta definida en tus <Routes>
            >
                Ver Socios
            </Button>
        </Box>

        
    </Box>

};
export default Socios;