import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Container } from '../App';
import { AnimeItem } from '../components';
import { RootState } from '../redux';
import { setAnimeId } from '../redux/anime';
import { removeItemFromList, setTypeList } from '../redux/list';

import trashSvg from '../assets/img/trash.svg';
import emptyBoxSvg from '../assets/img/empty-box.svg';

const AnimeListWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
`;

const AnimeListButton = styled.button`
  font-weight: 500;
  color: #fff;
  font-size: 20px;
  padding: 8px 20px;
  border: 2px solid #f1b32e;
  letter-spacing: 1px;
  cursor: pointer;
  border-radius: 8px;
  margin-right: 20px;
  transition: all 0.2s ease;
  ${(props: any) =>
    props.active ? 'background-color: #f1b32e' : ' background-color: transparent;'};
  &:hover {
    background-color: #f1b32e;
  }
  &:active {
    transform: translateY(5px);
  }
`;

const AnimeListTypes = styled.div`
  margin-top: 40px;
  background-color: #212121;
  border-radius: 20px;
  padding: 20px;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  left: 12px;
  z-index: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  transition: all 0.2s ease;
  &:active {
    transform: translateY(3px);
  }
  img {
    display: block;
    width: 22px;
    height: 22px;
    opacity: 0.6;
    transition: all 0.2s ease;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const AnimeListItem = styled.div`
  position: relative;
  margin-right: 20px;
  &:hover {
    ${RemoveButton} {
      top: -32px;
    }
  }
`;

const AnimeListEmpty = styled.div`
  top: 50%;
  ${(props: IAnimeListEmpty) => (props.types ? 'position: static' : 'position: absolute;')}
  ${(props: IAnimeListEmpty) => (props.types ? '' : 'transform: translate(-50%, -50%);')}
  left: 50%;
  opacity: 0.6;
  text-align: center;
  img {
    display: block;
    margin-bottom: 40px;
  }
  span {
    font-weight: 500;
    font-size: 34px;
    letter-spacing: 1px;
  }
`;

interface IAnimeListEmpty {
  types: boolean;
}

const typesList = ['Plan to watch', 'Checked', 'Liked', "Didn't like it."];

const AnimeList = () => {
  const dispatch = useDispatch();
  const { listItems, currentType } = useSelector((state: RootState) => state.list);
  const storageList = JSON.parse(localStorage.getItem('list') || '[]');

  const onSelectAnime = (id: number) => {
    dispatch(setAnimeId(id));
  };

  const onSelectListType = (type: string) => {
    dispatch(setTypeList(type));
  };

  const onRemove = (id: number) => {
    dispatch(removeItemFromList(id));
  };

  return (
    <>
      <Container>
        {storageList.length === 0 ? (
          <AnimeListEmpty>
            <img src={emptyBoxSvg} alt="empty box svg" />
            <span>Add anime to the list</span>
          </AnimeListEmpty>
        ) : (
          <>
            <AnimeListTypes>
              {typesList.map((name, index) => (
                <AnimeListButton
                  key={index}
                  onClick={() => onSelectListType(name)}
                  active={name === currentType}>
                  {name}
                </AnimeListButton>
              ))}
            </AnimeListTypes>
            <AnimeListWrapper>
              {storageList.map(
                (list: any) =>
                  list.type === currentType && (
                    <AnimeListItem>
                      <RemoveButton onClick={() => onRemove(list.id)}>
                        <img src={trashSvg} alt="trash svg" />
                      </RemoveButton>
                      <AnimeItem
                        key={list.id}
                        item={list}
                        selectItem={() => onSelectAnime(Number(list.id))}
                      />
                    </AnimeListItem>
                  ),
              )}
            </AnimeListWrapper>
          </>
        )}
      </Container>
    </>
  );
};

export default AnimeList;
