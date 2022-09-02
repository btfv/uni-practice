import { Box, Container, CssBaseline, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ServiceManager } from '../service';
import { Coin } from '../service/types';
import CoinList from './components/coinList';
import ComparedCurrencyLogic from './components/fiatDialog';
import HistoryContainer from './components/historyContainer';

function App() {
  const [pickedCurrency, setPickedCurrency] = useState<Coin>();

  const [comparedCurrency, setComparedCurrency] = useState<string>();
  const [comparedCurrencies, setComparedCurrencies] = useState<string[]>([]);

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
          comparedCurrency={comparedCurrency}
          comparedCurrencies={comparedCurrencies}
          updateComparedCurrency={(id: string) => setComparedCurrency(id)}
        />
      )}
      <Container component='main' sx={{ mt: 2, mb: 2 }} maxWidth='md'>
        <Typography variant='h3' component='h2' gutterBottom align='center'>
          Cryptocurrencies
        </Typography>
      </Container>

      {
        <HistoryContainer
          currency={pickedCurrency}
          comparedFiatCurrency={comparedCurrency}
        />
      }
      {comparedCurrency && (
        <CoinList
          comparedFiatCurrency={comparedCurrency}
          onCoinClick={(coin) => setPickedCurrency(coin)}
        />
      )}
    </Box>
  );
}

export default App;
