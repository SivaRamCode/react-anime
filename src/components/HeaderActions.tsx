import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import searchSvg from '../assets/img/search.svg';
import notificationSvg from '../assets/img/bell.svg';
import enterSvg from '../assets/img/enter.svg';
import { RootState } from '../redux';
import { setAnimeSearchValue } from '../redux/filters';
import { useCookies } from 'react-cookie';
import { setIsAuth } from '../redux/users';

const HeaderAction = styled.button`
  position: relative;
  z-index: 500;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0 12px;
  transition: all 0.2s ease;
  &:active {
    transform: translateY(5px);
    opacity: 0.8;
  }
  img {
    width: 23px;
    height: 23px;
  }
`;

const HeaderSearchInput = styled.input`
  position: absolute;
  right: 90px;
  z-index: 200;
  width: 300px;
  height: 40px;
  border: 2px solid #fff;
  padding: 10px;
  border-radius: 13px;
  background: transparent;
  font-size: 17px;
  color: #fff;
  letter-spacing: 1px;
  outline: none;
  transition: all 0.3s ease;
  ${(props: IHeaderSearchInput) => (props.show ? 'top: 0' : 'top: -100%')};
  &::placeholder {
    color: #fff;
    letter-spacing: 1px;
  }
  &:focus {
    border-color: #f1b32e;
  }
  &:focus::placeholder {
    font-size: 0;
  }
`;

interface IHeaderSearchInput {
  show: boolean;
}

interface IHeaderActions {
  toggleVisibleAuth: () => void;
}

const HeaderActions: React.FC<IHeaderActions> = ({ toggleVisibleAuth }) => {
  const dispatch = useDispatch();
  const animeSearchValue = useSelector((state: RootState) => state.filters.animeSearchValue);
  const isAuth = useSelector((state: RootState) => state.users.isAuth);
  const [visibleInput, setVisibleInput] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const handleInputValue = (value: string) => {
    dispatch(setAnimeSearchValue(value));
  };

  const logout = () => {
    removeCookie('userInfo');
    removeCookie('token');
    dispatch(setIsAuth(false));
  };

  return (
    <>
      <HeaderSearchInput
        show={visibleInput}
        placeholder="Search anime"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputValue(e.target.value)}
        value={animeSearchValue}
      />
      <HeaderAction onClick={() => setVisibleInput(!visibleInput)}>
        <img src={searchSvg} alt="search svg" />
      </HeaderAction>
      <HeaderAction>
        <img src={notificationSvg} alt="notification svg" />
      </HeaderAction>
      {!isAuth ? (
        <HeaderAction onClick={() => toggleVisibleAuth()}>
          <img src={enterSvg} alt="enter svg" />
        </HeaderAction>
      ) : (
        <>
          <div>{cookies?.userInfo?.email}</div>
          <div onClick={() => logout()}>Logout</div>
        </>
      )}
    </>
  );
};

export default HeaderActions;