import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import SellerIcon from '@mui/icons-material/PersonPinRounded';
import ClockStart from '@mui/icons-material/TimerOutlined';
import ClockEnd from '@mui/icons-material/TimerOffOutlined';
import LocationIcon from '@mui/icons-material/Room';
import { formatCurrency } from '../utils/utilityFunctions';
import { selectAuctionData } from '../features/auctionSlice';

const AuctionInfo = () => {
  const auctionData = useSelector(selectAuctionData);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
  };

  const {
    itemName,
    images,
    minimumBid,
    seller,
    description,
    state,
    startTime,
    endTime,
  } = auctionData;

  return (
    <>
      <Paper elevation={3} sx={{ pt: 3, mb: 4 }}>
        <Slider {...settings}>
          {images.map((img) => (
            <img key={img.url} src={img.url} alt={itemName} />
          ))}
        </Slider>

        <Box sx={{ p: 2, my: 2 }}>
          <Typography
            textAlign='center'
            color='secondary'
            mb={1}
            variant='h4'
            component='h1'
          >
            {itemName}
          </Typography>

          <Typography
            textAlign='center'
            color='success.dark'
            variant='h6'
            component='h2'
          >
            Minimum Bid {formatCurrency({ amount: minimumBid })}
          </Typography>
        </Box>
      </Paper>

      <Paper as={Stack} spacing={2} elevation={3} sx={{ p: 2, mb: 4 }}>
        <Stack direction='row' spacing={2} color='grey'>
          <SellerIcon color='secondary' />{' '}
          <Chip
            sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
            avatar={
              <Avatar
                title={seller.name}
                alt={seller.name}
                src={seller.avatar}
              />
            }
            label={seller.name}
          />
        </Stack>
        <Stack direction='row' spacing={2} color='grey'>
          <ClockStart color='secondary' />{' '}
          <Typography variant='body1'>
            {new Date(startTime).toString().substring(0, 34)}
          </Typography>
        </Stack>
        <Stack direction='row' spacing={2} color='grey' variant='body1'>
          <ClockEnd color='secondary' />{' '}
          <Typography variant='body1'>
            {new Date(endTime).toString().substring(0, 34)}
          </Typography>
        </Stack>
        <Stack direction='row' spacing={2} color='grey' variant='body1'>
          <LocationIcon color='secondary' />{' '}
          <Typography variant='body1'>{state}</Typography>
        </Stack>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography color='secondary' mb={1} variant='h5' component='h2'>
          Description
        </Typography>
        <Typography color='grey' variant='body1'>
          {description}
        </Typography>
      </Paper>
    </>
  );
};

export default AuctionInfo;
