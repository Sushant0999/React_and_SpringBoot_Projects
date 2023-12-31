import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { toast } from "react-toastify";
import { ForgetUser } from '../api/ForgetUser';


const defaultTheme = createTheme();


export default function Forget() {

    const [errorEmail, seterrorEmail] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLowerCase());
    };

    const handleInputChangeEmail = (event) => {
        seterrorEmail(validateEmail(event.target.value));
    }

    const isSubmitDisabled = !(errorEmail);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        handleForget(data);
    };

    async function handleForget(data) {
        
        try {
            setLoading(true);
            setProgress(35);
            
            const userData = await ForgetUser(data);
            console.log(userData);
            if (userData) {
                setProgress(100);
                
                navigate("/reset",toast.success("Check Email"));
            }
        } catch (error) {
            console.error('Login failed:', error);
            navigate("/reset", toast.warn("Error"));
        } finally {
            setLoading(false);
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            {isLoading ? <LoadingBar color="yellow" height={10} progress={progress} shadow={true} transitionTime={2000} waitingTime={1000} onLoaderFinished={() => setProgress(0)} /> : <></>}
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://source.unsplash.com/random?wallpapers)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Forget Password
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={errorEmail ? false : true}
                                helperText={errorEmail === false ? 'Invalid email address' : ''}
                                onChange={handleInputChangeEmail}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={isSubmitDisabled}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Send Link
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/signin" variant="body2">
                                        {"Sign In"}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/SignUp" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
