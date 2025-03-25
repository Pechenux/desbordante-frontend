import Image from 'next/image';
import { FC } from 'react';
import { SchemaTeamMember } from '@/api/generated/schema';
import { Icon } from '@/components/common/uikit/Icon';
import { cmsUrlWrapper } from '@/utils/cmsUrlWrapper';
import styles from './TeamMemberBadge.module.scss';

interface Props {
  data: SchemaTeamMember;
}

export const TeamMemberBadge: FC<Props> = ({ data }) => {
  const links = data.links?.data;

  return (
    <li className={styles.teamMemberBadge}>
      <div className={styles.header}>
        <h6>
          {data.fullName}{' '}
          {data.isActive && (
            <span title="Active member">
              <Icon
                alt="Logo"
                className={styles.activeIcon}
                name="desbordante"
                size={40}
              />
            </span>
          )}
        </h6>
        <small>{data.position}</small>
      </div>
      {data.description && (
        <small className={styles.description}>{data.description}</small>
      )}
      {links && links.length > 0 && (
        <ul className={styles.links}>
          {links.map(({ id, attributes }) => {
            const platformAttributes = attributes?.platform?.data?.attributes;

            if (!platformAttributes) {
              return null;
            }

            const imagePath = platformAttributes.icon?.data?.attributes?.url;
            const imageSrc = imagePath && cmsUrlWrapper(imagePath);

            if (!imageSrc) {
              return null;
            }

            return (
              <li key={id}>
                <a
                  href={attributes?.href}
                  title={platformAttributes.title}
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* Sync width and height with css because next Image want these properties set */}
                  <Image
                    width={24}
                    height={24}
                    className={styles.icon}
                    src={imageSrc}
                    alt=""
                  />
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};
