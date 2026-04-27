import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeader: FC = () => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  const getLinkStyle = (path: string) => ({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: location.pathname === path ? '#F2F2F3' : '#8585AD'
  });

  return (
    <header style={{ background: '#1C1C21', padding: '16px 0' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1280px',
          margin: '0 auto'
        }}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to='/' style={getLinkStyle('/')}>
            <BurgerIcon
              type={location.pathname === '/' ? 'primary' : 'secondary'}
            />
            <span className='text text_type_main-default ml-2'>
              Конструктор
            </span>
          </Link>
          <Link to='/feed' style={getLinkStyle('/feed')}>
            <ListIcon
              type={
                location.pathname.startsWith('/feed') ? 'primary' : 'secondary'
              }
            />
            <span className='text text_type_main-default ml-2'>
              Лента заказов
            </span>
          </Link>
        </div>
        <Logo className='' />
        <Link to='/profile' style={getLinkStyle('/profile')}>
          <ProfileIcon
            type={
              location.pathname.startsWith('/profile') ? 'primary' : 'secondary'
            }
          />
          <span className='text text_type_main-default ml-2'>
            {user?.name || 'Личный кабинет'}
          </span>
        </Link>
      </div>
    </header>
  );
};
