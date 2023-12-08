import React from "react";
import { useQuery, gql } from "@apollo/client";
import NoteFeed from '../components/NoteFeed';
import Button from "../components/Button";

const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const home = () => {

  // 훅 쿼리
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  // 데이터 로딩중이면 로딩중 메시지 표시
  if (loading) return <p>Loading...</p>;
  // 데이터 로딩중 에러 발생시 에러 메시지 표시
  if (error) return <p>Error!</p>;

  return (
    // 부모 원소 제공을 위해 <React.Fragment> 추가
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {/* hasNextPage가 true면 더보기 표시  */}
      {data.noteFeed.hasNextPage && (
        <Button
          onClick={() =>
          fetchMore({
            variables: {
              cursor: data.noteFeed.cursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              return {
                noteFeed: {
                  cursor: fetchMoreResult.noteFeed.cursor,
                  hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                  // 새 결과를 기존 결과와 결합
                  notes: [
                    ...previousResult.noteFeed.notes,
                    ...fetchMoreResult.noteFeed.notes
                  ],
                  __typename: 'noteFeed'
                }
              };
            }
          })}
        >더보기...</Button>
      )}
    </React.Fragment>
  )
};

export default home;