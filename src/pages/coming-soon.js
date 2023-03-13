// material-ui
import { Box, Button, Fab, Fade, Grid, Link, Stack, Typography, useScrollTrigger } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/Page';
import ScrollTop from 'components/ScrollTop';
import NextLink from 'next/link';

// assets
import { UpOutlined } from '@ant-design/icons';

let contents = [
  {
    title: 'Ad Space - ',
    content:
      'We know there are so many partners in the industry that would love the opportunity to advertise on our site. We hear you, and this is coming soon.'
  },
  {
    title: 'Mobile App -',
    content:
      "It's 2023, and we know most people use their phone to do just about anything! We are excited to be launching our mobile app soon. One of the key pieces that you have also asked for is texting through the app; it's coming!"
  },
  {
    title: 'Chat -',
    content:
      'through the platform. We know you want to track your communications in one easy place. We intend to allow chat on the site for potential guests to communicate with you directly. Once we have this and the texting, you will be able to see all communication history via the contact button, texting through the app and chat all in one convenient Inbox. Managing leads and guest inquiries has never been easier.'
  },
  {
    title: "What is Rent My VR's Cancellation policy?",
    content:
      'Rent My VR is not involved in the booking of a reservation and does not institute a cancellation policy; please refer to the site you used to book your stay. For cancellation of a property or management company directory listing, you are able to login and deactivate a property at any time. We do not offer a refund for early deactivation of listings. '
  },
  {
    title: 'Favorite a Listing -',
    content:
      'We know guests like to dream and plan early. We also know its nice to be able to compare listings and come back to them later. Want to favorite a listing and save it? With our new Fav feature, you will be able to do this and even rank and share your favorite listings with the other people in your party.'
  },
  {
    title: 'RentMyVR Calendar -',
    content:
      'Okay, so many of you have a software to facilitate your calendar. But, if you are just getting started or only have a single property, some of those systems are overkill. Rent My VR has a calendar feature in the works to help you keep your bookings organized.'
  },
  {
    title: 'Websites -',
    content:
      'Ever wanted to have your own independent booking site, but didn&rsquo;t want to take the time to build one? We are working on 14 very easy to use templated sites. We know not everyone has the desire to design a clean and user friendly site. We have that part covered. All you do is select the site design and upload your descriptions and photos. We make it easy for you to create professional independent booking sites.'
  },
  {
    title: 'Directory Performance -',
    content:
      'Compare which links get more clicks and how many impressions you are getting from listing on Rent My VR. We want transparency so that you always know that listing on Rent My VR is driving more guests and traffic your way. You are also able to watch when making changes to a listing to see if updating the listing results in more hits to your listing. We know analytics matter, and we want to give you the numbers you need to be successful.'
  },
  {
    title: 'Integrations - ',
    content:
      "We know you need simple. We know your time is money. We are working fast and furious to identify and chart out the providers you care the most about. It takes time to develop strong partners, but as we continue to grow, we have identified the need to play well with your software of choice. We don't have the option to choose who we can integrate with in all cases, but for any software offering an open API, we are working on an integration. We have also begun to form new and lasting relationships with some key software providers that don't already have an API, but are willing to partner with our development team. Stay tuned for some big announcements."
  },
  {
    title: 'Superhost Badges - ',
    content:
      'We know you worked hard, and you should be able to display your badge with pride. In addition to some exclusive Rent My VR badges, you will also have the option to display additional earned 3rd party booking site badges.'
  },
  {
    title: 'Luxury Listing Features -',
    content:
      'We know luxury listings have their own unique features and deserve their own category. We are looking to improve and expand our premium listing page to include more of the details that would accompany a luxury listing. Check out these examples, and feel free to contact us if we missed any! (Childcare, Cook, Chef, Waitstaff, Butler, Driver, Bartender, Security guard, Nanny, Masseuse, Villa manager, Restaurant concierge, Spa services, Equipment rental, Housekeeping, Airport transfer, Car rental, Fresh groceries, Laundry services, Personal Shopper, and More)'
  },
  {
    title: 'International Expansion -',
    content:
      "Rent My VR knew one thing when planning our launch and growth strategy - you can't do everything well, but you can do some things exceptionally. In an effort to provide exceptional customer service and support, we had to come up with a growth strategy that is calculated, paced, and intentional. We know there is a large demand for an international market. Be on the lookout for expansion outside of the US with a target for full global coverage by 2026."
  },
  {
    title: 'Have a feature request or idea?',
    content:
      'We want to hear more! We welcome all comments and suggestions. We want to make the site better, and it is our users who drive our development. If you have suggestions please do not hesitate to share. Submit your ideas, dreams, and Rent My VR wishlist to us by clicking here. (Contact us button that will send an email to us)'
  }
];

const Index = () => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 800 });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#__next');
    if (anchor) {
      anchor.scrollIntoView({ inline: 'center', behavior: 'smooth' });
    }
  };

  return (
    <Page title="Rent MyVR Home">
      <Grid container spacing={2} ml={0} justifyContent="center" alignItems="center">
        <Stack spacing={0} justifyContent="center" alignItems="center" style={{ marginTop: '80px' }}>
          <Grid item xs={12} style={{ width: '100%' }}>
            <img style={{ width: '100%' }} src="/assets/images/Coming Soon Image.png" alt="" />
          </Grid>
          <Grid item sm={10} md={8} xs={10} mb={5}>
            <Typography variant="h2" mb={2} mt={2} textAlign={'center'}>
              We&rsquo;re still building!!
            </Typography>
            <Typography mb={2} mt={2}>
              We have been happy to launch our initial phase of Rent My VR, however, we know there is still so much work to be done to bring
              you the most benefits from our online directory. Take a look at what we have on our COMING SOON road map!
            </Typography>
            {contents.map((content, i) => (
              <Grid item key={i} sm={12} md={12} mb={2}>
                <Typography display="inline" variant="h5">
                  {content.title} &nbsp;
                </Typography>
                <Typography display="inline">{content.content}</Typography>
              </Grid>
            ))}
          </Grid>
          <Grid item sm={10} md={8} xs={10} mb={5}>
            <NextLink href="mailto:info@rentmyvr.com" passHref>
              <Link className="header-link" color="black" underline="none">
                <Button size="large" variant="contained" color="primary">
                  Contact Us
                </Button>
              </Link>
            </NextLink>
          </Grid>
        </Stack>
      </Grid>

      <ScrollTop>
        <Fade in={trigger} color="primary">
          <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
            <Fab size="medium" aria-label="scroll back to top">
              <UpOutlined sx={{ fontSize: 40 }} />
            </Fab>
          </Box>
        </Fade>
      </ScrollTop>
    </Page>
  );
};

Index.getLayout = function getLayout(page) {
  return <Layout variant="simple">{page}</Layout>;
};

export default Index;
