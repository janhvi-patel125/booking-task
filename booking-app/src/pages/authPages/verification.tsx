import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import MuiCard from '@mui/material/Card';
import { verificationData } from '../../features/auth/verificationSlice';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const VerificationPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = React.useState(['', '', '', '', '', '']);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
    const email = localStorage.getItem('userEmail') || '';

    // Optional: Redirect if no email is found
    React.useEffect(() => {
        if (!email) {
            // Redirect to signup if no email is found
            navigate('/signup');
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to next input if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join('');

        if (otpValue.length !== 6) {
            setError(true);
            setErrorMessage('Please enter a valid 6-digit OTP');
            return;
        }

        const data = {
            otp: otpValue,
            email: email,
        }
        const response = await dispatch(verificationData(data));
        if (response.meta.requestStatus === 'fulfilled') {
            localStorage.removeItem('userEmail');
            navigate('/login'); 
        }console.log('OTP submitted:', otpValue);
    };

    return (
        <>
            <CssBaseline enableColorScheme />
            <Box sx={{ marginTop: '100px' }}>
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: '28px' }}
                    >
                        Verify Your Account
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        Please enter the 6-digit OTP sent to your email
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleVerification}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                            mt: 2
                        }}
                    >
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
                            {otp.map((digit, index) => (
                                <TextField
                                    key={index}
                                    inputRef={(ref) => (inputRefs.current[index] = ref)}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e as React.KeyboardEvent<HTMLInputElement>)}
                                    variant="outlined"
                                    size="small"
                                    error={error}
                                    inputProps={{
                                        maxLength: 1,
                                        style: { textAlign: 'center', width: '40px' }
                                    }}
                                />
                            ))}
                        </Box>
                        {error && (
                            <Typography color="error" variant="caption">
                                {errorMessage}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2 }}
                        >
                            Verify OTP
                        </Button>
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default VerificationPage;