import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createMarkup } from '../../resources/utils';

const Economy = ({ values }) => {
  const navigate = useNavigate();

  const renderImg = ({ image, description }) => (
    <img src={image.url} alt={description} width="100%" />
  );

  const renderDescription = (description) => (
    <p dangerouslySetInnerHTML={createMarkup(description)} />
  );

  const openPost = (id) => {
    navigate(`/economy/${id}`);
  };

  const renderPost = (post, index) => {
    const { title, image, description, id } = post;
    return (
      <Col span={24} md={12} key={`Economy-${index}`}>
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

  return <Row gutter={[16, 16]}>{values?.map(renderPost)}</Row>;
};

Economy.defaultProps = {
  values: [],
};

Economy.propTypes = {
  values: PropTypes.array.isRequired,
};

export default Economy;
