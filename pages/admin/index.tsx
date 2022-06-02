import { NextPage } from 'next';
import {AdminLayout} from 'components/layout';
import styled from 'styled-components';
import Router from "next/router"

const admin:NextPage = () => {

  return (
    <AdminLayout>
        관리자 메인 페이지
    </AdminLayout>
  );
};

export default admin;
