import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import CoinHistory from '../history';

import { Coin } from '../../../service/types';
import Loader from '../loader';

interface Props {
  currency?: Coin;
  comparedFiatCurrency?: string;
}

function HistoryContainer({ currency, comparedFiatCurrency }: Props) {
  return (
    <Container style={{ height: 450 }} sx={{ mt: 2, mb: 2 }}>
      {currency && comparedFiatCurrency ? (
        <CoinHistory
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
