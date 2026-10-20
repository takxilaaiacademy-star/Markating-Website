import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FAQ } from '../data/content';
import { faqStyles as S } from './styles';

export default function Faq() {
  return FAQ.map(([q, a]) => (
    <Accordion key={q} disableGutters sx={S.item}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={S.summary}>
        <Typography sx={S.q}>{q}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={S.details}>
        <Typography color="text.secondary">{a}</Typography>
      </AccordionDetails>
    </Accordion>
  ));
}
