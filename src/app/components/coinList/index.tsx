import PropTypes from 'prop-types';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ServiceManager } from '../../../service/crypto';
import { Coin } from '../../../service/crypto/types';
import { formatAmount, formatFiatTicker } from '../../../utils/formatter';
import CoinInfo from '../coin';
import { SupportedLanguage } from '../../../service/translator/types';
import { Translator } from '../../../service/translator';

interface Props {
  language: SupportedLanguage;
  comparedFiatCurrency: string;
  onCoinClick: (input: Coin) => void;
}

function CoinList({ comparedFiatCurrency, onCoinClick, language }: Props) {
  const [rows, setRows] = useState<Coin[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(
    function updateCoins() {
      const fetchRows = async () => {
        const service = await ServiceManager.getCurrentService();

        const rows = await service.getCoinList({
          fiatCurrencyId: comparedFiatCurrency,
          page: page + 1,
          limit: rowsPerPage,
        });

        setRows(rows);
      };

      fetchRows();
    },
    [page, rowsPerPage, comparedFiatCurrency]
  );

  return (
    <Container>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>
                {Translator.getTranslation('name', language, {
                  capitalizeFirstLetter: true,
                })}
              </TableCell>
              <TableCell align='right'>
                {Translator.getTranslation('currentPrice', language, {
                  capitalizeFirstLetter: true,
                })}
              </TableCell>
              <TableCell align='right'>
                {Translator.getTranslation('marketCap', language, {
                  capitalizeFirstLetter: true,
                })}
              </TableCell>
              <TableCell align='right'>
                {Translator.getTranslation('totalVolume', language, {
                  capitalizeFirstLetter: true,
                })}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.ticker}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                hover={true}
              >
                <TableCell component='th' scope='row'>
                  <CoinInfo
                    coin={row}
                    onCoinClick={onCoinClick}
                    language={language}
                  />
                </TableCell>
                <TableCell align='right'>
                  {formatAmount(row.currentPrice)}{' '}
                  {formatFiatTicker(comparedFiatCurrency)}
                </TableCell>
                <TableCell align='right'>
                  {formatAmount(row.marketCap)}{' '}
                  {formatFiatTicker(comparedFiatCurrency)}
                </TableCell>
                <TableCell align='right'>
                  {formatAmount(row.totalVolume)}{' '}
                  {formatFiatTicker(comparedFiatCurrency)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={-1}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage={Translator.getTranslation('rowsPerPage', language, {
          capitalizeFirstLetter: true,
        })}
        labelDisplayedRows={({ page }) =>
          `${Translator.getTranslation('page', language, {
            capitalizeFirstLetter: true,
          })} ${page + 1}`
        }
        page={page}
        onPageChange={(event: unknown, newPage: number) => {
          setPage(newPage);
        }}
        onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </Container>
  );
}

CoinList.propTypes = {
  comparedFiatCurrency: PropTypes.string,
  onCoinClick: PropTypes.func,
};

export default CoinList;
