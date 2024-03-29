import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Login } from '../api/LoginUser';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import github from '../images/icons/github.png';
import google from '../images/icons/google.png';
import okta from '../images/icons/okta.png';

const defaultTheme = createTheme();


export default function SignIn() {

  const [errorEmail, seterrorEmail] = useState(true);
  const [errorPassword, seterrorPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleSignIn(data);
  };


  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
  };

  const handleInputChangeEmail = (event) => {
    seterrorEmail(validateEmail(event.target.value));
  }
  const handleInputChangePassword = (event) => {
    seterrorPassword(event.target.value);
  }

  const isSubmitDisabled = !(errorEmail && errorPassword.length >= 6);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  async function handleSignIn(data) {
    try {
      setLoading(true);
      setProgress(35);
      const userData = await Login(data);
      if (userData) {
        setProgress(100);
        navigate("/home", toast.success("Welcome Back"));
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading ? <LoadingBar color="yellow" height={10} progress={progress} shadow={true} transitionTime={2000} waitingTime={1000} onLoaderFinished={() => setProgress(0)} /> : <></>}
      <Grid container component="main" sx={{
        height: "100vh",
        backgroundColor: `${isLoading ? '#000000' : '#FFFFFF'}`,
        backdropFilter: `blur(${isLoading ? '10px' : '0'})`,
        opacity: isLoading ? 0.8 : 1,
        boxShadow: `${isLoading ? '10px 20px 20px grey' : 'none'}`,
      }}>
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
              Sign in
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                error={errorPassword.length < 6 ? true : false}
                helperText={errorPassword.length < 6 ? 'Too Short Min. 6 ' : ''}
                onChange={handleInputChangePassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitDisabled}
                onClick={() => setLoading(true)}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/Forget" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Typography variant="h6" align="center" py={1}>Sign In with</Typography>
              <Grid item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '20px 0 0 0' }}>
                <Button disabled onClick={() => { console.log('github') }}>
                  <img src={github} alt="github" />
                </Button>
                <Button disabled onClick={() => { console.log('google') }}>
                  <img src={google} alt="google" />
                </Button>
                <Button disabled onClick={() => { console.log('okta') }}>
                  <img src={okta} alt="okta" />
                </Button>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
