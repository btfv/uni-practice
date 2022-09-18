import { Box, Container, CssBaseline, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ServiceManager } from '../services/crypto';
import { Coin } from '../services/crypto/types';
import { DEFAULT_LANGUAGE, Translator } from '../services/translator';
import { SupportedLanguage } from '../services/translator/types';
import CoinList from './components/coinList';
import ComparedCurrencyLogic from './components/fiatDialog';
import HistoryContainer from './components/historyContainer';
import LanguageLogic from './components/languagePicker';

function App() {
  const [pickedCurrency, setPickedCurrency] = useState<Coin>();

  const [comparedCurrency, setComparedCurrency] = useState<string>();
  const [comparedCurrencies, setComparedCurrencies] = useState<string[]>([]);

  const [language, setLanguage] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);

  useEffect(function updateFiatCurrencies() {
    const fetchCurrencies = async () => {
      const service = await ServiceManager.getCurrentService();

      const fiatList = await service.getFiatList();

      setComparedCurrencies(fiatList.map(({ id }) => id));

      setComparedCurrency(fiatList[0].id);
    };

    fetchCurrencies();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      {comparedCurrency && (
        <ComparedCurrencyLogic
          language={language}
          comparedCurrency={comparedCurrency}
          comparedCurrencies={comparedCurrencies}
          updateComparedCurrency={(id: string) => setComparedCurrency(id)}
        />
      )}
      {
        <LanguageLogic
          language={language}
          updateLanguage={(lang) => setLanguage(lang)}
        />
      }
      <Container component='main' sx={{ mt: 2, mb: 2 }} maxWidth='md'>
        <Typography variant='h3' component='h2' gutterBottom align='center'>
          {Translator.getTranslation('cryptocurrencies', language, {
            capitalizeFirstLetter: true,
          })}
        </Typography>
      </Container>

      {
        <HistoryContainer
          language={language}
          currency={pickedCurrency}
          comparedFiatCurrency={comparedCurrency}
        />
      }
      {comparedCurrency && (
        <CoinList
          language={language}
          comparedFiatCurrency={comparedCurrency}
          onCoinClick={(coin) => setPickedCurrency(coin)}
        />
      )}
    </Box>
  );
}

export default App;
