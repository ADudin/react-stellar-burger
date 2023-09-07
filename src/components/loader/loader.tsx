import style from './loader.module.css';
import { FC } from 'react';
import { LoaderSvg } from './loader.svg';

type TLoader = {
  size: string;
  inverse: boolean;
}

const loaderSizes: {
  [key: string]: number;
} = {
  small: 16,
  medium: 24,
  large: 40
};

const Loader: FC<TLoader> = ({ size, inverse = false }) => {
  const loaderColor = inverse ? '#fff' : '#3C39EC';
  const wrapperStyleKey = 'wrapper_' + size;

  return (
    <div className={style[wrapperStyleKey]}>
      <LoaderSvg color={loaderColor} size={loaderSizes[size]} />
    </div>
  );
};

export default Loader;