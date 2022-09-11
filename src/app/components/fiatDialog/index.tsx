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
import { SupportedLanguage } from '../../../service/translator/types';
import { Translator } from '../../../service/translator';

interface Props {
  language: SupportedLanguage;
  comparedCurrency: string;
  comparedCurrencies: string[];
  updateComparedCurrency: (id: string) => void;
}

function ComparedCurrencyLogic({
  comparedCurrency,
  comparedCurrencies,
  updateComparedCurrency,
  language,
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
        width: 100,
        right: 0,
        zIndex: 999,
      }}
    >
      <Button variant='contained' fullWidth onClick={() => setOpen(true)}>
        {comparedCurrency}
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>
          {Translator.getTranslation('chooseComparedCurrency', language, {
            capitalizeFirstLetter: true,
          })}
        </DialogTitle>
        <DialogContent>
          <Box component='form'>
            <FormControl sx={{ m: 1 }} style={{ width: 180 }}>
              <InputLabel htmlFor='dialog-select-label'>
                {Translator.getTranslation('fiat', language, {
                  capitalizeFirstLetter: true,
                })}
              </InputLabel>
              <Select
                value={comparedCurrency}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    label={Translator.getTranslation('fiat', language, {
                      capitalizeFirstLetter: true,
                    })}
                    id='dialog-select-label'
                  />
                }
              >
                {comparedCurrencies.map((curr) => (
                  <MenuItem value={curr}>
                    {formatFiatTicker(curr)} {curr.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default ComparedCurrencyLogic;
