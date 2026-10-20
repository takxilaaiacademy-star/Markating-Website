import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/SendRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded';
import { useLeadForm, type LeadField, type LeadFormProps } from './types';
import { leadStyles as S } from './styles';

const LABELS: Record<LeadField, string> = { name: 'Your name', email: 'Email', phone: 'Mobile / WhatsApp number', message: 'Message' };
const TYPES: Record<LeadField, string> = { name: 'text', email: 'email', phone: 'tel', message: 'text' };
const AUTO: Record<LeadField, string> = { name: 'name', email: 'email', phone: 'tel', message: 'off' };

export default function LeadForm(props: LeadFormProps) {
  const f = useLeadForm(props);
  const { fields, required = ['name', 'email'], cta, dense, testId } = props;
  if (f.sent && !dense) {
    return (
      <Stack spacing={1.5} alignItems="flex-start" sx={S.done} role="status" data-testid={testId && testId + '-done'}>
        <CheckCircleIcon color="success" sx={S.doneIcon} />
        <Typography sx={S.doneText}>{props.done}</Typography>
        <Button variant="outlined" onClick={f.again}>
          Send another
        </Button>
      </Stack>
    );
  }
  return (
    <Box component="form" noValidate onSubmit={f.submit} sx={S.form(!!dense)} data-testid={testId}>
      {fields.map((k) => (
        <TextField
          key={k}
          name={k}
          size={dense ? 'small' : 'medium'}
          label={LABELS[k] + (required.includes(k) || k === 'email' ? '' : ' (optional)')}
          type={TYPES[k]}
          autoComplete={AUTO[k]}
          inputMode={k === 'phone' ? 'tel' : undefined}
          value={f.v[k]}
          onChange={f.set(k)}
          error={!!f.errors[k]}
          helperText={f.errors[k]}
          multiline={k === 'message'}
          minRows={k === 'message' ? 4 : undefined}
          fullWidth
          sx={dense ? S.denseField : undefined}
        />
      ))}
      <Box component="label" sx={S.honey} aria-hidden>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={f.v.website} onChange={f.set('website')} />
      </Box>
      <Button type="submit" variant="contained" size={dense ? 'medium' : 'large'} disabled={f.busy} endIcon={dense ? undefined : <SendIcon />} sx={S.submit(!!dense)}>
        {f.busy ? 'Sending…' : cta}
      </Button>
    </Box>
  );
}
