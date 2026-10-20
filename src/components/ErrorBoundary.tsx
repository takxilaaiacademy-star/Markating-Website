import { Component, type ReactNode } from 'react';
import { Box, Button, Typography } from '@mui/material';

interface Props {
  children: ReactNode;
  resetKey?: string;
}
interface State {
  failed: boolean;
  key?: string;
}

/** Shows a friendly retry screen instead of a blank page (for example when a new deploy replaced an old page file). */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false, key: this.props.resetKey };

  static getDerivedStateFromError(): Partial<State> {
    return { failed: true };
  }

  static getDerivedStateFromProps(p: Props, s: State): Partial<State> | null {
    return p.resetKey !== s.key ? { failed: false, key: p.resetKey } : null;
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <Box role="alert" sx={{ textAlign: 'center', py: 10, px: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
          This page could not load
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Please check your internet connection and try again.
        </Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Reload page
        </Button>
      </Box>
    );
  }
}
