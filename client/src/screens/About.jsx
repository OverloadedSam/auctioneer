import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const About = () => {
  return (
    <Container>
      <Typography variant='h2' textAlign='center' sx={{ my: 3 }} component='h1'>
        About Us
      </Typography>

      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography mb={3} variant='body1'>
          Welcome to our real-time auction and bidding app! We are a team of
          passionate auction enthusiasts who have created a platform for users
          to participate in live auctions from the comfort of their own homes.
          Our app features a wide variety of auctions, from fine art and
          antiques to collectibles and rare finds.
        </Typography>
        <Typography mb={3} variant='body1'>
          Our app is designed to be easy to use and accessible from any
          device.You can view upcoming and live auctions. You can place bids on
          auctions in real-time and track the status of your bids. You can also
          view and manage a list of your won auctions and see the auctions that
          you have initiated.
        </Typography>
        <Typography mb={3} variant='body1'>
          In addition to our auctions, we also offer a variety of resources and
          tools for buyers and sellers. Our blog features articles on a range of
          topics, including collecting, appraisal, and buying and selling
          strategies. We also offer a seller's guide with tips on how to list
          and promote your items on our platform.
        </Typography>
        <Typography mb={3} variant='body1'>
          Thank you for choosing our app for your auction and bidding needs. We
          hope you have a great experience with us and find some amazing items
          to bid on!
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
