import Image from 'next/image';
import { SchemaPrPublication } from '@/api/generated/schema';
import { cmsUrlWrapper } from '@/utils/cmsUrlWrapper';
import { Badge } from './components/Badge';
import styles from './PrPublicationCard.module.scss';

interface PrPublicationCardProps {
  data: SchemaPrPublication;
}

export const PrPublicationCard = ({ data }: PrPublicationCardProps) => {
  const link = data?.link?.data?.attributes;
  const platform = link?.platform?.data?.attributes;
  const language = data?.language?.data?.attributes;

  const imagePath = platform?.icon?.data?.attributes?.url;
  const imageSrc = imagePath && cmsUrlWrapper(imagePath);

  const displayDate = data?.date
    ? new Date(data.date).toLocaleDateString('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <li className={styles.prPublicationCard}>
      {/* Sync width and height with css because next Image want these properties set */}
      {imageSrc && (
        <Image
          width={64}
          height={64}
          src={imageSrc}
          alt=""
          className={styles.thumbnail}
          title={platform?.title}
          unoptimized
        />
      )}

      <div className={styles.data}>
        <h6 className={styles.top}>
          {language && (
            <Badge
              className={styles.language}
              color={language.color}
              title={language.title}
            >
              {language?.abbreviation}
            </Badge>
          )}
          <a href={link?.href} target="_blank" rel="noreferrer">
            {data?.title}
          </a>
        </h6>

        <p className={styles.bottom}>
          {platform?.title && (
            <span className={styles.platform}>{platform?.title}</span>
          )}
          <time className={styles.date} dateTime={data?.date}>
            {displayDate}
          </time>
        </p>
      </div>
    </li>
  );
};
