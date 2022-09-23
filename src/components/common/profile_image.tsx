import styled from 'styled-components';

import ProfileIcon from '../../assets/images/profile.svg';

const ProfileImgWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.grey2};
  cursor: pointer;
`;

const ProfileImg = styled.div<{ userImg?: string }>`
  width: 100%;
  height: 100%;
  background: ${({ userImg }) => (userImg ? `url(${userImg})` : `url(${ProfileIcon})`)};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

interface IProfileImage extends React.HTMLAttributes<HTMLDivElement> {
  userImg?: string;
}

const ProfileImage: React.FC<IProfileImage> = ({ userImg, ...props }) => (
  <ProfileImgWrapper {...props}>
    <ProfileImg userImg={userImg} />
  </ProfileImgWrapper>
);

export default ProfileImage;
