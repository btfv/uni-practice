import { useEffect } from 'react';

import './dodecahedron.scss';

interface Props {
  img?: string;
}

function setCircleBackgroundImg(newImg?: string) {
  document.documentElement.style.setProperty(
    '--circle-background-img',
    `url(${newImg || ''})`
  );
}

function Loader({ img }: Props) {
  useEffect(() => setCircleBackgroundImg(img), [img]);

  return (
    <div className='globe'>
      <div className='view'>
        <div className='plane main'>
          <div className='circle' />
          <div className='circle' />
          <div className='circle' />
          <div className='circle' />
          <div className='circle' />
          <div className='circle' />
        </div>
      </div>
    </div>
  );
}

export default Loader;
