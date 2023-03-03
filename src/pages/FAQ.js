import { Box, Fab, Fade, Grid, Stack, Typography, useScrollTrigger, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/Page';
import ScrollTop from 'components/ScrollTop';

// assets
import { UpSquareFilled } from '@ant-design/icons';

let faqsForGuests = [
  {
    question: 'What is Rent My VR?',
    answer:
      'Rent My VR is an company operating out of Arizona, founded by long time veterans of the real estate and vacation rental industry. Since formation, we have helped connect our users/guests to houses, condos, cottages, cabins and vacation rental properties in the US. Rent My VR’s Property Directory listings are provided by either export partnerships, listed by the host, or referred to us. At this time, we do not facilitate any bookings on our website. We instead refer the guest directly to the host or to the platform of their choice to book their stay and complete the transaction. Our aim is to provide a one stop shop place to compare rates, direct booking options, and reviews for each property. '
  },
  {
    question: 'What if I need to Change or Cancel My Reservation?',
    answer:
      'Please refer back to the website you used to make the booking. We provide the link to the websites available for each property, in one easy to search directory, however, we do not facilitate the booking, nor do we have access to any of the booking information.'
  },
  {
    question: 'Does Rent My VR charge fees to book a stay at a property?',
    answer:
      'Rent My VR does not charge a fee to the guest. Our aim is to make searching properties and choosing an OTA vs direct booking easier. We seek to allow the guest to make an educated decision by comparing rates and reviews on different platforms. We see the listing on our site as a marketing expense to the host, and want to create an easy search and book experience for the end user. '
  },
  {
    question: 'What is Rent My VR’s Cancellation policy?',
    answer:
      'Rent My VR is not involved in the booking of a reservation and does not institute a cancellation policy; please refer to the site you used to book your stay. For cancellation of a property or management company directory listing, you are able to login and deactivate a property at any time. We do not offer a refund for early deactivation of listings. '
  },
  {
    question: 'Do you do guest screening? ',
    answer:
      'We do not. We only seek to connect guests and travelers with the sites they prefer to use to book their stay. Hosts are responsible for doing their own guest checks and screening. '
  },
  {
    question: 'Is Listing Data on Your Site Up to Date and Reliable? ',
    answer:
      'Property listings on our site either consist of limited data on a standard listing or detailed data on a premium listing. These listings include photos and the amenities offered with the property. We receive this data from our partners, directly from the hosts, or from our referral sources. We aim to display accurate property information, however, Rent My VR is not liable for the accuracy of information posted in a listing. Please verify and contact the property owner or manager/ host directly through the site you intend to use for booking. In the event that you suspect a listing is not a legitimate property listing, please report it immediately. Rent My VR takes potential scams very seriously, and will review and deactivate properties until ownership and legitimacy is documented and confirmed. '
  }
];

let faqsForHosts = [
  {
    question: 'Is Listing Data on Your Site Up to Date and Reliable? ',
    answer:
      'Property listings on our site either consist of limited data on a standard listing or detailed data on a premium listing. These listings include photos and the amenities offered with the property. We receive this data from our partners, directly from the hosts, or from our referral sources. We aim to display accurate property information, however, Rent My VR is not liable for the accuracy of information posted in a listing. Please verify and contact the property owner or manager/ host directly through the site you intend to use for booking. In the event that you suspect a listing is not a legitimate property listing, please report it immediately. Rent My VR takes potential scams very seriously, and will review and deactivate properties until ownership and legitimacy is documented and confirmed. '
  },
  {
    question: ' What is Rent My VR?',
    answer:
      'Rent My VR is an company operating out of Arizona, founded by long time veterans of the real estate and vacation rental industry. Since formation, we have helped connect our users/guests to houses, condos, cottages, cabins and vacation rental properties in the US. Rent My VR’s Property Directory listings are provided by either export partnerships, listed by the host, or referred to us. At this time, we do not facilitate any bookings on our website. We instead refer the guest directly to the host or to the platform of their choice to book their stay and complete the transaction. Our aim is to provide a one stop shop place to compare rates, direct booking options, and reviews for each property. '
  },

  {
    question: 'Who Can List Their Property?',
    answer:  'Owners, co-hosts, and management companies are all able to list on our site. We do NOT verify any licensing requirements or restrictions by state to constitute a “management company,” so when viewing a management directory listing, please consider any legal requirements that may be necessary when screening a company to potentially manage your property. '
  },

  {
    question:'Where Does My Property Need To Be Located?',
    answer:   'Rent My VR knew one thing when planning our launch and growth strategy - you can’t do everything well, but you can do some things exceptionally. In an effort to provide exceptional customer service and support, we had to come up with a growth strategy that is calculated, paced, and intentional. For this reason, we are currently only located in the United States. We know there is a large demand for an international market. Be on the lookout for expansion outside of the US with a target for full global coverage by 2026. '
  },
  {
    question:'Why doesn’t Rent My VR offer payment processing for bookings?',
    answer:  'We are a directory of listings, but we want the owner/manager to use the payment option of their choice. We know hosts already have this part of the process in place, and we seek to drive potential guests to view their property, but then allow the guest to book through their preferred platform. We are not involved with the payment or booking process. '
  },

  {
    question:'Do you do guest screening?',
    answer:  'We do not. We only seek to connect guests and travelers with the sites they prefer to use to book their stay. Hosts are responsible for doing their own guest checks and screening.'
  },

  {
    question:'How are you building traffic and SEO for Rent My VR? ',
    answer:  'Where should we start? We have taken a multifaceted approach to SEO, as we know this site is only worth the response and traffic it gets from the end user. Our approach includes traditional SEO, Ads, social media promotion, organic traffic through additional partners and sites and backend SEO to the maximum reach.'
  },

  {
    question:'Will I see the email and phone number for my inquiries?',
    answer:  'You can see the emails or phone numbers as these are required input fields on an inquiry form. We keep your email confidential until you have replied to your guest from your email client. In this way, we are able to cut down on the potential spam from someone scraping our site. However, once you have determined a message has come from a legitimate guest, you are able to contact them through your preferred method.'
  },

  {
    question:'Is there a cost to be listed on Rent My VR?',
    answer:  'We offer a free account that includes the ability to upload free standard listings. Premium membership listings will have additional functionality and added visibility. These listings do have a cost, and you can choose a monthly or annual subscription. '
  },

  {
    question:'What is Rent My VR’s Cancellation policy?',
    answer:  'Rent My VR is not involved in the booking of a reservation and does not institute a cancellation policy; please refer to the site you used to book your stay. For cancellation of a property or management company directory listing, you are able to login and deactivate a property at any time. We do not offer a refund for early deactivation of listings.'
  },

  {
    question:'How many images can I upload to a listing? ',
    answer:  'Standard listings only allow for a single photo upload. These listings are free, and the guest is able to easily click to their preferred website link to view the additional listing photos. Premium listings offer up to 99 photos as an added benefit. '
  },

  {
    question:'Do I Really Need Photos?',
    answer: 'Yes! Listings are sorted by photos. In fact, we won’t approve your listing unless you have at least 1 photo! Standard listings appear below the section for premium listings, so we highly encourage upgrading your listing to allow for more photos. Properties with more photos will appear above properties with less photos. In addition, photos will help with the percentage of people who actually choose to book! The more photos, the better.'
  },

  {
    question:'How did my listing end up on your site?',
    answer:  'We have listed your property either at your request or through a partnership with an OTA or channel manager. You may have also been referred to us through our network for a comp listing. Opting out is easy. Should you decide you do not want the increased traffic and bookings from Rent My VR, you were provided login access upon your listing going live. You are able to login to deactivate or you can Contact Us, and we can deactivate for you. We hope this never happens, but we understand sometimes things come up, and properties are sold or converted to long term rentals. Our solutions team is standing by to assist you with these edits and changes.'
  },

  {
    question:'Is Listing Data on Your Site Up to Date and Reliable? ',
    answer:  'Property listings on our site either consist of limited data on a standard listing or detailed data on a premium listing. These listings include photos and the amenities offered with the property. We receive this data from our partners, directly from the hosts, or from our referral sources. We aim to display accurate property information, however, Rent My VR is not liable for the accuracy of information posted in a listing. Please verify and contact the property owner or manager/ host directly through the site you intend to use for booking. In the event that you suspect a listing is not a legitimate property listing, please report it immediately. Rent My VR takes potential scams very seriously, and will review and deactivate properties until ownership and legitimacy is documented and confirmed. '
  },

  {
    question:'What Size Do My Photos Need To Be?',
    answer:  'Minimum width: 720 px, Minimum height: 480 px'
  },

  {
    question:'Should I continue to list with VRBO, AirBNB, etc?',
    answer:  'We complement your marketing efforts on other sites. We hope to bring you enough value and transparency with analytics that you are soon able to make a determination of where your best spent dollars are going. With Rent My VR, you can compare and contrast as one more way to track which sites guests are likely to click on making it easy to identify if you are losing traffic due to an OTAs policies. In a perfect world, one solution would work for all of your booking needs, but we know there are several powerful platforms that we seek to partner with, rather than compete with.'
  },

  {
    question:'Why would I list my management company on Rent My VR? ',
    answer:  'Looking to book more bookings and drive more traffic to your properties? Looking to acquire more properties to manage? With Rent My VR, you can do both through our Management Directory Listings. We are quickly growing to become the largest online directory of management companies for short term/ vacation rental properties. Get started at the sign up tab, create a login, and immediately add and edit your company s listing. '
  },

  {
    question:'Do you have any special pricing or promotions?',
    answer: 'As a new company, we have been running founder’s promotions to ensure our site offers maximum inventory for potential guests. Our promotions are changing as quickly as our team is building and adding features, and we will often run beta test promotions for our users. Feel free to reach out to our support team here to inquire about any current promotions.'
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
      <Grid container spacing={2} mt={6} justifyContent="center" alignItems="center" bgcolor={'#dee8fa'}>
        <Stack spacing={0} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <img style={{ width: '100%' }} src="/assets/images/Frequently Asked Questions.png" alt="" />
          </Grid>
          <Grid item sm={12} md={8} mb={5}>
            <Typography variant="h2" mb={2} mt={2}>
              FAQs for Guests
            </Typography>
            {faqsForGuests.map((faq, i) => (
              <Accordion key={i} sx={{ background: '#dee8fa!important' }}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ background: 'repeating-linear-gradient(150deg, rgb(142 168 191 / 88%), transparent 868px)', borderRadius: '5px' }}
                >
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ background: 'rgba(0,0,0, .1)' }}>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
            <Typography variant="h2" mb={2} mt={3}>
              FAQs for Hosts
            </Typography>
            {faqsForHosts.map((faq, i) => (
              <Accordion key={i} sx={{ background: '#dee8fa!important' }}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ background: 'repeating-linear-gradient(150deg, rgb(142 168 191 / 88%), transparent 868px)', borderRadius: '5px' }}>
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ background: 'rgba(0,0,0, .1)' }}>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Stack>
      </Grid>

      <ScrollTop>
        <Fade in={trigger} color="primary">
          <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
            <Fab size="medium" aria-label="scroll back to top">
              <UpSquareFilled sx={{ fontSize: 40 }} />
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
