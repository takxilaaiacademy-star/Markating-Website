import { Box, Container, Divider, Grid, IconButton, Link, Stack, Tooltip, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/PhoneOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link as RouterLink } from 'react-router-dom';
import { MAILTO_HREF, SITE, TEL_HREF, whatsappLink } from '../config/site';
import LeadForm from './LeadForm';
import { FOOTER_COLS, SOCIAL } from './types';
import { footerStyles as S } from './styles';

export default function Footer() {
  return (
    <Box component="footer" sx={S.footer}>
      <Container maxWidth="lg" sx={S.panel}>
        <Grid container spacing={{ xs: 3.5, md: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography sx={S.brand} className="notranslate">
              TAKXILA™
            </Typography>
            <Typography color="text.secondary" sx={S.tagline}>
              Master the AI frameworks.
              <br />
              Own the AI future.
            </Typography>
            <Typography sx={S.newsHead}>Get new courses and offers by email</Typography>
            <LeadForm source="newsletter" fields={['email']} required={['email']} cta="Subscribe" done="Subscribed. Watch your inbox for new courses and offers." dense testId="newsletter" />
          </Grid>
          {FOOTER_COLS.map(([head, links]) => (
            <Grid item xs={6} sm={4} md={head === 'Legal' ? 2.5 : 2.75} key={head}>
              <Typography sx={S.head}>{head}</Typography>
              <Stack spacing={1.1}>
                {links.map(([l, to]) => (
                  <Box key={l}>
                    <Box component={RouterLink} to={to} sx={S.link}>
                      {l}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <Typography sx={S.head}>Talk to us</Typography>
            <Stack spacing={1.1}>
              <Link href={MAILTO_HREF} sx={S.iconLink}>
                <MailOutlineIcon fontSize="small" /> {SITE.supportEmail}
              </Link>
              <Link href={TEL_HREF} sx={S.iconLink}>
                <PhoneIcon fontSize="small" /> {SITE.phoneDisplay}
              </Link>
              <Link href={whatsappLink('Hi Takxila!')} target="_blank" rel="noopener noreferrer" sx={S.iconLink}>
                <WhatsAppIcon fontSize="small" /> WhatsApp us
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Typography sx={S.head}>Follow us</Typography>
            <Stack direction="row" gap={1} flexWrap="wrap">
              {SOCIAL.map(([l, url, Icon]) => (
                <Tooltip key={l} title={l}>
                  <IconButton component="a" href={url} target="_blank" rel="noopener noreferrer" aria-label={l} sx={S.social}>
                    <Icon fontSize="small" />
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={S.divider} />
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} TAKXILA. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
