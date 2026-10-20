import { Suspense } from 'react';
import { Box, Button, CircularProgress, Drawer, IconButton, Link, List, ListItemButton, ListItemText, Menu, MenuItem, Stack, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import { whatsappLink } from '../config/site';
import { LANGS } from '../data/languages';
import { loginUrl } from '../utils/links';
import Background from './Background';
import ErrorBoundary from './ErrorBoundary';
import Footer from './Footer';
import Logo from './Logo';
import { PreviewProvider } from './Preview';
import { NAV_LINKS, useHeader, useLayoutEffects, useOfferBar, useStickyCta } from './types';
import { shellStyles as S } from './styles';

function OfferBar() {
  const { open, close, offer, href } = useOfferBar();
  if (!open) return null;
  return (
    <Box sx={S.offer} role="region" aria-label="Special offer" data-testid="offer-bar">
      <LocalOfferIcon fontSize="small" sx={S.offerIcon} />
      <Typography sx={S.offerText}>{offer.text}</Typography>
      <Link href={href} rel="noopener" sx={S.offerLink} data-testid="offer-link">
        {offer.cta}
      </Link>
      <IconButton size="small" onClick={close} aria-label="Hide offer" sx={S.offerClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

function Header() {
  const h = useHeader();
  return (
    <Box component="header" sx={S.header(h.scrolled)}>
      <Box sx={S.bar}>
        <Box component={RouterLink} to="/" aria-label="Takxila AI Academy home" sx={S.logo}>
          <Logo size={38} />
        </Box>
        <Stack component="nav" direction="row" spacing={0.5} sx={S.links} aria-label="Main">
          {NAV_LINKS.map(([l, to]) => (
            <Button key={to} component={RouterLink} to={to} color="inherit" sx={S.link(h.active(to))}>
              {l}
            </Button>
          ))}
        </Stack>
        <Box sx={S.spacer} />
        <IconButton onClick={(e) => h.setLangEl(e.currentTarget)} aria-label="Change language" sx={S.iconBtn}>
          <TranslateIcon />
        </IconButton>
        <Menu anchorEl={h.langEl} open={!!h.langEl} onClose={() => h.setLangEl(null)} className="notranslate">
          {LANGS.map(([code, label]) => (
            <MenuItem key={code} selected={code === h.lang} onClick={() => h.pickLang(code)}>
              {label}
            </MenuItem>
          ))}
        </Menu>
        <IconButton onClick={h.toggleMode} aria-label={h.mode === 'dark' ? 'Light theme' : 'Dark theme'} sx={S.iconBtn}>
          {h.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Button color="inherit" component="a" href={loginUrl()} rel="noopener" sx={S.login} data-testid="login-link">
          Log in
        </Button>
        <Button variant="contained" component="a" href={h.registerHref} rel="noopener" sx={S.cta} data-testid="register-link">
          Start free
        </Button>
        <IconButton onClick={() => h.setDrawer(true)} sx={S.menu} aria-label="Open menu">
          <MenuIcon />
        </IconButton>
      </Box>
      <Drawer anchor="right" open={h.drawer} onClose={() => h.setDrawer(false)} PaperProps={{ sx: S.drawer }}>
        <Logo size={36} />
        <List sx={S.drawerList}>
          {NAV_LINKS.map(([l, to]) => (
            <ListItemButton key={to} component={RouterLink} to={to} selected={h.active(to)}>
              <ListItemText primary={l} primaryTypographyProps={S.drawerText} />
            </ListItemButton>
          ))}
          <ListItemButton component="a" href={loginUrl()} rel="noopener">
            <ListItemText primary="Log in" primaryTypographyProps={S.drawerText} />
          </ListItemButton>
          <ListItemButton onClick={h.toggleMode}>
            <ListItemText primary={h.mode === 'dark' ? 'Light theme' : 'Dark theme'} primaryTypographyProps={S.drawerText} />
          </ListItemButton>
        </List>
        <Button variant="contained" size="large" component="a" href={h.registerHref} rel="noopener">
          Start learning free
        </Button>
      </Drawer>
    </Box>
  );
}

function StickyCta() {
  const s = useStickyCta();
  if (s.hidden) return null;
  return (
    <Box sx={S.sticky} data-testid="sticky-cta">
      <Button variant="contained" size="large" component="a" href={s.href} rel="noopener" sx={S.stickyMain}>
        {s.label}
      </Button>
      <Button variant="outlined" component={RouterLink} to="/ai-course-finder" sx={S.stickyAlt}>
        Find my course
      </Button>
    </Box>
  );
}

const skipLink = {
  position: 'fixed', top: 8, left: 8, zIndex: 2000, px: 2, py: 1, borderRadius: '10px', bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 700,
  transform: 'translateY(-200%)', '&:focus': { transform: 'none' },
} as const;

export default function Layout() {
  useLayoutEffects();
  const { pathname } = useLocation();
  return (
    <PreviewProvider>
      <Box sx={S.shell}>
        <Box component="a" href="#main" sx={skipLink}>
          Skip to main content
        </Box>
        <Background />
        <OfferBar />
        <Header />
        <Box component="main" id="main" tabIndex={-1} sx={S.main}>
          <ErrorBoundary resetKey={pathname}>
          <Suspense
            fallback={
              <Box sx={S.loader} role="status" aria-label="Loading">
                <CircularProgress color="secondary" />
              </Box>
            }
          >
            <Outlet />
          </Suspense>
          </ErrorBoundary>
        </Box>
        <Footer />
        <IconButton
          component="a"
          href={whatsappLink('Hi Takxila, I would like to know more about your AI courses.')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          sx={S.whatsapp}
          data-testid="whatsapp"
        >
          <WhatsAppIcon />
        </IconButton>
        <StickyCta />
      </Box>
    </PreviewProvider>
  );
}
