import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Gavel from '@mui/icons-material/Gavel';
import SignIn from '@mui/icons-material/Login';
import SignUp from '@mui/icons-material/PersonAdd';

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth.userLogin);
  return (
    <HeroContainer>
      <div>
        <Stack>
          <Typography variant='h2' mb={1}>
            Wanna Bid? Just Give It a Try <Gavel sx={{ fontSize: '40px' }} />
          </Typography>
          <Typography variant='body1' gutterBottom>
            The perfect bidder is always the winner! Win, and get a smile on
            that face of yours.
          </Typography>
        </Stack>
        <Stack spacing={2} direction='row' justifyContent='center' mt={4}>
          {isLoggedIn ? (
            <Button variant='contained' color='secondary'>
              <Link to='/auctions'>View Auctions</Link>
            </Button>
          ) : (
            <>
              <Button
                variant='contained'
                color='secondary'
                startIcon={<SignIn />}
              >
                <Link to='/login'>Login</Link>
              </Button>
              <Button
                variant='contained'
                color='success'
                startIcon={<SignUp />}
              >
                <Link to='/register'>Register</Link>
              </Button>
            </>
          )}
        </Stack>
      </div>
    </HeroContainer>
  );
};

export default Home;

const HeroContainer = styled.section`
  text-align: center;
  color: #fff;
  padding: 2rem;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)),
    url('/assets/images/hero-image.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
