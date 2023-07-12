import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import api from '../resources/api';
import Actions from './components/Actions';
import { createMarkup } from '../resources/utils';
import './post.css';

const Post = () => {
  const { id, subject } = useParams();
  const [post, setPost] = React.useState({});
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const renderImg = ({ image, description }) => (
    <img src={image.url} alt={description} width="75%" />
  );

  const handleNews = React.useCallback((data) => {
    setNews(data[0]?.value);
    setPost(data[1]?.value);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    setLoading(true);

    Promise.allSettled([
      api.getNews(subject),
      api.getNewsById(subject, id),
    ]).then(handleNews);
  }, [id, subject, handleNews]);

  const renderDescription = (description) => (
    <p dangerouslySetInnerHTML={createMarkup(description)} />
  );

  const openPost = (id) => {
    navigate(`/${subject}/${id}`);
  };

  const renderPost = (post, index) => {
    const { title, image, description, id } = post;

    return (
      <Col span={12} key={`post-${index}`}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          {image?.url
            ? renderImg({ image, description })
            : renderDescription(description)}
        </article>
      </Col>
    );
  };

  if (loading) return <p>Loading...</p>;

  if (!post) return <p>Post not found</p>;

  const { title, image, description, body, datePublished } = post;

  return (
    <>
      <Link to="/">Back</Link>
      {post && <Actions post={post} subject={subject} />}
      <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
          <p>{datePublished}</p>
          <h1 dangerouslySetInnerHTML={createMarkup(title)} />
          {image && renderImg({ image, description })}
          <p
            className="text"
            dangerouslySetInnerHTML={createMarkup(description)}
          />
          <hr />
          <p className="text" dangerouslySetInnerHTML={createMarkup(body)} />
        </Col>
        <Col span={24} md={8}>
          <Row gutter={[16, 16]}>{news?.value?.map(renderPost)}</Row>
        </Col>
      </Row>
    </>
  );
};

export default Post;
