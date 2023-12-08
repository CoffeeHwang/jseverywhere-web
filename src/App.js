import React from 'react';
import ReactDOM from 'react-dom';

// 아폴로 클라이언트 의존성 임포트
import { 
  ApolloClient, 
  ApolloProvider,
  createHttpLink, 
  InMemoryCache 
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

// 글로벌 스타일 임포트
import GlobalStyle from './components/GlobalStyle';

// 라우팅 임포트
import Pages from './pages';

// API URI 및 캐시 설정
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// 토큰을 확인하고 콘텍스트에 대한 헤더 반환
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});

// 아폴로 클라이언트 설정
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

// 로컬 토큰 확인
const data = {
  isLoggedIn: !!localStorage.getItem('token')
};

// 초기 로드에 캐시 데이터 쓰기
cache.writeData({ data });
// 캐시 초기화후 캐시 데이터 쓰기
client.onResetStore(() => cache.writeData({ data }));

const App = () => {
  return  (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));