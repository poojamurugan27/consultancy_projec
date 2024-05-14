import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LightPurpleButton } from '../utils/buttonStyles';
import { authUser } from '../redux/userHandle';
import styled from 'styled-components';
import Popup from '../components/Popup';

const AuthenticationPage = ({ mode, role }) => {

    const bgpic = "data:image/jpeg;base64,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"

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);;

    const [toggle, setToggle] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [shopNameError, setShopNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!email || !password) {
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        if (mode === "Register") {
            const name = event.target.userName.value;

            if (!name) {
                if (!name) setUserNameError(true);
                return;
            }

            if (role === "Seller") {
               const shopName = event.target.shopName.value;
                if (!shopName) {
                    if (!shopName) setShopNameError(true);
                    return;
                }

                const sellerFields = { name, email, password, role, shopName }
                dispatch(authUser(sellerFields, role, mode))
            }
            else {
                const customerFields = { name, email, password, role }

                dispatch(authUser(customerFields, role, mode))
            }
        }
        else if (mode === "Login") {
            const fields = { email, password }
            dispatch(authUser(fields, role, mode))
        }
        setLoader(true)
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'userName') setUserNameError(false);
        if (name === 'shopName') setShopNameError(false);
    };

    useEffect(() => {
        if (status === 'success' && currentRole !== null) {
            navigate('/');
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setLoader(false)
            setMessage("Network Error")
            setShowPopup(true)
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center', background: `linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0)), url(${bgpic})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <CssBaseline />
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'rgba(255, 255, 255,0.6)', borderRadius: '20px', p: 4 }}>
                <Box
                    sx={{
                        my: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    <StyledTypography>
                        {role} {mode}
                    </StyledTypography>

                    {role === "Seller" && mode === "Register" &&
                        <Typography variant="h7">
                            {/* Create your own shop by registering as an seller.
                            <br />
                            You will be able to add products and sell them. */}
                        </Typography>
                    }

                    {role === "Customer" && mode === "Register" &&
                        <Typography variant="h7">
                            Register now to explore and buy products.
                        </Typography>
                    }

                    {mode === "Login" &&
                        <Typography variant="h7">
                            Welcome back! Please enter your details
                        </Typography>
                    }

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
                        {mode === "Register" &&
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label="Enter your name"
                                name="userName"
                                autoComplete="name"
                                autoFocus
                                variant="standard"
                                error={userNameError}
                                helperText={userNameError && 'Name is required'}
                                onChange={handleInputChange}
                            />
                        }
                        {mode === "Register" && role === "Seller" &&
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="shopName"
                                label="Create your shop name"
                                name="shopName"
                                autoComplete="off"
                                variant="standard"
                                error={shopNameError}
                                helperText={shopNameError && 'Shop name is required'}
                                onChange={handleInputChange}
                            />
                        }
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Enter your email"
                            name="email"
                            autoComplete="email"
                            variant="standard"
                            error={emailError}
                            helperText={emailError && 'Email is required'}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={toggle ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            variant="standard"
                            error={passwordError}
                            helperText={passwordError && 'Password is required'}
                            onChange={handleInputChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setToggle(!toggle)}>
                                            {toggle ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                        </Grid>
                        <LightPurpleButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : mode}
                        </LightPurpleButton>
                        <Grid container>
                            <Grid>
                                {mode === "Register" ?
                                    "Already have an account?"
                                    :
                                    "Don't have an account?"
                                }
                            </Grid>
                            <Grid item sx={{ ml: 2 }}>
                                {mode === "Register" ?
                                    <StyledLink to={`/${role}login`}>
                                        Login
                                    </StyledLink>
                                    :
                                    <StyledLink to={`/${role}register`}>
                                        Register
                                    </StyledLink>
                                }
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Grid>
    );
}

export default AuthenticationPage

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
  
`;

const StyledTypography = styled.h4`
    margin: 0;
    font-weight: 400;
    font-size: 2.125rem;
    line-height: 1.235;
    letter-spacing: 0.00735em;
    color: #2c2143;
    margin-bottom: 16px;
`;
