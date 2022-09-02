import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { Container } from '@mui/material';
import { formatFiatTicker } from '../../../utils/formatter';

interface Props {
  comparedCurrency: string;
  comparedCurrencies: string[];
  updateComparedCurrency: (id: string) => void;
}

function ComparedCurrencyLogic({
  comparedCurrency,
  comparedCurrencies,
  updateComparedCurrency,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    updateComparedCurrency(event.target.value);
  };

  return (
    <Container
      style={{
        position: 'fixed',
        padding: 20,
        width: 140,
        right: 0,
      }}
    >
      <Button variant='contained' fullWidth onClick={() => setOpen(true)}>
        {comparedCurrency}
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Choose compared currency</DialogTitle>
        <DialogContent>
          <Box component='form'>
            <FormControl sx={{ m: 1 }} style={{ width: 120 }}>
              <InputLabel htmlFor='dialog-select-label'>Fiat</InputLabel>
              <Select
                value={comparedCurrency}
                onChange={handleChange}
                input={<OutlinedInput label='Fiat' id='dialog-select-label' />}
              >
                {comparedCurrencies.map(curr => 
                  <MenuItem value={curr}>
                    {formatFiatTicker(curr)} {curr.toUpperCase()}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default ComparedCurrencyLogic;
