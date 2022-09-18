import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import CoinHistory from '../history';

import { Coin } from '../../../services/crypto/types';
import Loader from '../loader';
import { SupportedLanguage } from '../../../services/translator/types';

interface Props {
  language: SupportedLanguage;
  currency?: Coin;
  comparedFiatCurrency?: string;
}

function HistoryContainer({ currency, comparedFiatCurrency, language }: Props) {
  return (
    <Container style={{ height: 450 }} sx={{ mt: 2, mb: 2 }}>
      {currency && comparedFiatCurrency ? (
        <CoinHistory
          language={language}
          currency={currency}
          comparedFiatCurrency={comparedFiatCurrency}
        />
      ) : (
        <Loader />
      )}
    </Container>
  );
}

HistoryContainer.propTypes = {
  currency: PropTypes.object,
  comparedFiatCurrency: PropTypes.string,
};

export default HistoryContainer;
