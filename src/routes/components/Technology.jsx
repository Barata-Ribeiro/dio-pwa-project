import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createMarkup } from '../../resources/utils';

const Technology = ({ values }) => {
  const navigate = useNavigate();

  const renderImg = ({ image, description }) => (
    <div>
      <img src={image.url} alt={description} width="100%" />
    </div>
  );

  const openPost = (id) => {
    navigate(`/technology/${id}`);
  };

  const renderPost = (post, index) => {
    const { title, image, description, id } = post;
    return (
      <Col span={24} md={12} key={`Technology-${index}`}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(description)} />
          </p>
          {image.url && renderImg({ image, description })}
        </article>
      </Col>
    );
  };

  return <Row gutter={[16, 16]}>{values?.map(renderPost)}</Row>;
};

Technology.defaultProps = {
  values: [],
};

Technology.propTypes = {
  values: PropTypes.array.isRequired,
};

export default Technology;
