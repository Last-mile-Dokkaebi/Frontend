import { NextPage } from 'next';
import { AppLayout } from 'components/layout';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'stores';
import { useEffect, useState } from 'react';
import { getUserInfoApi } from 'pages/api/member';
const edit: NextPage = () => {
  const { identity } = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState<userInfo>();
  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    const data = await getUserInfoApi(identity);
    setUser(data);
    console.log(data)
  };
  return (
    <>
      <AppLayout>
        <div> identity {user?.identity}</div>
        <div> password {user?.password}</div>
        <div> name {user?.name}</div>
        <div> phone {user?.phone}</div>
        <div> email {user?.email}</div>
        <div> gender {user?.gender}</div>
        <div> birth {user?.birth}</div>
        <div> city {user?.city}</div>
        <div> street {user?.street}</div>

      </AppLayout>
    </>
  );
};

const ContentBox = styled.div`
  border-radius: 4px;
  background-color: white;
  padding: 1rem;
  margin-bottom: 0.5rem;
  .menu-title {
    font-size: 14px;
    color: grey;
  }
  .menu-list {
    padding: 1rem 0 1rem 0;
    list-style: none;
    margin: 0;
    li {
      display: flex;
      align-items: center;
      padding: 0.5rem 0 0.5rem 0;
      & * {
        margin-right: 0.5rem;
      }
      &:hover,
      &:active {
        cursor: pointer;
        background-color: #eee;
        padding: 0.5rem;
        border-radius: 4px;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
`;
export default edit;
