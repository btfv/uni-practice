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
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { DEFAULT_LANGUAGE, Translator } from '../../../service/translator';
import {
  LanguageInfo,
  SupportedLanguage,
} from '../../../service/translator/types';

interface Props {
  language?: SupportedLanguage;
  updateLanguage: (tag: SupportedLanguage) => void;
}

function LanguageLogic({ language = DEFAULT_LANGUAGE, updateLanguage }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [languages, setLanguages] = useState<LanguageInfo[]>();

  const [currentLanguageInfo, setCurrentLanguageInfo] =
    useState<LanguageInfo>();

  useEffect(function updateLanguages() {
    const update = async () => {
      setLanguages(await Translator.getSupportedLanguages());
    };

    update();
  }, []);

  useEffect(
    function updateCurrentLanguafe() {
      const update = async () => {
        setCurrentLanguageInfo(await Translator.getLanguageInfo(language));
      };

      update();
    },
    [language]
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    updateLanguage(event.target.value as SupportedLanguage);
  };

  return (
    <Container
      style={{
        position: 'fixed',
        padding: 20,
        width: 100,
        right: 80,
        zIndex: 999,
      }}
    >
      <Button variant='contained' fullWidth onClick={() => setOpen(true)}>
        {currentLanguageInfo ? (
          <img src={currentLanguageInfo.imgUrl} height={25} />
        ) : (
          '...'
        )}
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>
          {Translator.getTranslation('chooseLanguage', language, {
            capitalizeFirstLetter: true,
          })}
        </DialogTitle>
        <DialogContent>
          {languages && (
            <Box component='form'>
              <FormControl sx={{ m: 1 }} style={{ width: 120 }}>
                <InputLabel htmlFor='dialog-select-label'>
                  {Translator.getTranslation('language', language, {
                    capitalizeFirstLetter: true,
                  })}
                </InputLabel>
                <Select
                  value={language}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      label={Translator.getTranslation('language', language, {
                        capitalizeFirstLetter: true,
                      })}
                      id='dialog-select-label'
                    />
                  }
                >
                  {languages.map(({ tag, imgUrl, name }) => (
                    <MenuItem value={tag}>
                      <img src={imgUrl} width={25} style={{ marginRight: 5 }} />
                      {name.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default LanguageLogic;
