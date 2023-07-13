import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createMarkup } from '../../resources/utils';

const World = ({ values }) => {
  const navigate = useNavigate();

  const renderImg = ({ image, description }) => (
    <div>
      <img src={image.url} alt={description} width="100%" />
    </div>
  );

  const openPost = (id) => {
    navigate(`/world/${id}`);
  };

  const renderPost = (post, index) => {
    const { title, image, description, id } = post;
    const isFirst = index === 0;
    const spanValue = isFirst ? 24 : 12;

    return (
      <Col span={spanValue} md={12} key={`World-${index}`}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(description)} />
          </p>
          {isFirst && renderImg({ image, description })}
        </article>
      </Col>
    );
  };

  return <Row gutter={[16, 16]}>{values?.map(renderPost)}</Row>;
};

World.defaultProps = {
  values: [],
};

World.propTypes = {
  values: PropTypes.array.isRequired,
};

export default World;
