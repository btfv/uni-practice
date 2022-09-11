import { Button, ButtonGroup } from '@mui/material';
import { Container } from '@mui/system';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  ComposedChart,
} from 'recharts';
import { ServiceManager } from '../../../service/crypto';
import { Coin } from '../../../service/crypto/types';
import { Translator } from '../../../service/translator';
import {
  SupportedLanguage,
  SupportedTag,
} from '../../../service/translator/types';
import Loader from '../loader';
import { DAYS, MIN_LOADING_TIME } from './constants';
import { HistoryItem, HistoryProperties } from './types';

const formatter = Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 4,
});

interface Props {
  currency: Coin;
  comparedFiatCurrency: string;
  language: SupportedLanguage;
}

const keyToTitle: Record<HistoryProperties, SupportedTag> = {
  volume: 'totalVolume',
  price: 'price',
  marketCap: 'marketCap',
};

function CoinHistory({ currency, comparedFiatCurrency, language }: Props) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [days, setDays] = useState<number>(DAYS[1]);

  const [loading, setLoading] = useState<boolean>(true);

  const [historyProperty, setHistoryProperty] =
    useState<HistoryProperties>('price');

  useEffect(
    function updateHistory() {
      const fetchHistory = async () => {
        if (!currency || !comparedFiatCurrency) {
          return;
        }

        const service = await ServiceManager.getCurrentService();

        const { prices, volumes, marketCaps } = await service.getHistoricalData(
          {
            cryptoCurrencyId: currency.id,
            fiatCurrencyId: comparedFiatCurrency,
            range: { days: days },
          }
        );

        const history: HistoryItem[] = [];

        for (let i = 0; i < prices.length; i++) {
          history.push({
            timestamp: prices[i].timestamp,
            value: {
              price: prices[i].value,
              volume: volumes[i].value,
              marketCap: marketCaps[i].value,
            },
          });
        }

        setHistory(history);

        setTimeout(() => setLoading(false), MIN_LOADING_TIME);
      };

      setLoading(true);
      fetchHistory();
    },
    [currency, comparedFiatCurrency, days]
  );

  return (
    <Container style={{ height: 400 }}>
      {!loading && history.length ? (
        <>
          <ResponsiveContainer width={'100%'} height={400}>
            <ComposedChart
              data={history.map((item) => ({
                ...item.value,
                timestamp: new Date(item.timestamp).toLocaleString(),
              }))}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis type='category' dataKey='timestamp' />
              <YAxis
                type='number'
                dataKey={historyProperty}
                domain={['dataMin', 'dataMax']}
                scale={'linear'}
                tickFormatter={(val) => formatter.format(val)}
              />

              <Tooltip />

              <Line
                type='monotone'
                dataKey={historyProperty}
                stroke='#8884d8'
                activeDot={{ r: 8 }}
                name={Translator.getTranslation(
                  keyToTitle[historyProperty],
                  language,
                  { capitalizeFirstLetter: true }
                )}
              />
            </ComposedChart>
          </ResponsiveContainer>
          <Container>
            <ButtonGroup
              variant='outlined'
              aria-label='outlined primary button group'
              style={{ float: 'left' }}
            >
              {DAYS.map((day) => (
                <Button onClick={() => setDays(day)} focusRipple={true}>
                  {day}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup
              variant='outlined'
              aria-label='outlined primary button group'
              style={{ float: 'right' }}
            >
              {Object.entries(keyToTitle).map(([key, title]) => (
                <Button
                  focusRipple={true}
                  onClick={() => setHistoryProperty(key as HistoryProperties)}
                >
                  {Translator.getTranslation(title, language, {
                    uppercase: true,
                  })}
                </Button>
              ))}
            </ButtonGroup>
          </Container>
        </>
      ) : (
        <Loader img={currency.icon} />
      )}
    </Container>
  );
}

CoinHistory.propTypes = {
  values: PropTypes.array,
};

export default CoinHistory;
