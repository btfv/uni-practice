import { Avatar, Button, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import PropTypes from 'prop-types';
import { Coin } from '../../../service/types';

interface Props {
  coin: Coin;
  onCoinClick: (coin: Coin) => void;
}

function CoinInfo(props: Props) {
  return (
    <Stack direction='row' spacing={2}>
      <Avatar src={props.coin.icon} />
      <Container style={{ margin: 'auto' }}>
        <Typography variant='body1'>{props.coin.name}</Typography>
      </Container>
      <Button
        onClick={() => props.onCoinClick(props.coin)}
        variant='outlined'
        size='small'
        fullWidth={true}
      >
        Show stats
      </Button>
    </Stack>
  );
}

CoinInfo.propTypes = {
  coin: PropTypes.object,
  onCoinClick: PropTypes.func,
};

export default CoinInfo;
