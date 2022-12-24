import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import NoPerson from '@mui/icons-material/VoiceOverOff';
import { getHighestBid, selectAuctionData } from '../features/auctionSlice';
import { formatCurrency } from '../utils/utilityFunctions';

const AuctionWinner = () => {
  const { winner } = useSelector(selectAuctionData);
  const highestBid = useSelector(getHighestBid);
  const { user } = useSelector((state) => state.auth.userLogin);

  return (
    <Card sx={{ p: 2 }}>
      <CardActionArea>
        {winner ? (
          <Avatar
            sx={{ mx: 'auto', width: '60px', height: '60px' }}
            src={winner.avatar}
          />
        ) : (
          <Avatar
            sx={{
              mx: 'auto',
              width: '60px',
              height: '60px',
              bgcolor: 'error.dark',
            }}
          >
            <NoPerson fontSize='large' />
          </Avatar>
        )}
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            component='p'
            color='success.dark'
            textAlign='center'
          >
            {!winner
              ? 'Nobody Won'
              : winner._id === user.id
              ? 'Hooray! 🎉'
              : 'Winner'}
          </Typography>
          <Typography
            gutterBottom
            variant='h5'
            component='p'
            color='error.dark'
            textAlign='center'
          >
            Highest Bid {formatCurrency({ amount: highestBid })}
          </Typography>
          <Typography variant='body2' color='text.secondary' textAlign='center'>
            {winner
              ? `${
                  winner._id === user.id ? 'You' : winner.name
                } won this auction. Stay tuned for more such auction!`
              : 'Nobody attended this auction. Hence nobody bid on this auction'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AuctionWinner;
