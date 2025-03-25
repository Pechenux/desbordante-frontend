import { cmsFetchClient } from '@/api/services/cms';
import HomeBackground from '@/assets/backgrounds/home.svg?component';
import { PrPublicationCard } from '../../components/papers/PrPublicationCard';
import { SciencePublicationCard } from '../../components/papers/SciencePublicationCard';
import styles from './papers.module.scss';

export async function Papers() {
  const responsePrPublications = await cmsFetchClient.GET(
    '/cms/pr-publications',
    {
      params: {
        query: {
          'pagination[limit]': -1,
          sort: 'date:desc',
          populate: 'language,link,link.platform,link.platform.icon',
        },
      },
    },
  );

  const responseSciencePublications = await cmsFetchClient.GET(
    '/cms/science-publications',
    {
      params: {
        query: {
          'pagination[limit]': -1,
          sort: 'date:desc',
        },
      },
    },
  );

  const prPublications = responsePrPublications.data?.data;
  const sciencePublications = responseSciencePublications.data?.data;

  return (
    <div className={styles.papersPage}>
      <HomeBackground
        className={styles.background}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      />

      {prPublications && prPublications.length > 0 && (
        <section className={styles.prPublications}>
          <h5 className={styles.sectionTitle}>Press</h5>
          <ol className={styles.papersContainer}>
            {prPublications.map(
              ({ id, attributes }) =>
                attributes && <PrPublicationCard key={id} data={attributes} />,
            )}
          </ol>
        </section>
      )}

      {sciencePublications && sciencePublications.length > 0 && (
        <section className={styles.sciencePublications}>
          <h5 className={styles.sectionTitle}>Publications</h5>
          <ol className={styles.papersContainer}>
            {sciencePublications.map(
              ({ id, attributes }) =>
                attributes && (
                  <SciencePublicationCard key={id} data={attributes} />
                ),
            )}
          </ol>
        </section>
      )}
    </div>
  );
}
