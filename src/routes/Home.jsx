import React from 'react';
import { Row, Col } from 'antd';
import api from '../resources/api';

const Home = () => {
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleNews = (articles) => {
    setLoading(false);
    setNews({
      world: articles[0]?.value.value,
      economy: articles[1]?.value.value,
      technology: articles[2]?.value.value,
    });
  };

  React.useEffect(() => {
    setLoading(true);
    Promise.allSettled([
      api.getNews('world'),
      api.getNews('economy'),
      api.getNews('technology'),
    ]).then(handleNews);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Row gutter={(16, 16)}>
        <Col span={24} md={16}>
          <h2>World</h2>
        </Col>
      </Row>
      <hr />
      <Row gutter={(16, 16)}>
        <Col span={24} md={16}>
          <h2>Technology</h2>
        </Col>
      </Row>
      <hr />
      <Row gutter={(16, 16)}>
        <Col span={24} md={16}>
          <h2>Economy</h2>
        </Col>
      </Row>
    </>
  );
};

export default Home;
