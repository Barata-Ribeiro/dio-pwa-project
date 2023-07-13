import React from 'react';
import ShareIcon from '../../assets/icons/share.svg';
import CopyIcon from '../../assets/icons/copy.svg';
import PropTypes from 'prop-types';

const navigatorHasShare = navigator.share;

const URL = 'https://localhost:5173/';

const Actions = ({ post, subject }) => {
  const { id, title } = post;

  const shareInfo = () => {
    navigator.share({
      title: `Sentinel of Liberty - ${subject}`,
      text: title,
      url: URL,
    });
  };

  const copyInfo = () => {
    navigator.clipboard.writeText(
      `${title} - *Learn more about in* ${URL}/${subject}/${id}`,
    );
  };

  const renderActions = () => {
    const action = navigatorHasShare ? shareInfo : copyInfo;

    const icon = navigatorHasShare ? ShareIcon : CopyIcon;

    return (
      <img
        alt="icon"
        height="32px"
        src={icon}
        className="share-icon"
        onClick={action}
      />
    );
  };

  return <div className="share">{renderActions()}</div>;
};

Actions.propTypes = {
  post: PropTypes.object.isRequired,
  subject: PropTypes.string.isRequired,
};

export default Actions;
