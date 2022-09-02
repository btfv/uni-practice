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
import { ServiceManager } from '../../../service';
import { Coin } from '../../../service/types';
import { formatAmount, formatFiatTicker } from '../../../utils/formatter';
import CoinInfo from '../coin';

interface Props {
  comparedFiatCurrency: string;
  onCoinClick: (input: Coin) => void;
}

function CoinList({ comparedFiatCurrency, onCoinClick }: Props) {
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
              <TableCell>Name</TableCell>
              <TableCell align='right'>Current price</TableCell>
              <TableCell align='right'>Market cap</TableCell>
              <TableCell align='right'>Total volume</TableCell>
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
                  <CoinInfo coin={row} onCoinClick={onCoinClick} />
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
