// 리액트, 라우팅 의존성 임포트
import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

// 공유 레이아웃 컴포넌트 
import Layout from '../components/Layout';

// 라우팅 임포트
import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";
import NotePage from "./note";
import SignUp from "./signup";
import SignIn from "./signin";
import NewNote from "./new";
import EditNote from "./edit";

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

// Pages 컴포넌트 하에 PrivateRoute 컴포넌트 추가
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  // 사용자가 로그인해 있으면 요청한 컴포넌트로 라우딩, 
  // 로그인 상태가 아니면, 로그인 페이지로 리디렉션
  return (
    <Route 
      {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect 
            to={{
              pathname: '/signin',
              state: { from : props.location }
            }}
          />
        )
      }
    />
  );
};

// 라우팅 정의
const Pages = () => {
  return (
    <Router>
      {/* Wrap our routes within the Layout component */}
      <Layout>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/mynotes" component={MyNotes} />
        <PrivateRoute path="/favorites" component={Favorites} />
        <PrivateRoute path="/new" component={NewNote} />
        <PrivateRoute path="/edit/:id" component={EditNote} />
        <Route path="/note/:id" component={NotePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Layout>
    </Router>
  );
};

export default Pages;